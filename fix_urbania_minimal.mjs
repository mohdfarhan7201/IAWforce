import fs from 'fs';

let html = fs.readFileSync('urbania-dx.html', 'utf8');

// Remove previously injected custom fixes
html = html.replace(/<style id="urbania-custom-fixes">[\s\S]*?<\/style>/gi, '');
html = html.replace(/<script id="urbania-tab-fix">[\s\S]*?<\/script>/gi, '');

// Minimal fix for tabs
const minimalTabJs = `
<script id="urbania-tab-fix">
  document.addEventListener('DOMContentLoaded', function() {
    var tabLinks = document.querySelectorAll('.nav-tabs .nav-link, [data-toggle="tab"]');
    tabLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href') || this.getAttribute('data-target');
        if (!targetId || targetId === '#') return;
        
        // Remove active class from all links
        var navUl = this.closest('.nav-tabs');
        if (navUl) {
          navUl.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
        }
        this.classList.add('active');

        // Hide all panes
        var targetPane = document.querySelector(targetId);
        if (targetPane) {
          var container = targetPane.parentElement;
          if (container) {
            container.querySelectorAll('.tab-pane').forEach(function(pane) {
              pane.classList.remove('active', 'show');
            });
          }
          // Show target pane
          targetPane.classList.add('active', 'show');
          
          // Trigger resize for Owl Carousel if it's there
          window.dispatchEvent(new Event('resize'));
        }
      });
    });
  });
</script>
`;

html = html.replace('</body>', `${minimalTabJs}\n</body>`);

fs.writeFileSync('urbania-dx.html', html, 'utf8');
console.log('Restored original layout and added minimal tab fix');
