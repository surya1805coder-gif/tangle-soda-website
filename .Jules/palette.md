## 2025-05-15 - [Scroll Restoration in SPAs]
**Learning:** React Single Page Applications (SPAs) do not automatically reset scroll position to the top when navigating between routes, which can lead to a disjointed user experience where users land in the middle or bottom of a new page.
**Action:** Always implement a `ScrollToTop` component that uses `useLocation` to detect route changes and calls `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`. Using `behavior: 'instant'` is crucial to bypass any global smooth scrolling CSS and ensure an immediate reset.

## 2025-05-16 - [Form Accessibility & Process Indicators]
**Learning:** Explicitly associating form labels with inputs using `htmlFor` and `id` is essential for screen reader users to understand field purpose. Additionally, using `aria-current="step"` on multi-step process indicators provides critical context about the user's progress.
**Action:** When creating forms or multi-step flows, always ensure `htmlFor` matches the input `id` and apply `aria-current="step"` to the active step in the sequence.
