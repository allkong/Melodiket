import { RefObject, useEffect, useRef, useState } from 'react';

const useIsOnScreen = (ref: RefObject<HTMLElement>) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      setIsOnScreen(entry.isIntersecting);
    });
  }, []);

  useEffect(() => {
    observer.current?.observe(ref.current!);
    return () => observer.current?.disconnect();
  }, [ref]);

  return isOnScreen;
};

export default useIsOnScreen;
