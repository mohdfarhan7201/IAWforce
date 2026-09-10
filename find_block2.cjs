const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const rx = /<style[^>]*>([\s\S]*?)<\/style>/g;
let m;
let blocks = [];
while ((m = rx.exec(indexHtml)) !== null) {
  blocks.push(m[1]);
}

for (let i = 0; i < blocks.length; i++) {
  if (blocks[i].includes('.mega-menu-wrap')) {
    console.log('.mega-menu-wrap Found in block ' + i + ' (length ' + blocks[i].length + ')');
  }
}
