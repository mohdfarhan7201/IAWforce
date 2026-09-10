import fs from 'fs';

const html = fs.readFileSync('urbania-dx.html', 'utf8');

// Find all data-aos occurrences
const aosMatches = html.match(/data-aos=["'][^"']*["']/g) || [];
console.log('Total data-aos attributes in urbania-dx.html:', aosMatches.length);
console.log('Sample data-aos:', aosMatches.slice(0, 10));

// Check if AOS.init() is called
console.log('AOS.init included?', html.includes('AOS.init'));
