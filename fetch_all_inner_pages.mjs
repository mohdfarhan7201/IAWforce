import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ASSETS_DIR = 'local_assets';

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const URL_MAP = [
  { url: 'https://www.forcemotors.com/vehicles-category/traveller/', file: 'category-traveller.html' },
  { url: 'https://www.forcemotors.com/vehicles-category/monobus/', file: 'category-monobus.html' },
  { url: 'https://www.forcemotors.com/vehicles-category/trax/', file: 'category-trax.html' },
  { url: 'https://www.forcemotors.com/vehicles-category/special-applications/', file: 'category-special-applications.html' },
  { url: 'https://www.forcemotors.com/vehicles-category/ev/', file: 'category-ev.html' },
  { url: 'https://www.forcemotors.com/vehicles/', file: 'vehicles.html' },
  { url: 'https://forceurbania.co.in/', file: 'urbania-dx.html' },
  { url: 'https://forcegurkha.co.in/', file: 'gurkha.html' },
  { url: 'https://www.forcemotors.com/vehicles/traveller-3050wb/', file: 'vehicle-traveller-3050wb.html' },
  { url: 'https://www.forcemotors.com/vehicles/traveller-3350wb/', file: 'vehicle-traveller-3350wb.html' },
  { url: 'https://www.forcemotors.com/vehicles/traveller-3700wb/', file: 'vehicle-traveller-3700wb.html' },
  { url: 'https://www.forcemotors.com/vehicles/traveller-4020wb/', file: 'vehicle-traveller-4020wb.html' },
  { url: 'https://www.forcemotors.com/vehicles/traveller-4020wb-cng/', file: 'vehicle-traveller-4020wb-cng.html' },
  { url: 'https://www.forcemotors.com/vehicles/citiline/', file: 'vehicle-citiline.html' },
  { url: 'https://www.forcemotors.com/vehicles/trax-cruiser/', file: 'vehicle-trax-cruiser.html' },
  { url: 'https://www.forcemotors.com/vehicles/trax-toofan/', file: 'vehicle-trax-toofan.html' },
  { url: 'https://www.forcemotors.com/vehicles/monobus-4020wb/', file: 'vehicle-monobus-4020wb.html' },
  { url: 'https://www.forcemotors.com/vehicles/monobus-5200wb/', file: 'vehicle-monobus-5200wb.html' },
  { url: 'https://www.forcemotors.com/locate-a-dealer/', file: 'locate-dealer.html' },
  { url: 'https://www.forcemotors.com/prices/', file: 'prices.html' },
  { url: 'https://www.forcemotors.com/media-events/', file: 'media-events.html' },
  { url: 'https://www.forcemotors.com/investor/', file: 'investors.html' },
  { url: 'https://www.forcemotors.com/contact/', file: 'contact.html' }
];

async function fetchUrl(url, timeoutMs = 12000) {
  return new Promise((resolve) => {
    let resolved = false;
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        if (res.headers.location) {
          const redirectUrl = new URL(res.headers.location, url).toString();
          resolve(fetchUrl(redirectUrl, timeoutMs));
          return;
        }
      }
      if (res.statusCode !== 200) {
        if (!resolved) { resolved = true; resolve(null); }
        return;
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (!resolved) { resolved = true; resolve(body); }
      });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy();
      if (!resolved) { resolved = true; resolve(null); }
    });
    req.on('error', () => {
      if (!resolved) { resolved = true; resolve(null); }
    });
  });
}

async function downloadFile(url, dest, timeoutMs = 8000) {
  return new Promise((resolve) => {
    let resolved = false;
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
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

async function processPages() {
  for (const item of URL_MAP) {
    console.log(`\nFetching ${item.url} -> ${item.file}...`);
    let html = await fetchUrl(item.url);
    if (!html) {
      console.log(`Failed or timed out fetching ${item.url}`);
      continue;
    }

    // Download asset links
    const assetRegex = /(?:https?:\/\/[\w.-]+)?\/[^"'\s\)]+?\.(?:css|js|png|jpg|jpeg|webp|svg|gif)/gi;
    const matches = [...new Set(html.match(assetRegex) || [])].slice(0, 80);

    for (let assetUrl of matches) {
      if (assetUrl.startsWith('//')) assetUrl = 'https:' + assetUrl;
      else if (assetUrl.startsWith('/')) {
        const origin = new URL(item.url).origin;
        assetUrl = origin + assetUrl;
      }
      if (!assetUrl.startsWith('http')) continue;

      try {
        const urlObj = new URL(assetUrl);
        let filename = urlObj.pathname.replace(/[^a-zA-Z0-9.-]/g, '_');
        if (filename.startsWith('_')) filename = filename.substring(1);
        const localPath = path.join(ASSETS_DIR, filename);

        if (!fs.existsSync(localPath)) {
          await downloadFile(assetUrl, localPath);
        }

        const localRel = 'local_assets/' + filename;
        html = html.replaceAll(assetUrl, localRel);
        html = html.replaceAll(urlObj.pathname, localRel);
      } catch (e) {}
    }

    // Global navigation replacements across HTML
    URL_MAP.forEach(target => {
      html = html.replaceAll(target.url, target.file);
      try {
        const pathname = new URL(target.url).pathname;
        if (pathname && pathname !== '/') {
          html = html.replaceAll(`href="${pathname}"`, `href="${target.file}"`);
          html = html.replaceAll(`href='${pathname}'`, `href='${target.file}'`);
        }
      } catch (e) {}
    });

    html = html.replaceAll('href="https://www.forcemotors.com/"', 'href="index.html"');
    html = html.replaceAll('href="/"', 'href="index.html"');
    html = html.replaceAll('href="https://www.forcemotors.com/about-force/"', 'href="about.html"');
    html = html.replaceAll('href="https://forceurbania.co.in/"', 'href="urbania-dx.html"');
    html = html.replaceAll('href="https://forcegurkha.co.in/"', 'href="gurkha.html"');
    html = html.replaceAll('/local_assets/', 'local_assets/');

    fs.writeFileSync(item.file, html, 'utf8');
    console.log(`Successfully saved ${item.file}`);
  }
}

processPages().then(() => {
  console.log('\nAll pages fetched, localized, and converted to HTML successfully!');
});
