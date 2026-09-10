import https from 'https';

https.get('https://www.forcemotors.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const videoMatch = data.match(/<video[\s\S]*?<\/video>/i);
    if (videoMatch) {
      console.log('LIVE VIDEO TAG:', videoMatch[0]);
    } else {
      console.log('No video tag found on live site');
    }
  });
}).on('error', err => {
  console.error('Error fetching live site:', err.message);
});
