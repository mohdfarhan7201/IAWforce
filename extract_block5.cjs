const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const rx = /<style[^>]*>([\s\S]*?)<\/style>/g;
let m;
let blocks = [];
while ((m = rx.exec(indexHtml)) !== null) {
  blocks.push(m[1]);
}

fs.writeFileSync('block5.css', blocks[5]);
console.log('Saved block 5');
