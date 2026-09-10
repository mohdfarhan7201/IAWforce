import fs from 'fs';

let html = fs.readFileSync('urbania-dx.html', 'utf8');

// Custom CSS override for urbania-dx page to prevent Elementor CSS bleeding into Urbania sections
const customOverrideCss = `
<style id="urbania-custom-fixes">
  /* Fix text color for WHY JUST TRAVEL section */
  .video-txt.section-head .section-title .txt {
    color: #1a1a1a !important;
    display: inline-block;
  }
  .video-txt.section-head .section-title .txt1 {
    font-weight: 700;
    margin-right: 8px;
  }
  .video-txt.section-head .section-title .txt2 {
    font-weight: 300;
  }
  .video-txt.section-head .para, 
  .video-wrapper p {
    color: #555555 !important;
    font-size: 16px !important;
    line-height: 1.6 !important;
    max-width: 800px;
    margin: 15px auto !important;
    text-align: center;
  }
  .video-wrapper {
    padding: 40px 15px;
    text-align: center;
    background: #ffffff !important;
  }

  /* Fix Tabs styling and visibility */
  .features-tab .nav-tabs {
    border-bottom: 1px solid #e0e0e0 !important;
    justify-content: center !important;
    margin-bottom: 30px !important;
  }
  .features-tab .nav-tabs .nav-link {
    color: #666666 !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    letter-spacing: 1px !important;
    padding: 12px 25px !important;
    border: none !important;
    background: transparent !important;
  }
  .features-tab .nav-tabs .nav-link.active {
    color: #000000 !important;
    border-bottom: 3px solid #000000 !important;
  }

  /* Fix PRESENTING THE NEW URBANIA DX section text visibility */
  .leftrightText p {
    color: #333333 !important;
    font-size: 16px !important;
    margin: 0 !important;
  }
  .leftrightText h3 {
    color: #111111 !important;
    font-weight: 700 !important;
    font-size: 28px !important;
    margin: 5px 0 !important;
  }
  .downloadbrochureBtn {
    background-color: #ffffff !important;
    color: #333333 !important;
    border: 1px solid #cccccc !important;
    padding: 10px 20px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    border-radius: 4px !important;
    display: inline-block !important;
    margin-top: 15px !important;
  }
  .downloadbrochureBtn:hover {
    background-color: #000000 !important;
    color: #ffffff !important;
  }

  /* Footer styling scoping */
  #site-footer {
    background: #000000 !important;
    color: #ffffff !important;
    clear: both;
    position: relative;
    z-index: 100;
  }
  #site-footer a {
    color: #cccccc !important;
  }
  #site-footer a:hover {
    color: #ffffff !important;
  }
</style>
`;

// Inline JS for tab switching if bootstrap tab triggers have jQuery conflicts
const customTabJs = `
<script id="urbania-tab-fix">
  document.addEventListener('DOMContentLoaded', function() {
    // Manual tab switching logic for features-tab
    var tabLinks = document.querySelectorAll('.features-tab .nav-link');
    tabLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        // Remove active class from all links
        tabLinks.forEach(function(l) { l.classList.remove('active'); });
        this.classList.add('active');

        // Hide all tab panes
        var tabPanes = document.querySelectorAll('#featuresTabContent .tab-pane');
        tabPanes.forEach(function(pane) {
          pane.classList.remove('active', 'show');
          pane.style.display = 'none';
        });

        // Show target tab pane
        var targetPane = document.querySelector(targetId);
        if (targetPane) {
          targetPane.classList.add('active', 'show');
          targetPane.style.display = 'block';
        }
      });
    });
  });
</script>
`;

// Inject custom CSS and JS into urbania-dx.html
if (!html.includes('urbania-custom-fixes')) {
  html = html.replace('</head>', `${customOverrideCss}\n</head>`);
}
if (!html.includes('urbania-tab-fix')) {
  html = html.replace('</body>', `${customTabJs}\n</body>`);
}

fs.writeFileSync('urbania-dx.html', html, 'utf8');
console.log('Applied custom CSS overrides and tab switching JS to urbania-dx.html');
