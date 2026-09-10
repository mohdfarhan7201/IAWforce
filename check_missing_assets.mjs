import fs from 'fs';

const h = fs.readFileSync('urbania-dx.html','utf8');

// Find all local_assets references
const m = h.match(/local_assets\/[^\s"'<>]+/g) || [];
const unique = [...new Set(m)];

// Check which ones don't exist as files
const missing = unique.filter(p => !fs.existsSync(p));
console.log('MISSING FILES:', missing.length);
missing.forEach(p => console.log(' ', p));

console.log('\nPRESENT FILES:', unique.length - missing.length);
