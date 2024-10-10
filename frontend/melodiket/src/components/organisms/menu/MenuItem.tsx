'use client';

import useMenuStore from '@/store/menuStore';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

interface MenuItemProps {
  icon: ReactElement;
  label: string;
  href?: string;
  onClick?: () => void;
}

const MenuItem = ({ icon, label, href, onClick }: MenuItemProps) => {
  const router = useRouter();
  const { setIsOpen } = useMenuStore();

  const handleClick = () => {
    setIsOpen(false);

    if (onClick) {
      onClick();
    }
    if (href) {
      router.push(href);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-[10px] w-full h-[41px] px-6 cursor-pointer"
    >
      <div>{icon}</div>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default MenuItem;
