'use client';

import { useRouter } from 'next/navigation';

import { Home, Notification } from '@/public/icons';
import useMenuStore from '@/store/menuStore';

const MenuHeader = () => {
  const { setIsOpen } = useMenuStore();
  const router = useRouter();

  const handleClick = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div className="flex justify-between items-center w-full h-14 px-4 text-gray-500">
      <div onClick={() => handleClick('/')}>
        <Home className="fill-current" />
      </div>
      <div onClick={() => handleClick('/')}>
        <Notification className="fill-current" />
      </div>
    </div>
  );
};

export default MenuHeader;
