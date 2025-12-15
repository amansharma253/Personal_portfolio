(() => {
  /* =========================================================
     BOOTSTRAP
  ========================================================= */
  document.documentElement.classList.remove("no-js");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =========================================================
     THEME TOGGLE (PERSISTENT)
  ========================================================= */
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const root = document.documentElement;

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    root.setAttribute("data-theme", storedTheme);
    if (themeIcon) {
      themeIcon.textContent = storedTheme === "light" ? "☀" : "☾";
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      const nextTheme = isLight ? "dark" : "light";

      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);

      if (themeIcon) {
        themeIcon.textContent = nextTheme === "light" ? "☀" : "☾";
      }
    });
  }

  /* =========================================================
     STICKY HEADER + BACK TO TOP (RAF-THROTTLED)
  ========================================================= */
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  const backToTop = document.getElementById("back-to-top");

  let heroTrigger = 0;
  let ticking = false;

  const calculateHeroTrigger = () => {
    if (!hero) return;
    heroTrigger = hero.offsetHeight * 0.6;
  };

  const onScroll = () => {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY > heroTrigger;

      if (header) {
        header.classList.toggle("scrolled", scrolled);
      }

      if (backToTop) {
        backToTop.hidden = window.scrollY < heroTrigger;
      }

      ticking = false;
    });
  };

  if (header && hero) {
    calculateHeroTrigger();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calculateHeroTrigger);
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* =========================================================
     REVEAL ON SCROLL (STAGGERED)
  ========================================================= */
  const revealSections = document.querySelectorAll(".reveal");

  const reveal = section => {
    section.classList.add("visible");

    const staggerItems = section.querySelectorAll(
      "h2, h3, p, li, article, .skill-block, blockquote"
    );

    staggerItems.forEach((el, index) => {
      el.style.transitionDelay = `${index * 60}ms`;
    });
  };

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealSections.forEach(section => observer.observe(section));
  } else {
    revealSections.forEach(section => section.classList.add("visible"));
  }

  /* =========================================================
     CONTACT FORM (INTENTIONAL NO-OP)
  ========================================================= */
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      console.info(
        "[Portfolio] Contact form submitted (client-side only)."
      );
    });
  }
})();
