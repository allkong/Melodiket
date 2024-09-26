'use client';

import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';

import MenuButton from '@/components/atoms/button/MenuButton';
import SearchButton from '@/components/atoms/button/SearchButton';
import {
  LogoText,
  BackLine,
  Basket,
  Card,
  Favorite,
  ForwardLine,
  Guitar,
  Microphone,
  Music,
  MyPage,
} from '@/public/icons';
import useMenuStore from '@/store/menuStore';
import Menu from '@/components/organisms/menu/Menu';

interface HeaderProps {
  isFixed?: boolean;
}

const Header = ({ isFixed = false }: HeaderProps) => {
  const { isOpen: isMenuOpen, setIsOpen: setIsMenuOpen } = useMenuStore();

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
          isFixed ? 'fixed top-0 left-0 right-0 w-full' : 'relative',
          'transition-colors duration-300 z-10',
          isFixed && isScrolled ? 'bg-white' : 'bg-transparent'
        )}
      >
        <div className="flex items-center justify-between max-w-xl px-6 py-4 mx-auto">
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
          <LogoText />
          <SearchButton />
        </div>
      </header>
      <Menu>
        <Menu.Header />
        <Menu.Profile />
        <Menu.Divider />
        <Menu.Item href="/concert/list" icon={<Music />} label="공연" />
        <Menu.Item href="/concert" icon={<Music />} label="공연 생성" />
        <Menu.Item href="/musicians" icon={<Guitar />} label="뮤지션" />
        <Menu.Divider />
        <Menu.Item
          href="/favorites"
          icon={<Favorite />}
          label="찜한 공연/뮤지션"
        />
        <Menu.Item href="/" icon={<Basket />} label="예매내역" />
        <Menu.Item href="/" icon={<Card />} label="포토카드" />
        <Menu.Item href="/" icon={<Microphone />} label="내 공연" />
        <Menu.Divider />
        <Menu.Item href="/" icon={<MyPage />} label="마이페이지" />
        <Menu.Item href="/" icon={<BackLine />} label="로그아웃" />
      </Menu>
    </>
  );
};

export default Header;
