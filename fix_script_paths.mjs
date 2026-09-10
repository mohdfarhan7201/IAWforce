import fs from 'fs';

let html = fs.readFileSync('urbania-dx.html', 'utf8');

// The incorrect paths look like: local_assets/wp-content_themes_force-urbania-v2/assets/js/bootstrap.min.js
html = html.replace(/local_assets\/wp-content_themes_force-urbania-v2\/assets\/js\/([^"'\s\?]+)(\?v=\d+)?/g, (match, p1, p2) => {
  // convert / to _
  const newName = `local_assets/wp-content_themes_force-urbania-v2_assets_js_${p1.replace(/\//g, '_')}`;
  return newName;
});

// Since action.js wasn't downloaded, point it back to the original URL
html = html.replace(/local_assets\/wp-content_themes_force-urbania-v2_assets_js_action\.js/g, 'https://forceurbania.co.in/wp-content/themes/force-urbania-v2/assets/js/action.js?v=1789018079');

fs.writeFileSync('urbania-dx.html', html);
console.log('Fixed script paths in urbania-dx.html');
