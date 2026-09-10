const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Dell\\Desktop\\IAW';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToInject = `
    .menu-secondlevel-post img, .mob-menu-models img, .prod-card img {
        max-width: 100% !important;
        height: auto !important;
        display: block;
        margin: 0 auto;
    }
`;

let count = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('.menu-secondlevel-post img { max-width: 100% !important;')) {
    // Inject before </style> or inside the custom css block.
    // The safest place is just before </head> to ensure it applies everywhere.
    content = content.replace('</head>', `<style type="text/css">${cssToInject}</style>\n</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
  }
}
console.log(`Injected missing image CSS into ${count} HTML files.`);
