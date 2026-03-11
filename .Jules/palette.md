## 2025-05-14 - Scroll Restoration and Quantity Control Accessibility

**Learning:** Single Page Applications (SPAs) do not automatically reset scroll position on navigation, which can lead to a confusing user experience when moving between long pages. Additionally, icon-only buttons for quantity adjustments require explicit ARIA labels for screen readers to convey their purpose, and dynamic values should use `aria-live` for real-time feedback.

**Action:** Implement a `ScrollToTop` component to handle scroll restoration globally and ensure all quantity controls have descriptive `aria-label` attributes and `aria-live` on their value displays.
