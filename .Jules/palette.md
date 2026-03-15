## 2025-05-14 - Instant Scroll Restoration
**Learning:** In a Single Page Application (SPA) where `scroll-behavior: smooth` is applied globally (e.g., in `index.css`), standard scroll-to-top logic on route changes can feel sluggish or fail to reset correctly if it relies on smooth transitions.
**Action:** Use `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })` within a `useEffect` hook triggered by route changes to ensure the user always starts at the top of the new page immediately.
