import fs from 'fs';

const html = fs.readFileSync('force.html', 'utf8');

const regex = /href=["'](https?:\/\/[^"'\s]+)["']/g;
const links = new Set();
let match;
while ((match = regex.exec(html)) !== null) {
  links.add(match[1]);
}

console.log(`Found ${links.size} unique absolute links in force.html:`);
Array.from(links).sort().forEach(link => {
  if (link.includes('forcemotors.com') || link.includes('forceurbania') || link.includes('forcegurkha')) {
    console.log(link);
  }
});
