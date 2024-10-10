'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface MenuPortalProps {
  children: ReactNode;
}

const MenuPortal = ({ children }: MenuPortalProps) => {
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
        document.getElementById('menu-portal') as HTMLElement
      )
    : null;
};

export default MenuPortal;
