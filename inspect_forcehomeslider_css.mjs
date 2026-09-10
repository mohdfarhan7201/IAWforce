import fs from 'fs';

const cssFiles = [
  'local_assets/wp-content_litespeed_css_89fbd0d52d7c27994b59fa1e873aacfa.css',
  'local_assets/wp-content_litespeed_css_d8eead15cfa972a38197b1d7cbde877b.css',
  'local_assets/wp-content_litespeed_css_f3591541ed9af553c090d9be3a001d10.css',
  'local_assets/wp-content_litespeed_css_6e0bdcec526d2f54ccf68cdb1766701e.css'
];

cssFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const terms = ['.forcehomeslider', '.slide-bgimg', 'bnr-vid', 'entity-img', 'mob-home-banner'];
    terms.forEach(term => {
      let idx = 0;
      while ((idx = content.indexOf(term, idx)) !== -1) {
        console.log(`\n=== Match '${term}' in ${file} at ${idx} ===`);
        console.log(content.substring(Math.max(0, idx - 80), Math.min(content.length, idx + 250)));
        idx += term.length;
      }
    });
  }
});
