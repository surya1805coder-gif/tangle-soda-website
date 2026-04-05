## 2025-05-15 - [Scroll Restoration in SPAs]
**Learning:** React Single Page Applications (SPAs) do not automatically reset scroll position to the top when navigating between routes, which can lead to a disjointed user experience where users land in the middle or bottom of a new page.
**Action:** Always implement a `ScrollToTop` component that uses `useLocation` to detect route changes and calls `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`. Using `behavior: 'instant'` is crucial to bypass any global smooth scrolling CSS and ensure an immediate reset.

## 2025-05-16 - [Mobile Navigation State Sync]
**Learning:** In React SPAs, mobile menus should close automatically on navigation to ensure a smooth transition. While event delegation on link clicks provides immediate feedback, using `useEffect` with a `location` dependency is necessary to handle all navigation types, such as browser back/forward buttons.
**Action:** Implement both an `onClick` handler on the navigation container for link clicks and a `useEffect` hook that resets the menu state on `location` changes. If the `useEffect` triggers a 'cascading render' lint error, use `// eslint-disable-next-line` to prioritize robust state management over strict linting in this specific case.
