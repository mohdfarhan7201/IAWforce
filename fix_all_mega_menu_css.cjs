const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Dell\\Desktop\\IAW';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

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

let totalReplaced = 0;

for (const file of files) {
  if (file === 'index.html') continue; // Skip index.html since it's the source of truth

  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let blocksReplaced = 0;
  
  const rxFile = /<style[^>]*>([\s\S]*?)<\/style>/g;
  
  const newHtml = html.replace(rxFile, (match, content) => {
    if (content.includes('.mega-menu-wrap')) {
      blocksReplaced++;
      return megaMenuCss;
    }
    return match;
  });

  if (blocksReplaced > 0) {
    fs.writeFileSync(filePath, newHtml, 'utf8');
    console.log(`Replaced ${blocksReplaced} block(s) in ${file}`);
    totalReplaced++;
  }
}

console.log(`Done. Updated ${totalReplaced} files.`);
