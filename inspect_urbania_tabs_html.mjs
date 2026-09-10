import fs from 'fs';

const html = fs.readFileSync('urbania-dx.html', 'utf8');

const tabsStart = html.indexOf('features-tab');
if (tabsStart !== -1) {
  console.log('TABS HTML SNIPPET:');
  console.log(html.substring(tabsStart - 100, tabsStart + 1500));
} else {
  console.log('features-tab not found');
}
