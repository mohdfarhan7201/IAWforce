import fs from 'fs';

const liveHtml = fs.readFileSync('live_urbania_raw.html', 'utf8');
const localHtml = fs.readFileSync('urbania-dx.html', 'utf8');

console.log('Live html length:', liveHtml.length);
console.log('Local html length:', localHtml.length);

// Let's check sections in liveHtml
// 1. WHY JUST TRAVEL
const p1Start = liveHtml.indexOf('WHY JUST TRAVEL');
console.log('p1Start in live:', p1Start);

// 2. STYLE tabs
const p2Start = liveHtml.indexOf('STYLE');
console.log('p2Start in live:', p2Start);

// 3. PRESENTING THE NEW URBANIA DX
const p3Start = liveHtml.indexOf('28.97');
console.log('p3Start in live:', p3Start);
