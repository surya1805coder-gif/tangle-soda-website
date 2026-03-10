## 2025-05-15 - Accessibility Polish for Interactive Elements
**Learning:** Interactive elements like quantity adjustments and social links often lack descriptive text for screen readers when they only use symbols or icons. Additionally, mobile navigation toggles must explicitly communicate their expanded/collapsed state to be accessible.
**Action:** Always provide descriptive `aria-label` attributes for icon-only buttons and use `aria-expanded` to reflect the state of toggleable components like mobile menus. Use `aria-live` for dynamic content updates that users need to be aware of.
