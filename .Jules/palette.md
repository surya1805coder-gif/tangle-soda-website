# Palette's UX Journal

Critical UX and accessibility learnings for the Tangle project.

## 2025-05-14 - Navigation & Scroll Restoration
**Learning:** In single-page applications (SPAs), navigating to a new route often preserves the scroll position of the previous page, which can be disorienting for users (especially on long product pages).
**Action:** Implement a global ScrollToTop component that resets scroll position on every route change.
