// Rewire the approved Figma public demo into the real lesson pages as they are implemented.
// Runs after figma-site.js and also watches hash-driven re-renders.

function wireLessonLinks(root = document) {
  // Cover CTA -> real lesson 1 page.
  root.querySelectorAll('a.fs-btn.fs-btn-primary[href="#/login"]').forEach((link) => {
    if (link.textContent.includes('Darsni boshlash')) link.setAttribute('href', '/lesson-one.html');
  });

  // Navbar 1-Dars button on the cover page.
  root.querySelectorAll('[data-cover-lesson="1"]').forEach((button) => {
    if (button.dataset.lessonWired === '1') return;
    button.dataset.lessonWired = '1';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.href = '/lesson-one.html';
    }, true);
  });
}

wireLessonLinks();

const observer = new MutationObserver(() => wireLessonLinks());
observer.observe(document.documentElement, { childList: true, subtree: true });
