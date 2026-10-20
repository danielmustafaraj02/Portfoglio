import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const REDUCED = '(prefers-reduced-motion: reduce)';

export function useReducedMotion() {
  return useSyncExternalStore(
    notify => {
      const query = window.matchMedia(REDUCED);
      query.addEventListener('change', notify);
      return () => query.removeEventListener('change', notify);
    },
    () => window.matchMedia(REDUCED).matches,
  );
}

/** True while the element is on screen and the tab is visible; loops use it to stop when nobody can see them. */
export function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return [ref, inView && tabVisible] as const;
}

/** Marks each `.section` as visible the first time it scrolls into view (CSS draws the trace and reveals it). */
export function useSectionReveal(reduced: boolean) {
  useEffect(() => {
    if (reduced) return;
    const root = document.documentElement;
    root.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );
    document.querySelectorAll('.section').forEach(el => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, [reduced]);
}
