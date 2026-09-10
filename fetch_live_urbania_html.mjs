import fs from 'fs';
import https from 'https';

https.get('https://forceurbania.co.in/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync('live_urbania_raw.html', html, 'utf8');
    console.log('Saved live urbania html, length:', html.length);

    // Search for WHY JUST TRAVEL
    console.log('Includes WHY JUST TRAVEL?', html.includes('WHY JUST TRAVEL') || html.includes('World-Class') || html.includes('world-class'));
    console.log('Includes STYLE?', html.includes('STYLE') || html.includes('COMFORT'));
    console.log('Includes 28.97?', html.includes('28.97') || html.includes('LAKHS'));
  });
});
