## 2025-05-14 - [Scroll Restoration & Icon Button A11y]
**Learning:** React SPAs using `react-router-dom` don't reset scroll position by default, which can disorient users. Icon-only buttons (like "+"/"-") are invisible to screen readers without ARIA labels.
**Action:** Always include a `ScrollToTop` component in the main router and provide descriptive `aria-label`s for all icon-only interactive elements.
