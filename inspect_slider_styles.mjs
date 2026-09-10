import fs from 'fs';

const files = fs.readdirSync('local_assets').filter(f => f.endsWith('.css'));

files.forEach(file => {
  const content = fs.readFileSync(`local_assets/${file}`, 'utf8');
  if (content.includes('forcehomeslider')) {
    console.log(`\n=== FILE: ${file} ===`);
    const regex = /[^{}]*forcehomeslider[^{}]*\{[^{}]*\}/g;
    const matches = content.match(regex) || [];
    matches.forEach(m => console.log(m));
  }
});
