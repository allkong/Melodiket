'use client';

import Profile from '@/components/atoms/profile/Profile';
import ArrowButton from '@/components/atoms/button/ArrowButton';
import OptionButton from '@/components/atoms/button/OptionButton';
import useAuthStore from '@/store/authStore';
import Link from 'next/link';

const MenuProfile = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center gap-4 w-full h-[104px] px-5 py-4 text-gray-500">
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
        <Link href="/auth/login">
          <p>로그인 후 이용해주세요.</p>
        </Link>
      )}
    </div>
  );
};

export default MenuProfile;
