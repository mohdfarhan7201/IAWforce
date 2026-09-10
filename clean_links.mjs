import fs from 'fs';

const HTML_FILE = 'public/about.html';

let html = fs.readFileSync(HTML_FILE, 'utf8');

// Replace all absolute force motors links with a simple # link
html = html.replace(/href=["']https:\/\/www\.forcemotors\.com[^"']*["']/g, 'href="#"');
html = html.replace(/href=["']https:\/\/forceurbania\.co\.in[^"']*["']/g, 'href="#"');
html = html.replace(/href=["']https:\/\/forcegurkha\.co\.in[^"']*["']/g, 'href="#"');

fs.writeFileSync(HTML_FILE, html);
console.log('Removed live site links successfully.');
