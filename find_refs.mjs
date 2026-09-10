import fs from 'fs';

const h = fs.readFileSync('urbania-dx.html', 'utf8');
const lines = h.split('\n');

lines.forEach((l, i) => {
  if (l.includes('Day1.jpg') || l.includes("force-urbania-v2\"") || l.includes("force-urbania-v2'")) {
    console.log(i+1, l.trim().substring(0, 150));
  }
});
