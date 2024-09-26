'use client';

import { useRouter } from 'next/navigation';

import Profile from '@/components/atoms/profile/Profile';
import ArrowButton from '@/components/atoms/button/ArrowButton';
import OptionButton from '@/components/atoms/button/OptionButton';
import useAuthStore from '@/store/authStore';
import useMenuStore from '@/store/menuStore';

const MenuProfile = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { setIsOpen: setIsMenuOpen } = useMenuStore();

  const handleClick = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <div className="flex items-center gap-4 w-full h-[104px] px-5 py-4 text-gray-500 cursor-pointer">
      <Profile size="sm" />
      {user ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p>{user.nickname}</p>
            <ArrowButton />
          </div>
          <OptionButton
            label={user.role ?? 'Unknown User'}
            isSelected={true}
            onClick={() => {}}
          />
        </div>
      ) : (
        <div onClick={() => handleClick('/auth/login')}>
          <p>로그인 후 이용해주세요.</p>
        </div>
      )}
    </div>
  );
};

export default MenuProfile;
