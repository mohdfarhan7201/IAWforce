import fs from 'fs';

const liveHtml = fs.readFileSync('live_urbania_raw.html', 'utf8');

// Find section 1: WHY JUST TRAVEL
const idx1 = liveHtml.indexOf('WHY JUST TRAVEL');
console.log('--- SECTION 1 SNIPPET ---');
console.log(liveHtml.substring(idx1 - 200, idx1 + 500));

// Find section 2: Tabs (STYLE, COMFORT, SAFETY, CONVENIENCE)
const idx2 = liveHtml.indexOf('STYLE');
console.log('--- SECTION 2 SNIPPET ---');
console.log(liveHtml.substring(idx2 - 200, idx2 + 1000));

// Find section 3: PRESENTING THE NEW URBANIA DX
const idx3 = liveHtml.indexOf('28.97');
console.log('--- SECTION 3 SNIPPET ---');
console.log(liveHtml.substring(idx3 - 200, idx3 + 800));
