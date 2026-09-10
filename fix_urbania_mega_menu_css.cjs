const fs = require('fs');

// Read the files
const indexHtml = fs.readFileSync('index.html', 'utf8');
let urbaniaHtml = fs.readFileSync('urbania-dx.html', 'utf8');

// Find the mega menu style block in index.html
const rx = /<style[^>]*>([\s\S]*?)<\/style>/g;
let m;
let megaMenuCss = null;

while ((m = rx.exec(indexHtml)) !== null) {
  if (m[1].includes('.mega-menu-wrap')) {
    megaMenuCss = m[0]; // Full <style>...</style> block
    break;
  }
}

if (!megaMenuCss) {
  console.log('Could not find mega menu css in index.html');
  process.exit(1);
}

// Find the corrupted or different mega menu style blocks in urbania-dx.html
let urbaniaBlocksReplaced = 0;
const rxUrbania = /<style[^>]*>([\s\S]*?)<\/style>/g;

urbaniaHtml = urbaniaHtml.replace(rxUrbania, (match, content) => {
  if (content.includes('.mega-menu-wrap')) {
    urbaniaBlocksReplaced++;
    return megaMenuCss; // Replace with the one from index.html
  }
  return match; // Leave other style blocks alone
});

fs.writeFileSync('urbania-dx.html', urbaniaHtml, 'utf8');
console.log(`Replaced ${urbaniaBlocksReplaced} mega menu style block(s) in urbania-dx.html.`);
