import fs from 'fs';

const html = fs.readFileSync('urbania-dx.html', 'utf8');

const links = html.match(/<link[^>]*rel=['"]stylesheet['"][^>]*>/gi) || [];
links.forEach(l => console.log('LINK:', l));
