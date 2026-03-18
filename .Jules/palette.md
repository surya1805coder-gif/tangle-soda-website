## 2025-05-14 - Scroll Restoration in Smooth-Scrolling Environments
**Learning:** When `scroll-behavior: smooth` is set globally in CSS, standard `window.scrollTo(0, 0)` calls in React `useEffect` hooks may result in a slow, visible scroll rather than an immediate jump, which can be jarring on navigation.
**Action:** Use `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })` to bypass CSS smooth transitions and ensure the page is immediately reset to the top when the route changes.
