import fs from 'fs';

let forceHtml = fs.readFileSync('public/force.html', 'utf8');
let aboutHtml = fs.readFileSync('public/about.html', 'utf8');

function cleanHtml(html) {
  // 1. Convert absolute asset paths /local_assets/ -> local_assets/
  html = html.replaceAll('/local_assets/', 'local_assets/');

  // 2. Convert /favicon.svg -> favicon.svg
  html = html.replaceAll('/favicon.svg', 'favicon.svg');
  html = html.replaceAll('/icons.svg', 'icons.svg');

  // 3. Fix nav links
  html = html.replaceAll('href="/"', 'href="index.html"');
  html = html.replaceAll('href="https://www.forcemotors.com/"', 'href="index.html"');

  return html;
}

let indexContent = cleanHtml(forceHtml);
let aboutContent = cleanHtml(aboutHtml);

// Link updates
indexContent = indexContent.replaceAll('<a href="#" class="custom-logo-link"', '<a href="index.html" class="custom-logo-link"');
indexContent = indexContent.replaceAll('<li><a href="#">About Force</a></li>', '<li><a href="about.html">About Force</a></li>');

aboutContent = aboutContent.replaceAll('<a href="#" class="custom-logo-link"', '<a href="index.html" class="custom-logo-link"');
aboutContent = aboutContent.replaceAll('<li><a href="#">About Force</a></li>', '<li><a href="about.html">About Force</a></li>');

// Add fix for hero slider background video & image sizing
const heroFixStyle = `
<style id="hero-slider-video-fix">
  .forcehomeslider .main-slider {
    height: 100vh !important;
    max-height: 100vh !important;
    overflow: hidden !important;
  }
  .forcehomeslider .swiper-slide {
    height: 100vh !important;
    overflow: hidden !important;
  }
  .forcehomeslider .swiper-slide .slide-bgimg {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background-position: center center !important;
    background-size: cover !important;
    transform: none !important;
  }
  .main-slider video,
  #bnr-vid {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    transform: none !important;
    top: 0 !important;
    left: 0 !important;
    position: absolute !important;
  }
</style>
`;

indexContent = indexContent.replace('</head>', `${heroFixStyle}</head>`);

fs.writeFileSync('index.html', indexContent, 'utf8');
fs.writeFileSync('about.html', aboutContent, 'utf8');

console.log('Successfully generated index.html with hero slider video size fix!');
