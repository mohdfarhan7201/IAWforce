import fs from 'fs';

const files = fs.readdirSync('local_assets').filter(f => f.endsWith('.js'));

files.forEach(file => {
  const content = fs.readFileSync(`local_assets/${file}`, 'utf8');
  if (content.includes('bnr-vid') || content.includes('home-banner-video') || content.includes('poster')) {
    console.log(`\n=== JS FILE: ${file} ===`);
    let idx = 0;
    while ((idx = content.indexOf('bnr-vid', idx)) !== -1) {
      console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 300)));
      idx += 'bnr-vid'.length;
    }
  }
});
