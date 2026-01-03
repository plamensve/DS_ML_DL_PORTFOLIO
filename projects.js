document.addEventListener("DOMContentLoaded", () => {
  const projectsWrap = document.querySelector(".projects-reveal");
  if (!projectsWrap) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio >= 0.35) {
        projectsWrap.classList.add("is-active");
        observer.disconnect();
      }
    },
    { threshold: [0, 0.35, 1] }
  );

  observer.observe(projectsWrap);

  // Progressive enhancement: category filters for projects
  const filterContainer = document.querySelector('.projects-filters');
  const filterButtons = filterContainer ? Array.from(filterContainer.querySelectorAll('.filter-btn')) : [];
  const cards = Array.from(document.querySelectorAll('.projects-list .case-study'));

  if (filterButtons.length && cards.length) {
    const applyFilter = (filter) => {
      const f = (filter || 'all').toLowerCase();
      cards.forEach(card => {
        if (f === 'all') {
          card.classList.remove('is-hidden');
          return;
        }
        const cats = (card.getAttribute('data-cat') || '')
          .split(',')
          .map(s => s.trim().toLowerCase())
          .filter(Boolean);
        if (cats.includes(f)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    };

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        applyFilter(btn.dataset.filter);
      });
    });

    // Ensure initial state matches the default active button
    const initiallyActive = filterButtons.find(b => b.classList.contains('is-active')) || filterButtons[0];
    if (initiallyActive) {
      initiallyActive.setAttribute('aria-selected', 'true');
      applyFilter(initiallyActive.dataset.filter);
    }
  }
});

// Modal logic for Case Studies
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('case-modal');
  if (!modal) return;

  const dialog = modal.querySelector('.modal-dialog');
  const overlay = modal.querySelector('[data-close-modal]');
  const closeBtn = modal.querySelector('.modal-close');
  const content = modal.querySelector('.modal-content');
  const announcer = modal.querySelector('.modal-sr-announcer');
  const triggers = Array.from(document.querySelectorAll('.js-open-case'));
  let lastFocusEl = null;

  const buildModalHTML = (card) => {
    const title = card.querySelector('.case-title')?.textContent?.trim() || 'Case Study';
    const subtitle = card.querySelector('.case-subtitle')?.textContent?.trim() || '';
    const summary = card.querySelector('.case-summary')?.textContent?.trim() || '';
    const tags = Array.from(card.querySelectorAll('.tech-tags .tag')).map(t => t.textContent.trim());
    const metrics = Array.from(card.querySelectorAll('.case-metrics li')).map(m => m.innerHTML.trim());
    const meta = Array.from(card.querySelectorAll('.case-meta li')).map(m => m.innerHTML.trim());
    const artClass = card.querySelector('.case-art')?.className?.split(' ').find(c => c.startsWith('art--')) || '';

    return `
      <div class="modal-header">
        <h3 id="case-modal-title">${title}</h3>
        ${subtitle ? `<p class="modal-subtitle">${subtitle}</p>` : ''}
      </div>
      <div class="modal-grid">
        <div>
          <div class="modal-hero ${artClass}"></div>
          ${summary ? `<div class="modal-section"><h4>Overview</h4><p>${summary}</p></div>` : ''}
          ${metrics.length ? `<div class="modal-section"><h4>Key outcomes</h4><ul class="case-metrics">${metrics.map(m=>`<li>${m}</li>`).join('')}</ul></div>` : ''}
        </div>
        <aside>
          ${tags.length ? `<div class="modal-section"><h4>Technologies</h4><ul class="tech-tags">${tags.map(t=>`<li class="tag">${t}</li>`).join('')}</ul></div>` : ''}
          ${meta.length ? `<div class="modal-section"><h4>Details</h4><ul class="case-meta">${meta.map(m=>`<li>${m}</li>`).join('')}</ul></div>` : ''}
        </aside>
      </div>
    `;
  };

  const openModal = (card) => {
    lastFocusEl = document.activeElement;
    content.innerHTML = buildModalHTML(card);
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
    announcer && announcer.removeAttribute('hidden');
    // Focus first focusable element inside modal
    setTimeout(() => {
      const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      (focusable || closeBtn || dialog).focus();
    }, 0);
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    announcer && announcer.setAttribute('hidden', '');
    content.innerHTML = '';
    if (lastFocusEl && typeof lastFocusEl.focus === 'function') {
      lastFocusEl.focus();
    }
  };

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.case-study');
      if (card) openModal(card);
    });
  });

  // Close interactions
  [overlay, closeBtn].forEach(el => el && el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      e.preventDefault();
      closeModal();
    }
  });
});
