import { RefObject, useEffect, useState } from 'react';

export default function useElementSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getSize = () => {
      if (ref.current !== null) {
        const width = ref.current?.offsetWidth;
        const height = ref.current?.offsetHeight;
        return { width, height };
      }
      return { width: 0, height: 0 };
    };

    const handleResize = () => {
      setSize(getSize());
    };

    if (ref.current !== null) {
      setSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return size;
}
