const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const urbaniaHtml = fs.readFileSync('urbania-dx.html', 'utf8');

function extractRules(html, cls) {
  const rx = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let m;
  let res = [];
  while ((m = rx.exec(html)) !== null) {
    const css = m[1];
    const lines = css.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(cls)) {
        res.push(`Line ${i}: ${lines[i]}`);
      }
    }
  }
  return res;
}

console.log('--- INDEX ---');
console.log(extractRules(indexHtml, '.prod-card').join('\n'));
console.log('--- URBANIA ---');
console.log(extractRules(urbaniaHtml, '.prod-card').join('\n'));
