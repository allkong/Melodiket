'use client';

import useMenuStore from '@/store/menuStore';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

interface MenuItemProps {
  icon: ReactElement;
  label: string;
  href: string;
}

const MenuItem = ({ icon, label, href }: MenuItemProps) => {
  const router = useRouter();
  const { setIsOpen } = useMenuStore();

  const handleClick = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div
      onClick={() => handleClick(href)}
      className="flex items-center gap-[10px] w-full h-[41px] px-6 cursor-pointer"
    >
      <div>{icon}</div>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default MenuItem;
