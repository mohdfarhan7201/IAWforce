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

let missingInUrbania = [];
for (let b of indexBlocks) {
  if (!urbaniaBlocks.includes(b)) {
    missingInUrbania.push(b);
  }
}

fs.writeFileSync('missing_in_urbania.css', missingInUrbania.join('\n\n/* --- NEXT BLOCK --- */\n\n'));
