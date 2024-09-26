'use client';

import { ReactNode, useRef } from 'react';

import clsx from 'clsx';

import useElementSize from '@/hooks/useElementSize';
import useMenuStore from '@/store/menuStore';

interface MenuMainProps {
  children?: ReactNode;
}

const MenuMain = ({ children }: MenuMainProps) => {
  const { isOpen, setIsOpen } = useMenuStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);

  return (
    <div className="relative top-0 left-0 w-full">
      <div
        className={clsx(
          'absolute top-0 left-0 h-screen w-full bg-black transition-opacity duration-300',
          {
            'opacity-60 pointer-events-auto': isOpen,
            'opacity-0 pointer-events-none': !isOpen,
          }
        )}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <div
        ref={containerRef}
        className={clsx(
          'absolute top-0 left-0 h-screen min-w-[300px] w-2/3 bg-white transition-transform duration-300 ease-out pointer-events-auto'
        )}
        style={{
          transform: isOpen ? 'translate(0)' : `translate(-${width}px)`,
        }}
      >
        <div className="w-full h-screen space-y-3 pb-10 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MenuMain;
