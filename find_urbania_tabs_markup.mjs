import fs from 'fs';

const html = fs.readFileSync('urbania-dx.html', 'utf8');

const regex = /<ul[^>]*class=["'][^"']*nav-tabs[^"']*["'][^>]*>[\s\S]*?<\/ul>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('FOUND NAV TABS AT INDEX:', match.index);
  console.log(match[0]);
}

const tabContentRegex = /<div[^>]*id=["']myTabContent["'][^>]*>[\s\S]*?<\/div>/gi;
while ((match = tabContentRegex.exec(html)) !== null) {
  console.log('FOUND TAB CONTENT AT INDEX:', match.index);
  console.log(match[0].substring(0, 500));
}
