import fs from 'fs';

function resolveHref(rawHref) {
  let lower = rawHref.toLowerCase();
  
  lower = lower.replace(/^https?:\/\/www\.forcemotors\.com/i, '');
  lower = lower.replace(/^vehicles\.html/i, '');
  lower = lower.replace(/^\/vehicles\//i, '');
  lower = lower.replace(/^\/vehicle\//i, '');
  lower = lower.replace(/^\/vehicles-category\//i, '');
  lower = lower.replace(/^\//, '');
  lower = lower.replace(/\/$/, '');

  if (!lower || lower === 'vehicles') return 'vehicles.html';
  if (lower === 'index' || lower === 'home') return 'index.html';
  if (lower === 'about-force' || lower === 'about') return 'about.html';

  // Category mappings
  if (lower === 'traveller') return 'category-traveller.html';
  if (lower === 'urbania') return 'urbania-dx.html';
  if (lower === 'gurkha') return 'gurkha.html';
  if (lower === 'monobus') return 'category-monobus.html';
  if (lower === 'trax') return 'category-trax.html';
  if (lower === 'special-applications') return 'category-special-applications.html';
  if (lower === 'ev') return 'category-ev.html';

  // Model mappings
  if (lower.includes('3050wb')) return 'vehicle-traveller-3050wb.html';
  if (lower.includes('3350wb')) return 'vehicle-traveller-3350wb.html';
  if (lower.includes('3700wb')) return 'vehicle-traveller-3700wb.html';
  if (lower.includes('4020wb-cng') || lower.includes('4020wb_cng') || lower.includes('4020-wb-cng')) return 'vehicle-traveller-4020wb-cng.html';
  if (lower.includes('4020wb')) return 'vehicle-traveller-4020wb.html';
  if (lower.includes('5200wb') || lower.includes('5200-wb')) return 'vehicle-monobus-5200wb.html';
  if (lower.includes('citiline')) return 'vehicle-citiline.html';
  if (lower.includes('toofan')) return 'vehicle-trax-toofan.html';
  if (lower.includes('cruiser')) return 'vehicle-trax-cruiser.html';
  if (lower.includes('urbania')) return 'urbania-dx.html';
  if (lower.includes('gurkha')) return 'gurkha.html';
  if (lower.includes('monobus')) return 'vehicle-monobus-4020wb.html';
  if (lower.includes('trax')) return 'category-trax.html';
  if (lower.includes('special') || lower.includes('prison') || lower.includes('troop') || lower.includes('medical') || lower.includes('forensic') || lower.includes('cash') || lower.includes('police') || lower.includes('safari') || lower.includes('responder')) return 'category-special-applications.html';
  if (lower.includes('ev') || lower.includes('citibus')) return 'category-ev.html';
  if (lower.includes('traveller')) return 'category-traveller.html';

  return 'vehicles.html';
}

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');

  // Replace all href="vehicles.html..." where it was concatenated
  html = html.replace(/href=["'](vehicles\.html[^"']*)["']/gi, (match, p1) => {
    const target = resolveHref(p1);
    return `href="${target}"`;
  });

  html = html.replace(/href=["'](\/vehicles\/[^"']*)["']/gi, (match, p1) => {
    const target = resolveHref(p1);
    return `href="${target}"`;
  });

  html = html.replace(/href=["'](https?:\/\/www\.forcemotors\.com\/vehicles\/[^"']*)["']/gi, (match, p1) => {
    const target = resolveHref(p1);
    return `href="${target}"`;
  });

  fs.writeFileSync(file, html, 'utf8');
});

console.log('Fixed all malformed concatenated URLs across all HTML files!');
