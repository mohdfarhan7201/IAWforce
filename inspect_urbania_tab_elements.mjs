import fs from 'fs';

const html = fs.readFileSync('urbania-dx.html', 'utf8');

const occurrences = [];
let pos = 0;
while ((pos = html.indexOf('features-tab', pos + 1)) !== -1) {
  occurrences.push(pos);
}

console.log('Occurrences of features-tab:', occurrences);

if (occurrences.length > 1) {
  const actualTab = occurrences[1];
  console.log('ACTUAL TABS SECTION:');
  console.log(html.substring(actualTab - 50, actualTab + 3000));
}
