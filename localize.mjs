import fs from 'fs';
import path from 'path';
import https from 'https';

const HTML_FILE = 'public/about.html';
const OUT_HTML = 'public/about.html';
const ASSETS_DIR = 'public/local_assets';
const ASSETS_PREFIX = '/local_assets/';

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

let html = fs.readFileSync(HTML_FILE, 'utf8');

const regex = /https:\/\/www\.forcemotors\.com\/[^"'\s]+?\.(css|js|png|jpg|jpeg|webp|svg|gif)/g;

const matches = [...new Set(html.match(regex) || [])];

console.log(`Found ${matches.length} assets to download.`);

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        // Just resolve true even if it fails, to not block everything
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

async function processAll() {
  for (const url of matches) {
    // Generate a safe local filename based on the URL path
    const urlObj = new URL(url);
    let filename = urlObj.pathname.replace(/[^a-zA-Z0-9.-]/g, '_');
    if (filename.startsWith('_')) filename = filename.substring(1);
    
    const localPath = path.join(ASSETS_DIR, filename);
    const htmlPath = ASSETS_PREFIX + filename;

    console.log(`Downloading ${url} -> ${localPath}`);
    await downloadFile(url, localPath);

    // Replace all occurrences in HTML
    html = html.split(url).join(htmlPath);
  }

  // Also catch background images with inline CSS: background-image: url('...')
  // but regex above should catch absolute urls in CSS if they are inline.

  fs.writeFileSync(OUT_HTML, html);
  console.log(`Finished processing. Updated HTML saved to ${OUT_HTML}`);
}

processAll();
