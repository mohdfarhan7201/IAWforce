import fs from 'fs';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');

  html = html.replace(/href=["'](gurkha\.html|urbania-dx\.html|category-[a-z-]+\.html)([^"']*)["']/gi, (match, baseFile, rest) => {
    if (!rest || rest === '/' || rest.startsWith('#')) return `href="${baseFile}"`;

    if (rest.includes('wp-content') || rest.includes('uploads') || rest.endsWith('.pdf') || rest.endsWith('.jpg') || rest.endsWith('.png') || rest.endsWith('.webp')) {
      const filename = rest.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/^_/, '');
      return `href="local_assets/${filename}"`;
    }

    const lower = rest.toLowerCase();
    if (lower.includes('dealer') || lower.includes('find-a-dealer')) return 'href="locate-dealer.html"';
    if (lower.includes('spec') || lower.includes('explore')) return `href="${baseFile}"`;
    if (lower.includes('news') || lower.includes('media')) return 'href="media-events.html"';
    if (lower.includes('policy') || lower.includes('privacy')) return 'href="#"';
    if (lower.includes('test-drive') || lower.includes('book')) return 'href="contact.html"';

    return `href="${baseFile}"`;
  });

  fs.writeFileSync(file, html, 'utf8');
});

console.log('Cleaned all remaining hrefs!');
