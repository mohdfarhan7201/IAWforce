const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Dell\\Desktop\\IAW';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = [
  {
    search: '<div class="mobmcontainer hidediv" id="mobcatname_urbania"><ul class="mob-model-firstlevel"><h5>Urbania DX</h5><li><a href="#." class="catlink-disable"><span>Urbania</span></a><ul class="menu-secondlevel-post"></ul><p class="menu-cusrom-txt"><div class="customugtext"><div class="guimg"><img src="local_assets/wp-content_uploads_2026_07_urbania-menu.png" alt="urbania"></div><div class="gutext"><span>A new ground-up modular monocoque passenger van platform marking the beginning of a Premium Shared Mobility Platform segment.</span>\n<a href="urbania-dx.html" class="forcethembtn"><span>Explore More</span></a></div></p></li></ul></div>',
    replace: '<div class="mobmcontainer hidediv" id="mobcatname_urbania"><ul class="mob-model-firstlevel"><h5>Urbania DX</h5><li><a href="#." class="catlink-disable"><span>Urbania</span></a><ul class="menu-secondlevel-post"><li>\n<a href="urbania-dx.html" class="prod-card">\n<img src="local_assets/wp-content_uploads_2026_07_urbania-menu.png" alt="Urbania DX" />\n<span>Urbania DX</span>\n</a></li></ul></li></ul></div>'
  },
  {
    search: '<div class="mobmcontainer hidediv" id="mobcatname_gurkha"><ul class="mob-model-firstlevel"><h5>Gurkha</h5><li><a href="#." class="catlink-disable"><span>Gurkha</span></a><ul class="menu-secondlevel-post"></ul><p class="menu-cusrom-txt"><div class="customugtext"><div class="guimg"><img src="local_assets/wp-content_uploads_2025_05_gurkha-menu-img.png" alt="gurkha"></div><div class="gutext"><span>The Force Gurkha blends endurance & off-road strength-built for explorers who go beyond conventional roads.</span>\n<a href="gurkha.html" class="forcethembtn"><span>Explore More</span></a></div></p></li></ul></div>',
    replace: '<div class="mobmcontainer hidediv" id="mobcatname_gurkha"><ul class="mob-model-firstlevel"><h5>Gurkha</h5><li><a href="#." class="catlink-disable"><span>Gurkha</span></a><ul class="menu-secondlevel-post"><li>\n<a href="gurkha.html" class="prod-card">\n<img src="local_assets/wp-content_uploads_2025_05_gurkha-menu-img.png" alt="Gurkha" />\n<span>Gurkha</span>\n</a></li></ul></li></ul></div>'
  },
  {
    search: '<div class="mm-container hidediv" id="catname_urbania"><ul class="menu-firstlevel-post"><li><a href="#." class="catlink-disable"><span>Urbania</span></a><ul class="menu-secondlevel-post"></ul><p class="menu-cusrom-txt"><div class="customugtext"><div class="guimg"><img src="local_assets/wp-content_uploads_2026_07_urbania-menu.png" alt="urbania"></div><div class="gutext"><span>A new ground-up modular monocoque passenger van platform marking the beginning of a Premium Shared Mobility Platform segment.</span>\n<a href="urbania-dx.html" class="forcethembtn"><span>Explore More</span></a></div></p></li></ul></div>',
    replace: '<div class="mm-container hidediv" id="catname_urbania"><ul class="menu-firstlevel-post"><li><a href="#." class="catlink-disable"><span>Urbania</span></a><ul class="menu-secondlevel-post"><li>\n<a href="urbania-dx.html" class="prod-card">\n<img src="local_assets/wp-content_uploads_2026_07_urbania-menu.png" alt="Urbania DX" />\n<span>Urbania DX</span>\n</a></li></ul></li></ul></div>'
  },
  {
    search: '<div class="mm-container hidediv" id="catname_gurkha"><ul class="menu-firstlevel-post"><li><a href="#." class="catlink-disable"><span>Gurkha</span></a><ul class="menu-secondlevel-post"></ul><p class="menu-cusrom-txt"><div class="customugtext"><div class="guimg"><img src="local_assets/wp-content_uploads_2025_05_gurkha-menu-img.png" alt="gurkha"></div><div class="gutext"><span>The Force Gurkha blends endurance & off-road strength-built for explorers who go beyond conventional roads.</span>\n<a href="gurkha.html" class="forcethembtn"><span>Explore More</span></a></div></p></li></ul></div>',
    replace: '<div class="mm-container hidediv" id="catname_gurkha"><ul class="menu-firstlevel-post"><li><a href="#." class="catlink-disable"><span>Gurkha</span></a><ul class="menu-secondlevel-post"><li>\n<a href="gurkha.html" class="prod-card">\n<img src="local_assets/wp-content_uploads_2025_05_gurkha-menu-img.png" alt="Gurkha" />\n<span>Gurkha</span>\n</a></li></ul></li></ul></div>'
  }
];

let changedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const rep of replacements) {
    if (content.includes(rep.search)) {
      content = content.replace(rep.search, rep.replace);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    changedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Done. Updated ${changedCount} files.`);
