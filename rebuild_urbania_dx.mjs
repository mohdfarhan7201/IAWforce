import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';

const liveHtml = fs.readFileSync('live_urbania_raw.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Download helper
async function downloadAsset(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      return resolve(true);
    }
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      if (res.statusCode !== 200) return resolve(false);
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
      file.on('error', () => resolve(false));
    });
    req.setTimeout(8000, () => { req.destroy(); resolve(false); });
    req.on('error', () => resolve(false));
  });
}

async function rebuild() {
  let html = liveHtml;

  // 1. Localize all asset URLs (wp-content/..., themes/..., uploads/...)
  const assetRegex = /(https:\/\/forceurbania\.co\.in\/wp-content\/[^\s"'<>]+)/gi;
  let match;
  const assetsToDownload = [];
  while ((match = assetRegex.exec(html)) !== null) {
    const fullUrl = match[1];
    // Extract path after forceurbania.co.in/
    const relPath = fullUrl.replace('https://forceurbania.co.in/', '');
    const localFilename = relPath.replace(/\//g, '_');
    const dest = path.join('local_assets', localFilename);
    assetsToDownload.push({ fullUrl, dest, localSrc: `local_assets/${localFilename}` });
  }

  for (const item of assetsToDownload) {
    await downloadAsset(item.fullUrl, item.dest);
    html = html.replaceAll(item.fullUrl, item.localSrc);
  }

  // Also replace any relative wp-content/ with local_assets/wp-content_
  html = html.replace(/(["'])(wp-content\/[^\s"'<>]+)/gi, (m, q, p) => {
    const localFilename = p.replace(/\//g, '_');
    return `${q}local_assets/${localFilename}`;
  });

  // 2. Replace Header
  const headerMatchIndex = indexHtml.match(/<header id="site-header"[\s\S]*?<\/header>/i);
  if (headerMatchIndex) {
    // Replace header in html
    html = html.replace(/<header[\s\S]*?<\/header>/i, headerMatchIndex[0]);
  }

  // 3. Replace Footer
  const footerMatchIndex = indexHtml.match(/<footer id="site-footer"[\s\S]*?<\/footer>/i);
  if (footerMatchIndex) {
    html = html.replace(/<footer[\s\S]*?<\/footer>/i, footerMatchIndex[0]);
  }

  // 4. Inject index.html CSS into head for header/footer styling
  const linkMatchesIndex = indexHtml.match(/<link[^>]*rel=['"]stylesheet['"][^>]*>/gi) || [];
  const styleMatchesIndex = indexHtml.match(/<style[\s\S]*?<\/style>/gi) || [];
  const indexCssBlock = [
    '<!-- Index Header/Footer CSS -->',
    ...linkMatchesIndex,
    ...styleMatchesIndex,
    '<!-- End Index Header/Footer CSS -->'
  ].join('\n');

  html = html.replace(/<\/head>/i, `${indexCssBlock}\n</head>`);

  // Save to urbania-dx.html
  fs.writeFileSync('urbania-dx.html', html, 'utf8');
  console.log('Successfully rebuilt urbania-dx.html!');
}

rebuild();
