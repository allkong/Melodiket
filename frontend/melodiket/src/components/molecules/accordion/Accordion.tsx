'use client';

import { ReactNode, useRef, useState } from 'react';

import ArrowButton from '@/components/atoms/button/ArrowButton';
import clsx from 'clsx';
import useElementSize from '@/hooks/useElementSize';

interface AccordionProps {
  label?: string;
  children?: ReactNode;
}

const Accordion = ({ label, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const childrenRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useElementSize(childrenRef);

  return (
    <div className={clsx('w-full px-5 bg-white h-fit')}>
      <div className="flex justify-between items-center w-full h-12 bg-white">
        <p className="text-base font-medium">{label}</p>
        <ArrowButton
          onClick={() => setIsOpen(!isOpen)}
          direction={isOpen ? 'up' : 'down'}
        />
      </div>
      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{
          height: isOpen ? height : 0,
          transition: 'height 0.35s ease',
        }}
      >
        <div ref={childrenRef} className="py-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
