// Rewire the approved Figma public demo into the real lesson pages as they are implemented.
// Runs after figma-site.js and also watches hash-driven re-renders.

function wireLessonLinks(root = document) {
  // Cover CTA -> real lesson 1 page.
  root.querySelectorAll('a.fs-btn.fs-btn-primary[href="#/login"]').forEach((link) => {
    if (link.textContent.includes('Darsni boshlash')) link.setAttribute('href', '/lesson-one.html');
  });

  const lessonRoutes = {
    '1': '/lesson-one.html',
    '2': '/lesson-two.html',
  };

  Object.entries(lessonRoutes).forEach(([lesson, href]) => {
    root.querySelectorAll(`[data-cover-lesson="${lesson}"]`).forEach((button) => {
      if (button.dataset.lessonWired === '1') return;
      button.dataset.lessonWired = '1';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = href;
      }, true);
    });
  });
}

wireLessonLinks();

const observer = new MutationObserver(() => wireLessonLinks());
observer.observe(document.documentElement, { childList: true, subtree: true });
