import fs from 'fs';
const h = fs.readFileSync('urbania-dx.html', 'utf8');
const lines = h.split('\n');
let count = 0;
lines.forEach((l, i) => {
  if (l.includes('href="https://forceurbania') || l.includes("href='https://forceurbania")) {
    console.log(`${i+1}: ${l.trim().substring(0,180)}`);
    count++;
  }
});
console.log('\nTotal external forceurbania links:', count);
