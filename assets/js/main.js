/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Custom filter group 
document.addEventListener("DOMContentLoaded", () => {
  const layout = document.querySelector(".isotope-layout");
  if (!layout) return;

  const isotopeContainer = layout.querySelector(".isotope-container");
  if (!isotopeContainer) return;

  // Try to find the Isotope instance the template created.
  // Many templates store it on the container element.
  const iso = isotopeContainer.isotope || window.Isotope?.data?.(isotopeContainer);
  if (!iso) return;

  const active = { case: "*", lens: "*" };

  layout.querySelectorAll(".filter-group").forEach(groupEl => {
    const groupName = groupEl.getAttribute("data-filter-group");
    groupEl.querySelectorAll("li[data-filter]").forEach(li => {
      li.addEventListener("click", (e) => {
        e.preventDefault();

        // set active class within the group only
        groupEl.querySelectorAll("li").forEach(x => x.classList.remove("filter-active"));
        li.classList.add("filter-active");

        // store selection
        active[groupName] = li.getAttribute("data-filter") || "*";

        // combine filters
        const caseFilter = active.case === "*" ? "" : active.case;
        const lensFilter = active.lens === "*" ? "" : active.lens;

        let combined = "*";
        if (caseFilter && lensFilter) combined = caseFilter + lensFilter;
        else if (caseFilter) combined = caseFilter;
        else if (lensFilter) combined = lensFilter;

        iso.arrange({ filter: combined });
      });
    });
  });
});

//when case changes, show only matching analysis items
document.addEventListener("DOMContentLoaded", () => {
  const caseList = document.querySelector('[data-filter-group="case"] .portfolio-filters');
  const analysisList = document.querySelector('#analysisFilters');
  if (!caseList || !analysisList) return;

  const caseItems = Array.from(caseList.querySelectorAll('li[data-filter]'));
  const analysisItems = Array.from(analysisList.querySelectorAll('li[data-filter][data-case]'));

  function setActive(listEl, activeLi) {
    listEl.querySelectorAll('li').forEach(li => li.classList.remove('filter-active'));
    activeLi.classList.add('filter-active');
  }

  function showAnalysisForCase(caseClass) {
    // Show only analysis items for the selected case
    analysisItems.forEach(li => {
      li.style.display = (li.dataset.case === caseClass) ? '' : 'none';
      li.classList.remove('filter-active');
    });

    // Auto-activate first visible analysis item
    const firstVisible = analysisItems.find(li => li.dataset.case === caseClass);
    if (firstVisible) {
      firstVisible.classList.add('filter-active');
      // Trigger click so Isotope updates (works with most Isotope setups)
      firstVisible.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }

  // Attach case click handler
  caseItems.forEach(li => {
    li.addEventListener('click', () => {
      // Your case li data-filter is like ".cs-belajar" — normalize to "cs-belajar"
      const raw = li.getAttribute('data-filter') || '';
      const caseClass = raw.replace('.', '').trim();
      if (!caseClass) return;

      setActive(caseList, li);
      showAnalysisForCase(caseClass);
    });
  });

  // Init based on currently active case (or first case)
  const activeCase = caseItems.find(li => li.classList.contains('filter-active')) || caseItems[0];
  if (activeCase) {
    const raw = activeCase.getAttribute('data-filter') || '';
    showAnalysisForCase(raw.replace('.', '').trim());
  }
});

//hide on load, show only active case’s analysis, update on click
document.addEventListener("DOMContentLoaded", () => {
  const caseList = document.querySelector('[data-filter-group="case"] .portfolio-filters');
  const analysisList = document.querySelector('#analysisFilters');
  if (!caseList || !analysisList) return;

  const caseItems = Array.from(caseList.querySelectorAll('li[data-filter]'));
  const analysisItems = Array.from(analysisList.querySelectorAll('li[data-filter][data-case]'));

  // 1) Hide EVERYTHING immediately on load
  analysisItems.forEach(li => li.classList.add('is-hidden'));

  function setActive(listEl, activeLi) {
    listEl.querySelectorAll('li').forEach(li => li.classList.remove('filter-active'));
    activeLi.classList.add('filter-active');
  }

  function showAnalysisForCase(caseClass) {
    // Hide all + clear active
    analysisItems.forEach(li => {
      li.classList.add('is-hidden');
      li.classList.remove('filter-active');
    });

    // Show only matching
    const matches = analysisItems.filter(li => li.dataset.case === caseClass);
    matches.forEach(li => li.classList.remove('is-hidden'));

    // Activate first matching analysis item and trigger filter update
    if (matches.length) {
      matches[0].classList.add('filter-active');
      matches[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }

  // Case click => swap analysis list
  caseItems.forEach(li => {
    li.addEventListener('click', () => {
      const raw = li.getAttribute('data-filter') || '';
      const caseClass = raw.replace('.', '').trim();
      if (!caseClass) return;

      setActive(caseList, li);
      showAnalysisForCase(caseClass);
    });
  });

  // 2) On initial load, show analysis only for the active case (or fallback to first)
  const activeCase = caseItems.find(li => li.classList.contains('filter-active')) || caseItems[0];
  if (activeCase) {
    const raw = activeCase.getAttribute('data-filter') || '';
    showAnalysisForCase(raw.replace('.', '').trim());
  }
});
