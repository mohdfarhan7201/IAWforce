const fs = require('fs');
const html = fs.readFileSync('urbania-dx.html', 'utf8');

const rx = /<style[^>]*>([\s\S]*?)<\/style>/g;
let m;
let blockIndex = 0;
while ((m = rx.exec(html)) !== null) {
  const css = m[1];
  if (css.includes('.menu-secondlevel-post li')) {
    console.log(`\n--- Block ${blockIndex} ---`);
    const lines = css.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('.menu-secondlevel-post li')) {
        console.log(`Line ${i}: ${lines[i]}`);
        // print a few lines around it
        for (let j = Math.max(0, i-3); j <= Math.min(lines.length-1, i+5); j++) {
          console.log(`  [${j}] ${lines[j]}`);
        }
      }
    }
  }
  blockIndex++;
}
