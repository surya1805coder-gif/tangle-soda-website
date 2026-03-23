## 2025-05-15 - [Scroll Restoration in SPAs]
**Learning:** React Single Page Applications (SPAs) do not automatically reset scroll position to the top when navigating between routes, which can lead to a disjointed user experience where users land in the middle or bottom of a new page.
**Action:** Always implement a `ScrollToTop` component that uses `useLocation` to detect route changes and calls `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`. Using `behavior: 'instant'` is crucial to bypass any global smooth scrolling CSS and ensure an immediate reset.
