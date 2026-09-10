import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ASSETS_DIR = 'local_assets';

async function downloadFile(url, dest, timeoutMs = 10000) {
  return new Promise((resolve) => {
    let resolved = false;
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        if (!resolved) { resolved = true; resolve(false); }
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        if (!resolved) { resolved = true; resolve(true); }
      });
      file.on('error', () => {
        if (!resolved) { resolved = true; resolve(false); }
      });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy();
      if (!resolved) { resolved = true; resolve(false); }
    });
    req.on('error', () => {
      if (!resolved) { resolved = true; resolve(false); }
    });
  });
}

async function fixImagesInFile(file) {
  let html = fs.readFileSync(file, 'utf8');

  // Fix concatenated prefix bug like https://forcegurkha.co.inlocal_assets/ or .local_assets/
  html = html.replaceAll('https://forcegurkha.co.inlocal_assets/', 'local_assets/');
  html = html.replaceAll('https://forceurbania.co.inlocal_assets/', 'local_assets/');
  html = html.replaceAll('https://www.forcemotors.comlocal_assets/', 'local_assets/');
  html = html.replaceAll('.local_assets/', 'local_assets/');

  // Match all src="..." or data-src="..." or background-image: url(...)
  const srcRegex = /(?:src|data-src|poster)=["']([^"']+)["']/gi;
  let match;
  const urlsToProcess = [];

  while ((match = srcRegex.exec(html)) !== null) {
    urlsToProcess.push(match[1]);
  }

  for (let rawSrc of [...new Set(urlsToProcess)]) {
    if (!rawSrc || rawSrc.startsWith('data:') || rawSrc.startsWith('blob:')) continue;

    let downloadUrl = null;
    let localFilename = null;

    if (rawSrc.startsWith('local_assets/')) {
      localFilename = rawSrc.replace('local_assets/', '');
      const localPath = path.join(ASSETS_DIR, localFilename);

      if (!fs.existsSync(localPath) || fs.statSync(localPath).size === 0) {
        // Construct remote download URL
        if (file === 'urbania-dx.html') {
          const cleanPath = localFilename.replaceAll('_', '/');
          downloadUrl = `https://forceurbania.co.in/${cleanPath}`;
        } else if (file === 'gurkha.html') {
          const cleanPath = localFilename.replaceAll('_', '/');
          downloadUrl = `https://forcegurkha.co.in/${cleanPath}`;
        } else {
          const cleanPath = localFilename.replaceAll('_', '/');
          downloadUrl = `https://www.forcemotors.com/${cleanPath}`;
        }
      }
    } else if (rawSrc.startsWith('http')) {
      const urlObj = new URL(rawSrc);
      localFilename = urlObj.pathname.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/^_+/, '');
      downloadUrl = rawSrc;
    }

    if (downloadUrl && localFilename) {
      const destPath = path.join(ASSETS_DIR, localFilename);
      console.log(`Downloading missing image for ${file}: ${downloadUrl} -> ${destPath}`);
      const ok = await downloadFile(downloadUrl, destPath);
      if (ok) {
        const replacement = `local_assets/${localFilename}`;
        html = html.replaceAll(rawSrc, replacement);
      }
    } else if (localFilename) {
      const replacement = `local_assets/${localFilename}`;
      if (rawSrc !== replacement) {
        html = html.replaceAll(rawSrc, replacement);
      }
    }
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`Updated images in ${file}`);
}

async function processAll() {
  const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
  for (const f of htmlFiles) {
    await fixImagesInFile(f);
  }
  console.log('\nAll images fixed and downloaded!');
}

processAll();
