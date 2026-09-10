import fs from 'fs';

const filePath = 'local_assets/wp-content_uploads_2026_04_home-video-placeholder-new.jpg';
if (fs.existsSync(filePath)) {
  const stats = fs.statSync(filePath);
  console.log(`Image exists, size: ${stats.size} bytes`);
} else {
  console.log('Image file does not exist!');
}
