import fs from 'fs';
import https from 'https';

// Download action.js from live site
function downloadFile(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`Already exists: ${dest}`);
      return resolve(true);
    }
    const req = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${url}: ${res.statusCode}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
      file.on('error', () => resolve(false));
    });
    req.setTimeout(10000, () => { req.destroy(); resolve(false); });
    req.on('error', () => resolve(false));
  });
}

async function main() {
  // 1. Download action.js
  const actionDest = 'local_assets/wp-content_themes_force-urbania-v2_assets_js_action.js';
  console.log('Downloading action.js...');
  const ok = await downloadFile(
    'https://forceurbania.co.in/wp-content/themes/force-urbania-v2/assets/js/action.js?v=1789018079',
    actionDest
  );
  
  // 2. Now patch the HTML to use local copies
  let html = fs.readFileSync('urbania-dx.html', 'utf8');

  // Fix action.js to point to local
  if (ok && fs.existsSync(actionDest)) {
    html = html.replace(
      /https:\/\/forceurbania\.co\.in\/wp-content\/themes\/force-urbania-v2\/assets\/js\/action\.js\?v=\d+/g,
      actionDest
    );
    console.log('Patched action.js to local');
  } else {
    console.log('action.js download failed - leaving external URL');
  }

  // Fix CDN popper.min.js to local
  html = html.replace(
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js',
    'local_assets/npm__popperjs_core_2.11.6_dist_umd_popper.min.js'
  );

  // Fix CDN bootstrap.min.js to local  
  html = html.replace(
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js',
    'local_assets/npm_bootstrap_5.3.0-alpha1_dist_js_bootstrap.min.js'
  );

  fs.writeFileSync('urbania-dx.html', html, 'utf8');
  console.log('All patches applied.');
}

main();
