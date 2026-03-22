import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component ensures that the window is scrolled to the top
 * whenever the route changes. This is essential for SPAs to mimic
 * traditional browser navigation behavior.
 *
 * We use behavior: 'instant' to bypass any global smooth scrolling
 * and ensure the user starts at the top of the new page immediately.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, search]);

  return null;
}
