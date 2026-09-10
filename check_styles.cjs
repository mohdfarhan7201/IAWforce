const fs=require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const urbaniaHtml = fs.readFileSync('urbania-dx.html', 'utf8');
const rx = /<style[^>]*>([\s\S]*?)<\/style>/g;
let m, iCount=0, uCount=0;
let iLengths=[], uLengths=[];
while ((m=rx.exec(indexHtml))!==null){ iCount++; iLengths.push(m[1].length); }
rx.lastIndex=0;
while ((m=rx.exec(urbaniaHtml))!==null){ uCount++; uLengths.push(m[1].length); }
console.log('Index tags:', iCount, iLengths);
console.log('Urbania tags:', uCount, uLengths);
