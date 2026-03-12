## 2025-03-12 - Accessible Quantity Controls
**Learning:** Icon-only buttons (like "+" and "−" for quantity adjustments) are unlabelled for screen readers, and dynamic updates to the quantity value are not announced by default.
**Action:** Always provide explicit `aria-label` attributes for icon-only buttons and use `aria-live="polite"` on the value display to ensure real-time feedback for assistive technologies.
