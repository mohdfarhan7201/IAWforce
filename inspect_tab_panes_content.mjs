import fs from 'fs';

const html = fs.readFileSync('urbania-dx.html', 'utf8');

const tabIds = ['tab-style', 'tab-comfort', 'tab-safety', 'tab-ride'];

tabIds.forEach(id => {
  const index = html.indexOf(`id="${id}"`);
  if (index !== -1) {
    console.log(`=== SNIPPET FOR ${id} ===`);
    console.log(html.substring(index - 50, index + 1000));
  } else {
    console.log(`Tab ID ${id} not found`);
  }
});
