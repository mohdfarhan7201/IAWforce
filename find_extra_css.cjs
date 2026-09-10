const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const urbaniaHtml = fs.readFileSync('urbania-dx.html', 'utf8');

function extractRules(html) {
  const rx = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let m;
  let blocks = [];
  while ((m = rx.exec(html)) !== null) {
    blocks.push(m[1].trim());
  }
  return blocks;
}

const indexBlocks = extractRules(indexHtml);
const urbaniaBlocks = extractRules(urbaniaHtml);

let extra = [];
for (let b of urbaniaBlocks) {
  if (!indexBlocks.includes(b)) {
    extra.push(b);
  }
}

fs.writeFileSync('extra_urbania_styles.css', extra.join('\n\n/* --- NEXT BLOCK --- */\n\n'));
