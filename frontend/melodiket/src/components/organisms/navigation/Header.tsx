'use client';

import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';

import MenuButton from '@/components/atoms/button/MenuButton';
import SearchButton from '@/components/atoms/button/SearchButton';
import { LogoText } from '@/public/icons';
import useMenuStore from '@/store/menuStore';
import Menu from '@/components/organisms/menu/Menu';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  isFixed?: boolean;
}

const Header = ({ isFixed = false }: HeaderProps) => {
  const { isOpen: isMenuOpen, setIsOpen: setIsMenuOpen } = useMenuStore();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    if (isFixed) {
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isFixed]);

  return (
    <>
      <header
        className={clsx(
          isFixed &&
            'fixed top-0 w-full z-10 transition-colors duration-300 max-w-xl mx-auto',
          isFixed && (isScrolled ? 'bg-white' : 'bg-transparent')
        )}
      >
        <div className="flex items-center justify-between max-w-xl px-6 py-4 mx-auto">
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
          <LogoText className="h-auto w-28" onClick={() => router.push('/')} />
          <SearchButton />
        </div>
      </header>
      <Menu />
    </>
  );
};

export default Header;
