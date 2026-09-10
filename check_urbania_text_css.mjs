import fs from 'fs';

const html = fs.readFileSync('urbania-dx.html', 'utf8');

// Search for video-wrapper CSS or style tags
const styleMatches = html.match(/<style[\s\S]*?<\/style>/gi) || [];
console.log('Total style tags in urbania-dx.html:', styleMatches.length);

// Check rules for video-txt, section-title, txt1, txt2, para
for (const s of styleMatches) {
  if (s.includes('video-txt') || s.includes('video-wrapper') || s.includes('txt1') || s.includes('downloadbrochureBtn')) {
    console.log('MATCHED STYLE BLOCK:');
    console.log(s);
  }
}
