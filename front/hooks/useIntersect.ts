import { useCallback, useEffect, useRef } from 'react';
import throttle from './throttle';

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;

const useIntersect = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref.current, options, callback]);

  return ref;
};

export default useIntersect;
