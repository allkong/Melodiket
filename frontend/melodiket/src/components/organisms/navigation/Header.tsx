'use client';

import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';

import MenuButton from '@/components/atoms/button/MenuButton';
import SearchButton from '@/components/atoms/button/SearchButton';
import { LogoText } from '@/public/icons';

interface HeaderProps {
  isFixed?: boolean;
}

const Header = ({ isFixed = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    if (isFixed) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isFixed]);

  return (
    <header
      className={clsx(
        isFixed ? 'fixed top-0 left-0 right-0 w-full' : 'relative',
        'transition-colors duration-300 z-10',
        isFixed && isScrolled ? 'bg-white' : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between max-w-xl px-6 py-4 mx-auto">
        <MenuButton />
        <LogoText />
        <SearchButton />
      </div>
    </header>
  );
};

export default Header;
