const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const urbaniaHtml = fs.readFileSync('urbania-dx.html', 'utf8');

function extractRules(html) {
  const rx = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let m;
  let cssText = '';
  while ((m = rx.exec(html)) !== null) {
    cssText += m[1] + '\n';
  }
  return cssText;
}

const indexCss = extractRules(indexHtml);
const urbaniaCss = extractRules(urbaniaHtml);

fs.writeFileSync('index_styles.css', indexCss);
fs.writeFileSync('urbania_styles.css', urbaniaCss);
