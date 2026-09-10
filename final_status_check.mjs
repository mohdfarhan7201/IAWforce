import fs from 'fs';
const h = fs.readFileSync('urbania-dx.html', 'utf8');

// 1. Missing local assets
const m = (h.match(/local_assets\/[^\s"'<>]+/g) || []);
const unique = [...new Set(m)];
const missing = unique.filter(p => !fs.existsSync(p));

// 2. External src= links (scripts/images loaded from external)
const extSrc = (h.match(/src="https:\/\/[^"]+"/g) || []).filter(s => !s.includes('google') && !s.includes('jquery') && !s.includes('cloudflare') && !s.includes('facebook') && !s.includes('outbrain'));

// 3. Remaining admin-ajax.php calls
const ajaxCalls = (h.match(/admin-ajax\.php/g) || []).length;

// 4. Nav links pointing to live site
const livNavLinks = (h.match(/href="https:\/\/forceurbania[^"]*"/g) || []).filter(l => !l.includes('wp-json') && !l.includes('oembed') && !l.includes('shortlink') && !l.includes('canonical'));

console.log('=== FINAL STATUS CHECK ===');
console.log(`Missing local assets: ${missing.length}`);
missing.forEach(p => console.log('  MISSING:', p));

console.log(`\nExternal script/image src (non-CDN): ${extSrc.length}`);
extSrc.forEach(s => console.log(' ', s.substring(0,120)));

console.log(`\nAdmin-ajax.php references: ${ajaxCalls}`);
console.log(`\nLive nav href links: ${livNavLinks.length}`);
livNavLinks.forEach(l => console.log(' ', l.substring(0,120)));

console.log('\n=== DONE ===');
