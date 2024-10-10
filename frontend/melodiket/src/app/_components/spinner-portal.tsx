'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface SpinnerPortalProps {
  children: ReactNode;
}

const SpinnerPortal = ({ children }: SpinnerPortalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    return () => setIsMounted(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return isMounted
    ? createPortal(
        children,
        document.getElementById('spinner-portal') as HTMLElement
      )
    : null;
};

export default SpinnerPortal;
