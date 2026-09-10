const fs = require('fs');

const idx = fs.readFileSync('index.html', 'utf8');
const urb = fs.readFileSync('urbania-dx.html', 'utf8');

function extractMenu(html) {
  const start = html.indexOf('<div class="mega-menu-links">');
  const end = html.indexOf('</div></div></div>', start);
  return html.substring(start, end);
}

const idxMenu = extractMenu(idx);
const urbMenu = extractMenu(urb);

console.log('Index menu length:', idxMenu.length);
console.log('Urbania menu length:', urbMenu.length);

if (idxMenu === urbMenu) {
    console.log("The mega menus are EXACTLY THE SAME in HTML.");
} else {
    console.log("The mega menus are DIFFERENT.");
    fs.writeFileSync('idx_menu.html', idxMenu, 'utf8');
    fs.writeFileSync('urb_menu.html', urbMenu, 'utf8');
}
