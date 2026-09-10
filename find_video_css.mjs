import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Find all <style> tags and check for forcehomeslider, slide-bgimg, bnr-vid, video
const styleMatches = html.match(/<style[\s\S]*?<\/style>/gi) || [];

console.log(`Found ${styleMatches.length} style tags in index.html`);

styleMatches.forEach((style, index) => {
  if (style.includes('forcehomeslider') || style.includes('slide-bgimg') || style.includes('video') || style.includes('bnr-vid')) {
    console.log(`\n--- STYLE TAG ${index} ---`);
    console.log(style.substring(0, 1000));
  }
});

// Also search CSS files
const cssFiles = fs.readdirSync('local_assets').filter(f => f.endsWith('.css'));
cssFiles.forEach(file => {
  const content = fs.readFileSync(`local_assets/${file}`, 'utf8');
  if (content.includes('forcehomeslider') || content.includes('slide-bgimg') || content.includes('bnr-vid')) {
    console.log(`\n--- CSS FILE ${file} ---`);
    // Print snippet around match
    const pos = content.indexOf('forcehomeslider') !== -1 ? content.indexOf('forcehomeslider') : content.indexOf('slide-bgimg');
    console.log(content.substring(Math.max(0, pos - 100), Math.min(content.length, pos + 500)));
  }
});
