'use client';

import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';

import MenuButton from '@/components/atoms/button/MenuButton';
import SearchButton from '@/components/atoms/button/SearchButton';
import { LogoText } from '@/public/icons';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 w-full transition-colors duration-300',
        isScrolled ? 'bg-white' : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-xl mx-auto">
        <MenuButton />
        <LogoText />
        <SearchButton />
      </div>
    </header>
  );
};

export default Header;
