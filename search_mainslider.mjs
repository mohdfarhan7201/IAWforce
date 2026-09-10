import fs from 'fs';

const files = fs.readdirSync('local_assets').filter(f => f.endsWith('.css'));

files.forEach(file => {
  const content = fs.readFileSync(`local_assets/${file}`, 'utf8');
  let idx = 0;
  while ((idx = content.indexOf('main-slider', idx)) !== -1) {
    console.log(`\n=== Match 'main-slider' in ${file} at ${idx} ===`);
    console.log(content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + 200)));
    idx += 'main-slider'.length;
  }
});
