## 2025-05-14 - Improve Quantity Control Accessibility
**Learning:** Icon-only buttons for quantity adjustment (+/-) are not descriptive for screen readers. Dynamic updates to quantity values are not announced unless wrapped in an aria-live region.
**Action:** Always add descriptive `aria-label` to quantity buttons and use `aria-live="polite"` with `aria-atomic="true"` for the quantity value display.

## 2025-05-14 - Prevent Cascading Renders during State Initialization
**Learning:** Initializing state with data derived from URL parameters inside `useEffect` triggers an unnecessary re-render and a lint error.
**Action:** Use a lazy initializer function in `useState` to set the initial state derived from props or URL parameters immediately during the first render.
