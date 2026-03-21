## 2025-05-14 - Instant Scroll Restoration in SPAs
**Learning:** When a web application has global `scroll-behavior: smooth` defined in CSS, standard `window.scrollTo(0, 0)` calls during navigation can feel sluggish or fail to reach the top if the user navigates while a smooth scroll is in progress.
**Action:** Use `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })` within a route-change `useEffect` to ensure the scroll position resets immediately and reliably for a better multi-page feel in an SPA.
