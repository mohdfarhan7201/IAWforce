const fs=require('fs');
const idx=fs.readFileSync('index.html','utf8');
const urb=fs.readFileSync('urbania-dx.html','utf8');
const rx=/<div class="mm-container hidediv" id="catname_urbania">[\s\S]*?<\/div>\s*<\/div>/;
const iMatch=idx.match(rx);
const uMatch=urb.match(rx);
console.log('INDEX:', iMatch?iMatch[0]:'none');
console.log('URBANIA:', uMatch?uMatch[0]:'none');
