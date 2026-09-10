import fs from 'fs';

let h = fs.readFileSync('urbania-dx.html', 'utf8');

// 1. Strip ?ver=... query strings from local_assets CSS/JS paths so they match existing files
h = h.replace(/(local_assets\/[^\s"'<>?]+)\?ver=[^\s"'<>]*/g, '$1');

// 2. Fix SVG paths that have a trailing ) — likely inside url() expressions
h = h.replace(/(local_assets\/wp-content_uploads_2025_02_menu-arrow-black\.svg)\)/g, '$1');
h = h.replace(/(local_assets\/wp-content_uploads_2025_02_menuback-arrow\.svg)\)/g, '$1');
h = h.replace(/(local_assets\/wp-content_uploads_2025_02_menu-arrow-blue\.svg)\)/g, '$1');

// 3. Fix bare "local_assets/wp-content_themes_force-urbania-v2" (no filename) - remove reference
// (may be used as a weburl prefix in JS; leave it, but fix the style tag reference if any)

fs.writeFileSync('urbania-dx.html', h, 'utf8');
console.log('Done fixing query strings and trailing parens.');

// Verify
const h2 = fs.readFileSync('urbania-dx.html', 'utf8');
const m = (h2.match(/local_assets\/[^\s"'<>]+/g) || []);
const unique = [...new Set(m)];
const missing = unique.filter(p => !fs.existsSync(p));
console.log('Still missing:', missing.length);
missing.forEach(p => console.log(' ', p));
