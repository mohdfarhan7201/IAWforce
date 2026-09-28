/**
 * IAW Force Motors - Universal Mobile Navigation & Touch Scroll Fix
 */
(function() {
  function initMobileNav() {
    // 1. Move .mob-menu-models out of .firstlevel-menu if nested
    const modelsDrawer = document.querySelector('.mob-menu-models');
    const menuInner = document.querySelector('.mobile-menu-inner') || document.querySelector('.mobile-menu');
    if (modelsDrawer && menuInner && modelsDrawer.parentElement !== menuInner) {
      menuInner.appendChild(modelsDrawer);
    }

    // 2. Hamburger button click
    const hambgButtons = document.querySelectorAll('.mobhambgmenu, .site-navigation-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.closemobmenu');

    hambgButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (mobileMenu) {
          mobileMenu.classList.add('showmobmenu');
          document.body.classList.add('unscroll');
        }
      });
    });

    // 3. Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    function closeMobileMenu() {
      if (mobileMenu) {
        mobileMenu.classList.remove('showmobmenu');
      }
      document.body.classList.remove('unscroll');
      resetSubmodels();
    }

    // 4. Accordion tabs (Vehicles, etc.)
    const accordionTabs = document.querySelectorAll('.mobmenuhaschild');
    accordionTabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const tagid = this.getAttribute('data-tag');
        const targetMenu = document.getElementById(tagid);
        
        if (!targetMenu) return;

        const isAlreadyOpen = targetMenu.classList.contains('activechildmenu');

        document.querySelectorAll('.secondlevel-menu').forEach(m => m.classList.remove('activechildmenu'));
        document.querySelectorAll('.mobmenuhaschild').forEach(t => t.classList.remove('activechildtab'));

        if (!isAlreadyOpen) {
          targetMenu.classList.add('activechildmenu');
          this.classList.add('activechildtab');
        }
      });
    });

    // 5. Vehicle category clicks -> open models drawer
    const modelLinks = document.querySelectorAll('.mobsecondlevelparent .bus-catlink');

    modelLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const tagid = this.getAttribute('data-tag');
        const targetContainer = document.getElementById(tagid);

        if (!targetContainer) return;

        modelLinks.forEach(l => l.classList.remove('activemodeltab'));
        this.classList.add('activemodeltab');

        document.querySelectorAll('.mobmcontainer').forEach(c => {
          c.classList.remove('activemobmodel');
          c.classList.add('hidediv');
        });

        targetContainer.classList.add('activemobmodel');
        targetContainer.classList.remove('hidediv');
        targetContainer.scrollTop = 0;

        if (modelsDrawer) {
          modelsDrawer.classList.add('activemodels');
        }
      });
    });

    // 6. Back button inside model container (h5)
    document.querySelectorAll('.mob-model-firstlevel h5').forEach(backBtn => {
      backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        resetSubmodels();
      });
    });

    function resetSubmodels() {
      if (modelsDrawer) {
        modelsDrawer.classList.remove('activemodels');
      }
      document.querySelectorAll('.mobmcontainer').forEach(c => {
        c.classList.remove('activemobmodel');
        c.classList.add('hidediv');
      });
      document.querySelectorAll('.mobsecondlevelparent .bus-catlink').forEach(l => {
        l.classList.remove('activemodeltab');
      });
    }

    // 7. Active URL styling (ONLY for exact real page filename)
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (!currentPath.endsWith('.html')) {
      currentPath = currentPath ? currentPath + '.html' : 'index.html';
    }

    document.querySelectorAll('.firstlevel-menu a, .secondlevel-menu a, ul.menu-secondlevel-post a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#')) {
        link.classList.remove('activeurl');
        return;
      }
      const linkFile = href.split('/').pop().split('#')[0].split('?')[0];
      if (linkFile && (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html'))) {
        link.classList.add('activeurl');
      } else {
        link.classList.remove('activeurl');
      }
    });

    // 8. Close drawer on clicking actual navigation links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && !href.startsWith('#')) {
        link.addEventListener('click', function() {
          closeMobileMenu();
        });
      }
    });

    // 9. Close drawer if clicked outside (on overlay)
    if (mobileMenu) {
      mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
          closeMobileMenu();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
