import fs from 'fs';
import path from 'path';
import https from 'https';

const ASSETS_DIR = 'local_assets';

async function downloadFile(url, dest) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to download ${url}: ${res.statusCode}`);
        resolve(false);
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
      file.on('error', (err) => {
        console.error(`File error for ${url}: ${err.message}`);
        resolve(false);
      });
    }).on('error', (err) => {
      console.error(`Network error for ${url}: ${err.message}`);
      resolve(false);
    });
  });
}

async function processCssFiles() {
  const files = fs.readdirSync(ASSETS_DIR);
  const cssFiles = files.filter(f => f.endsWith('.css'));

  for (const file of cssFiles) {
    const filePath = path.join(ASSETS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const regex = /https:\/\/www\.forcemotors\.com\/[^"'\)\s]+\.(css|js|png|jpg|jpeg|webp|svg|gif)/g;
    const matches = [...new Set(content.match(regex) || [])];

    if (matches.length > 0) {
      console.log(`Found ${matches.length} remote URLs in ${file}`);
      for (const url of matches) {
        const urlObj = new URL(url);
        let filename = urlObj.pathname.replace(/[^a-zA-Z0-9.-]/g, '_');
        if (filename.startsWith('_')) filename = filename.substring(1);

        const localDest = path.join(ASSETS_DIR, filename);
        // Relative path from inside local_assets or root local_assets/
        const replacement = filename;

        if (!fs.existsSync(localDest)) {
          console.log(`Downloading missing CSS asset ${url} -> ${localDest}`);
          await downloadFile(url, localDest);
        }

        // Replace url(https://...) with url(filename)
        content = content.replaceAll(url, replacement);
      }
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}

processCssFiles().then(() => console.log('Finished localizing CSS files!'));
