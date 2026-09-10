import fs from 'fs';

const html = fs.readFileSync('urbania-dx.html', 'utf8');
const pos = html.indexOf('features-tab', 190000);

console.log(html.substring(pos - 100, pos + 3500));
