'use client';

import { useRouter } from 'next/navigation';

import Profile from '@/components/atoms/profile/Profile';
import ArrowButton from '@/components/atoms/button/ArrowButton';
import OptionButton from '@/components/atoms/button/OptionButton';
import useAuthStore from '@/store/authStore';
import useMenuStore from '@/store/menuStore';
import { useGetMe } from '@/services/user/fetchUser';
import { useEffect } from 'react';
import { getS3Url } from '@/utils/getUrl';

const MenuProfile = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { setIsOpen: setIsMenuOpen } = useMenuStore();
  const { mutate: getMe, data } = useGetMe();

  const closeMenuAndNavigate = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  useEffect(() => {
    if (user) {
      getMe();
    }
  }, [user]);

  const handleClickProfile = () => {
    if (user) {
      closeMenuAndNavigate('/mypage');
    } else {
      closeMenuAndNavigate('/auth/login');
    }
  };

  const getUserRoleLabel = (role: string): string => {
    if (role) {
      switch (role) {
        case 'AUDIENCE':
          return '관객';
        case 'MUSICIAN':
          return '뮤지션';
        case 'STAGE_MANAGER':
          return '공연 관리자';
      }
    }
    return 'Unknown';
  };

  return (
    <div
      onClick={handleClickProfile}
      className="flex items-center gap-4 w-full h-[104px] px-5 py-4 text-gray-500 cursor-pointer"
    >
      <Profile
        size="md"
        src={user && data?.imageUrl ? getS3Url(data.imageUrl) : undefined}
      />
      {user ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p>{user.nickname}</p>
            <ArrowButton />
          </div>
          <OptionButton
            label={getUserRoleLabel(user.role || '')}
            isSelected={true}
            onClick={() => {}}
          />
        </div>
      ) : (
        <div>
          <p>로그인 후 이용해 주세요</p>
        </div>
      )}
    </div>
  );
};

export default MenuProfile;
