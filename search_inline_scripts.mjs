import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];

scripts.forEach((s, idx) => {
  if (s.includes('bnr-vid') || s.includes('video') || s.includes('mainSlider') || s.includes('swiper')) {
    console.log(`\n=== SCRIPT ${idx} ===`);
    console.log(s.substring(0, 500));
  }
});
