'use client';

import MenuButton from '@/components/atoms/button/MenuButton';
import SearchButton from '@/components/atoms/button/SearchButton';
import { LogoText } from '@/public/icons';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <MenuButton />
      <LogoText />
      <SearchButton />
    </header>
  );
};

export default Header;
