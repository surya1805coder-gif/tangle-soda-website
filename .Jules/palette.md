## 2025-05-15 - [Scroll Restoration in SPAs]
**Learning:** React Single Page Applications (SPAs) do not automatically reset scroll position to the top when navigating between routes, which can lead to a disjointed user experience where users land in the middle or bottom of a new page.
**Action:** Always implement a `ScrollToTop` component that uses `useLocation` to detect route changes and calls `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`. Using `behavior: 'instant'` is crucial to bypass any global smooth scrolling CSS and ensure an immediate reset.

## 2026-04-03 - [Accessible Forms and Multi-step Indicators]
**Learning:** Form accessibility in React requires explicit association between `<label>` and `<input>` using `htmlFor` and `id`. Additionally, multi-step processes should communicate the active step to screen readers using `aria-current="step"`.
**Action:** Always ensure labels have `htmlFor` matching the input `id`. Use `aria-current="step"` on the active element of progress indicators.
