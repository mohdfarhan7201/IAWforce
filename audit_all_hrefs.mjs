import fs from 'fs';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('Auditing all href attributes across all HTML files...\n');

let totalBad = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /href=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const href = match[1];
    // Check for malformed hrefs
    if (href.includes('.html') && !href.endsWith('.html') && !href.includes('#')) {
      console.log(`[MALFORMED] ${file}: href="${href}"`);
      totalBad++;
    }
  }
});

console.log(`\nFound ${totalBad} malformed href attributes.`);
