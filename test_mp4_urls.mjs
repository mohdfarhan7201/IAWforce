import https from 'https';

const candidateUrls = [
  'https://www.forcemotors.com/wp-content/uploads/2026/04/home-banner-video.mp4',
  'https://www.forcemotors.com/wp-content/uploads/2026/04/home-video.mp4',
  'https://www.forcemotors.com/wp-content/uploads/2026/04/home-banner-video-01.mp4',
  'https://www.forcemotors.com/wp-content/uploads/2025/02/home-banner-video.mp4',
  'https://www.forcemotors.com/wp-content/uploads/2026/05/home-banner-video.mp4',
  'https://www.forcemotors.com/wp-content/uploads/2026/04/force-home-video.mp4',
  'https://www.forcemotors.com/wp-content/uploads/2026/04/video-01.mp4'
];

candidateUrls.forEach(url => {
  https.request(url, { method: 'HEAD' }, res => {
    console.log(`${url} -> status ${res.statusCode}`);
  }).on('error', err => {
    console.log(`${url} -> error ${err.message}`);
  }).end();
});
