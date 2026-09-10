import fs from 'fs';

let html = fs.readFileSync('urbania-dx.html', 'utf8');

// Custom CSS override for urbania-dx page
const customOverrideCss = `
<style id="urbania-custom-fixes">
  /* Force AOS elements to be visible */
  [data-aos] {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
    transition: none !important;
  }

  /* Fix text color & layout for WHY JUST TRAVEL section */
  .video-txt, .video-wrapper, .section-head {
    opacity: 1 !important;
    visibility: visible !important;
  }
  .video-txt.section-head .section-title,
  .video-txt.section-head .section-title .txt,
  .video-txt.section-head .section-title span {
    color: #1a1a1a !important;
    display: inline-block;
  }
  .video-txt.section-head .section-title .txt1 {
    font-weight: 700 !important;
    margin-right: 8px;
  }
  .video-txt.section-head .section-title .txt2 {
    font-weight: 300 !important;
  }
  .video-txt.section-head .para, 
  .video-wrapper p,
  .video-txt p {
    color: #444444 !important;
    font-size: 16px !important;
    line-height: 1.6 !important;
    max-width: 850px;
    margin: 15px auto !important;
    text-align: center;
    opacity: 1 !important;
    visibility: visible !important;
  }
  .video-wrapper {
    padding: 40px 15px;
    text-align: center;
    background: #ffffff !important;
  }

  /* Fix Tabs styling and visibility */
  .features-tab .nav-tabs,
  .nav-tabs {
    border-bottom: 1px solid #e0e0e0 !important;
    justify-content: center !important;
    margin-bottom: 30px !important;
    display: flex !important;
  }
  .nav-tabs .nav-item {
    margin: 0 5px;
  }
  .nav-tabs .nav-link {
    color: #666666 !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    letter-spacing: 1px !important;
    padding: 12px 25px !important;
    border: none !important;
    background: transparent !important;
    cursor: pointer !important;
  }
  .nav-tabs .nav-link.active {
    color: #000000 !important;
    border-bottom: 3px solid #000000 !important;
    font-weight: 700 !important;
  }

  /* Tab Pane and Owl Carousel visibility fix */
  .tab-pane {
    display: none;
  }
  .tab-pane.active, .tab-pane.show {
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  .tab-pane .owl-carousel,
  .tab-pane .owl-stage-outer,
  .tab-pane .owl-stage,
  .tab-pane .owl-item,
  .tab-pane .item {
    opacity: 1 !important;
    visibility: visible !important;
  }
  .tab-pane .owl-carousel {
    display: block !important;
  }
  .tab-pane .item {
    position: relative;
    margin-bottom: 20px;
  }
  .tab-pane .info-txt {
    position: absolute;
    bottom: 20px;
    left: 30px;
    right: 30px;
    background: rgba(0, 0, 0, 0.65);
    padding: 15px 25px;
    border-radius: 6px;
    color: #ffffff !important;
    z-index: 10;
  }
  .tab-pane .info-txt .title {
    color: #ffffff !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    margin: 0 0 5px 0 !important;
    text-transform: uppercase;
  }
  .tab-pane .info-txt .txt {
    color: #eeeeee !important;
    font-size: 14px !important;
    margin: 0 !important;
  }

  /* Fix PRESENTING THE NEW URBANIA DX section text visibility */
  .leftrightText, .leftrightText * {
    opacity: 1 !important;
    visibility: visible !important;
  }
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

// Universal JS for tab switching for any nav-tabs with data-toggle="tab"
const customTabJs = `
<script id="urbania-tab-fix">
  document.addEventListener('DOMContentLoaded', function() {
    // Function to handle tab click
    function handleTabClick(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href') || this.getAttribute('data-target');
      if (!targetId || targetId === '#') return;

      var navUl = this.closest('.nav-tabs');
      if (navUl) {
        navUl.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
      }
      this.classList.add('active');

      var targetPane = document.querySelector(targetId);
      if (targetPane) {
        var container = targetPane.parentElement;
        if (container) {
          container.querySelectorAll('.tab-pane').forEach(function(pane) {
            pane.classList.remove('active', 'show');
            pane.style.display = 'none';
          });
        }
        targetPane.classList.add('active', 'show');
        targetPane.style.display = 'block';

        // Trigger owlCarousel refresh or window resize event if owl carousel exists in pane
        if (window.jQuery && jQuery(targetPane).find('.owl-carousel').length) {
          try {
            jQuery(targetPane).find('.owl-carousel').trigger('refresh.owl.carousel');
          } catch(err) {}
        }
        window.dispatchEvent(new Event('resize'));
      }
    }

    // Attach to all tab links
    var tabLinks = document.querySelectorAll('.nav-tabs .nav-link, [data-toggle="tab"]');
    tabLinks.forEach(function(link) {
      link.addEventListener('click', handleTabClick);
    });

    // Make sure initial active tab pane is displayed
    var activeLink = document.querySelector('.nav-tabs .nav-link.active');
    if (activeLink) {
      var activeId = activeLink.getAttribute('href') || activeLink.getAttribute('data-target');
      if (activeId && document.querySelector(activeId)) {
        document.querySelector(activeId).classList.add('active', 'show');
        document.querySelector(activeId).style.display = 'block';
      }
    }
  });
</script>
`;

// Replace existing injected style/script block if present
html = html.replace(/<style id="urbania-custom-fixes">[\s\S]*?<\/style>/gi, '');
html = html.replace(/<script id="urbania-tab-fix">[\s\S]*?<\/script>/gi, '');

html = html.replace('</head>', `${customOverrideCss}\n</head>`);
html = html.replace('</body>', `${customTabJs}\n</body>`);

fs.writeFileSync('urbania-dx.html', html, 'utf8');
console.log('Updated urbania-dx.html with full tab pane and owl carousel display fixes');
