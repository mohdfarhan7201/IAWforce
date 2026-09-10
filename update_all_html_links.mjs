import fs from 'fs';

const linkReplacements = [
  // Categories
  { from: 'https://www.forcemotors.com/vehicles-category/traveller/', to: 'category-traveller.html' },
  { from: '/vehicles-category/traveller/', to: 'category-traveller.html' },
  { from: 'https://www.forcemotors.com/vehicles-category/urbania/', to: 'urbania-dx.html' },
  { from: '/vehicles-category/urbania/', to: 'urbania-dx.html' },
  { from: 'https://forceurbania.co.in/', to: 'urbania-dx.html' },
  { from: 'https://forceurbania.co.in', to: 'urbania-dx.html' },
  { from: 'https://www.forcemotors.com/vehicles-category/gurkha/', to: 'gurkha.html' },
  { from: '/vehicles-category/gurkha/', to: 'gurkha.html' },
  { from: 'https://forcegurkha.co.in/', to: 'gurkha.html' },
  { from: 'https://forcegurkha.co.in', to: 'gurkha.html' },
  { from: 'https://www.forcemotors.com/vehicles-category/monobus/', to: 'category-monobus.html' },
  { from: '/vehicles-category/monobus/', to: 'category-monobus.html' },
  { from: 'https://www.forcemotors.com/vehicles-category/trax/', to: 'category-trax.html' },
  { from: '/vehicles-category/trax/', to: 'category-trax.html' },
  { from: 'https://www.forcemotors.com/vehicles-category/special-applications/', to: 'category-special-applications.html' },
  { from: '/vehicles-category/special-applications/', to: 'category-special-applications.html' },
  { from: 'https://www.forcemotors.com/vehicles-category/ev/', to: 'category-ev.html' },
  { from: '/vehicles-category/ev/', to: 'category-ev.html' },
  { from: 'https://www.forcemotors.com/vehicles/', to: 'vehicles.html' },
  { from: '/vehicles/', to: 'vehicles.html' },

  // Models
  { from: 'https://www.forcemotors.com/vehicles/traveller-3050wb/', to: 'vehicle-traveller-3050wb.html' },
  { from: '/vehicles/traveller-3050wb/', to: 'vehicle-traveller-3050wb.html' },
  { from: 'https://www.forcemotors.com/vehicles/traveller-3350wb/', to: 'vehicle-traveller-3350wb.html' },
  { from: '/vehicles/traveller-3350wb/', to: 'vehicle-traveller-3350wb.html' },
  { from: 'https://www.forcemotors.com/vehicles/traveller-3700wb/', to: 'vehicle-traveller-3700wb.html' },
  { from: '/vehicles/traveller-3700wb/', to: 'vehicle-traveller-3700wb.html' },
  { from: 'https://www.forcemotors.com/vehicles/traveller-4020wb/', to: 'vehicle-traveller-4020wb.html' },
  { from: '/vehicles/traveller-4020wb/', to: 'vehicle-traveller-4020wb.html' },
  { from: 'https://www.forcemotors.com/vehicles/traveller-4020wb-cng/', to: 'vehicle-traveller-4020wb-cng.html' },
  { from: '/vehicles/traveller-4020wb-cng/', to: 'vehicle-traveller-4020wb-cng.html' },
  { from: 'https://www.forcemotors.com/vehicles/citiline/', to: 'vehicle-citiline.html' },
  { from: '/vehicles/citiline/', to: 'vehicle-citiline.html' },
  { from: 'https://www.forcemotors.com/vehicles/trax-cruiser/', to: 'vehicle-trax-cruiser.html' },
  { from: '/vehicles/trax-cruiser/', to: 'vehicle-trax-cruiser.html' },
  { from: 'https://www.forcemotors.com/vehicles/trax-toofan/', to: 'vehicle-trax-toofan.html' },
  { from: '/vehicles/trax-toofan/', to: 'vehicle-trax-toofan.html' },
  { from: 'https://www.forcemotors.com/vehicles/monobus-4020wb/', to: 'vehicle-monobus-4020wb.html' },
  { from: '/vehicles/monobus-4020wb/', to: 'vehicle-monobus-4020wb.html' },
  { from: 'https://www.forcemotors.com/vehicles/monobus-5200wb/', to: 'vehicle-monobus-5200wb.html' },
  { from: '/vehicles/monobus-5200wb/', to: 'vehicle-monobus-5200wb.html' },

  // General pages
  { from: 'https://www.forcemotors.com/about-force/', to: 'about.html' },
  { from: '/about-force/', to: 'about.html' },
  { from: 'https://www.forcemotors.com/locate-a-dealer/', to: 'locate-dealer.html' },
  { from: '/locate-a-dealer/', to: 'locate-dealer.html' },
  { from: 'https://www.forcemotors.com/prices/', to: 'prices.html' },
  { from: '/prices/', to: 'prices.html' },
  { from: 'https://www.forcemotors.com/media-events/', to: 'media-events.html' },
  { from: '/media-events/', to: 'media-events.html' },
  { from: 'https://www.forcemotors.com/investor/', to: 'investors.html' },
  { from: '/investor/', to: 'investors.html' },
  { from: 'https://www.forcemotors.com/contact/', to: 'contact.html' },
  { from: '/contact/', to: 'contact.html' }
];

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix assets prefix
  content = content.replaceAll('/local_assets/', 'local_assets/');

  // Replace links
  linkReplacements.forEach(r => {
    content = content.replaceAll(`href="${r.from}"`, `href="${r.to}"`);
    content = content.replaceAll(`href='${r.from}'`, `href='${r.to}'`);
    content = content.replaceAll(`data-href="${r.from}"`, `data-href="${r.to}"`);
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated navigation links in ${file}`);
});
