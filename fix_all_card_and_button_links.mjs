import fs from 'fs';
import path from 'path';

function getCardTarget(htmlSnippet) {
  const lower = htmlSnippet.toLowerCase();
  if (lower.includes('3050wb')) return 'vehicle-traveller-3050wb.html';
  if (lower.includes('3350wb')) return 'vehicle-traveller-3350wb.html';
  if (lower.includes('3700wb')) return 'vehicle-traveller-3700wb.html';
  if (lower.includes('4020wb cng') || lower.includes('4020-wb-cng')) return 'vehicle-traveller-4020wb-cng.html';
  if (lower.includes('4020wb')) return 'vehicle-traveller-4020wb.html';
  if (lower.includes('5200wb') || lower.includes('5200-wb')) return 'vehicle-monobus-5200wb.html';
  if (lower.includes('citiline')) return 'vehicle-citiline.html';
  if (lower.includes('toofan')) return 'vehicle-trax-toofan.html';
  if (lower.includes('cruiser')) return 'vehicle-trax-cruiser.html';
  if (lower.includes('urbania')) return 'urbania-dx.html';
  if (lower.includes('gurkha')) return 'gurkha.html';
  if (lower.includes('monobus')) return 'category-monobus.html';
  if (lower.includes('trax')) return 'category-trax.html';
  if (lower.includes('special') || lower.includes('prison') || lower.includes('troop') || lower.includes('medical') || lower.includes('forensic') || lower.includes('cash') || lower.includes('police') || lower.includes('safari') || lower.includes('responder')) return 'category-special-applications.html';
  if (lower.includes('ev') || lower.includes('citibus')) return 'category-ev.html';
  if (lower.includes('traveller')) return 'category-traveller.html';
  return 'vehicles.html';
}

function getCategoryTarget(catText) {
  const lower = catText.toLowerCase();
  if (lower.includes('urbania')) return 'urbania-dx.html';
  if (lower.includes('gurkha')) return 'gurkha.html';
  if (lower.includes('monobus')) return 'category-monobus.html';
  if (lower.includes('trax')) return 'category-trax.html';
  if (lower.includes('special')) return 'category-special-applications.html';
  if (lower.includes('ev')) return 'category-ev.html';
  if (lower.includes('traveller')) return 'category-traveller.html';
  return 'vehicles.html';
}

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Fix vehicle cards: <a href="#" class="prod-card"> ... </a>
  html = html.replace(/<a\s+href=["']#["']\s+class=["']prod-card["']>([\s\S]*?)<\/a>/gi, (match, inner) => {
    const targetUrl = getCardTarget(inner);
    modified = true;
    return `<a href="${targetUrl}" class="prod-card">${inner}</a>`;
  });

  // 2. Fix mega-menu category tab links: <li class="cattabs"><a href="#" data-tag="...">Category</a></li>
  html = html.replace(/<li\s+class=["']cattabs["']><a\s+href=["']#["']\s+data-tag=["']([^"']+)["']>([\s\S]*?)<\/a><\/li>/gi, (match, tag, name) => {
    const targetUrl = getCategoryTarget(name);
    modified = true;
    return `<li class="cattabs"><a href="${targetUrl}" data-tag="${tag}">${name}</a></li>`;
  });

  // 3. Fix "Find your Force" section slides: <div class="prod-info"><h4>Category</h4>...<a href="#" class="forcethembtn whtbtn">...</a>
  html = html.replace(/(<h4>([\s\S]*?)<\/h4>[\s\S]*?<a\s+href=["'])#(["']\s+class=["']forcethembtn whtbtn["']>)/gi, (match, p1, catName, p3) => {
    const targetUrl = getCategoryTarget(catName);
    modified = true;
    return `${p1}${targetUrl}${p3}`;
  });

  // 4. Fix header navigation links
  html = html.replaceAll('href="#" class="custom-logo-link"', 'href="index.html" class="custom-logo-link"');
  html = html.replaceAll('href="#">Home</a>', 'href="index.html">Home</a>');
  html = html.replaceAll('href="#">Vehicles</a>', 'href="vehicles.html">Vehicles</a>');
  html = html.replaceAll('href="#">About Force</a>', 'href="about.html">About Force</a>');
  html = html.replaceAll('href="#">Company</a>', 'href="about.html">Company</a>');
  html = html.replaceAll('href="#">Prices</a>', 'href="prices.html">Prices</a>');
  html = html.replaceAll('href="#">Investors</a>', 'href="investors.html">Investors</a>');
  html = html.replaceAll('href="#">Media & Events</a>', 'href="media-events.html">Media & Events</a>');
  html = html.replaceAll('href="#">Contact</a>', 'href="contact.html">Contact</a>');
  html = html.replaceAll('href="#">Locate a Dealer</a>', 'href="locate-dealer.html">Locate a Dealer</a>');

  // 5. Fix mobile menu category links
  html = html.replaceAll('<li><a href="#">About Force</a></li>', '<li><a href="about.html">About Force</a></li>');
  html = html.replaceAll('<li><a href="#">Our Expertise</a></li>', '<li><a href="about.html">Our Expertise</a></li>');
  html = html.replaceAll('<li><a href="#">Leadership Team</a></li>', '<li><a href="about.html">Leadership Team</a></li>');
  html = html.replaceAll('<li><a href="#">Legacy</a></li>', '<li><a href="about.html">Legacy</a></li>');

  // 6. Fix specific button hrefs for Urbania DX and Gurkha Explore More buttons
  html = html.replaceAll('alt="gurkha"></div><div class="gutext"><span>The Force Gurkha blends endurance & off-road strength-built for explorers who go beyond conventional roads.</span>\n<a href="#" target="_blank" class="forcethembtn">', 'alt="gurkha"></div><div class="gutext"><span>The Force Gurkha blends endurance & off-road strength-built for explorers who go beyond conventional roads.</span>\n<a href="gurkha.html" class="forcethembtn">');
  html = html.replaceAll('alt="urbania"></div><div class="gutext"><span>A new ground-up modular monocoque passenger van platform marking the beginning of a Premium Shared Mobility Platform segment.</span>\n<a href="#" target="_blank" class="forcethembtn">', 'alt="urbania"></div><div class="gutext"><span>A new ground-up modular monocoque passenger van platform marking the beginning of a Premium Shared Mobility Platform segment.</span>\n<a href="urbania-dx.html" class="forcethembtn">');

  fs.writeFileSync(file, html, 'utf8');
  console.log(`Successfully updated links in ${file}`);
});

console.log('All card, category tab, menu, and Read More links connected to local HTML files!');
