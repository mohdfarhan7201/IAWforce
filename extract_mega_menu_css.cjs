const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const rx = /<style[^>]*>([\s\S]*?)<\/style>/g;
let m;
let megaMenuCss = null;

while ((m = rx.exec(indexHtml)) !== null) {
  if (m[1].includes('.mega-menu-wrap')) {
    megaMenuCss = m[1];
    break; // Assuming it's the first one that matches
  }
}

if (megaMenuCss) {
  fs.writeFileSync('mega_menu_style_block.css', megaMenuCss);
  console.log('Saved mega_menu_style_block.css of length:', megaMenuCss.length);
} else {
  console.log('Not found');
}
