import fs from 'fs';

const files = fs.readdirSync('local_assets').filter(f => f.endsWith('.css'));

files.forEach(file => {
  const content = fs.readFileSync(`local_assets/${file}`, 'utf8');
  if (content.includes('main-slider') || content.includes('forcehomeslider')) {
    console.log(`\n=== FILE: ${file} ===`);
    const terms = ['main-slider', 'forcehomeslider', 'slide-bgimg', 'bnr-vid'];
    terms.forEach(term => {
      let idx = 0;
      while ((idx = content.indexOf(term, idx)) !== -1) {
        console.log(`\n--- Match '${term}' in ${file} at ${idx} ---`);
        console.log(content.substring(Math.max(0, idx - 80), Math.min(content.length, idx + 250)));
        idx += term.length;
      }
    });
  }
});
