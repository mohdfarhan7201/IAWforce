(function() {
  function initFloatingCta() {
    var body = document.body;
    var scrollUp = "scroll-up";
    var scrollDown = "scroll-down";
    var lastScroll = 0;

    // If page is short, show floating button immediately
    if (document.documentElement.scrollHeight <= window.innerHeight + 100) {
      body.classList.add(scrollDown);
    }

    // Scroll listener
    window.addEventListener("scroll", function() {
      var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll <= 0) {
        body.classList.remove(scrollUp);
        return;
      }
      if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
        body.classList.remove(scrollUp);
        body.classList.add(scrollDown);
      } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
      }
      lastScroll = currentScroll;
    }, { passive: true });

    // Click listener for .btn-circle toggle
    document.addEventListener("click", function(e) {
      var btn = e.target.closest(".btn-circle");
      var wrap = e.target.closest(".btn-wrap");
      if (btn) {
        e.preventDefault();
        var parent = btn.closest(".btn-wrap");
        if (parent) {
          parent.classList.toggle("activecta");
        }
      } else if (!wrap) {
        document.querySelectorAll(".btn-wrap.activecta").forEach(function(el) {
          el.classList.remove("activecta");
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFloatingCta);
  } else {
    initFloatingCta();
  }
})();
