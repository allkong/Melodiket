'use client';

import Header from '@/components/organisms/navigation/Header';
import Profile from '@/components/atoms/profile/Profile';
import MyPageItem from '@/components/molecules/item/MyPageItem';
import LineDivider from '@/components/atoms/divider/LineDivider';
import LargeButton from '@/components/atoms/button/LargeButton';

import { MLDY, Authority } from '@/public/icons';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const isStageManager = user?.role === 'STAGE_MANAGER';
  const isAudience = user?.role === 'AUDIENCE';

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0">
        <div className="h-full flex flex-col">
          <div className="flex-grow h-0 overflow-y-auto">
            <div className="flex items-center space-x-4 mb-4 p-4">
              <Profile size="md" />
              <div>
                <p className="text-xl font-semibold text-black">
                  {user?.nickname}
                </p>
                <p className="text-sm text-gray-500">@{user?.id}</p>
              </div>
            </div>

            <div className="flex flex-col m-4 p-4 bg-purple-100 rounded-md">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Authority />
                  <p className="text-purple-400 font-medium">권한</p>
                </div>
                <p className="text-black ml-auto">{user?.role}</p>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <MLDY />
                  <p className="text-purple-400 font-medium">잔액</p>
                </div>
                <p className="text-black ml-auto">10,000 MLDY</p>
              </div>
            </div>

            <LineDivider />
            <MyPageItem label="계좌 등록" />
            <MyPageItem label="계좌 수정" />
            <MyPageItem label="계좌 충전" />
            <LineDivider />
            {isStageManager && (
              <>
                <MyPageItem
                  label="공연장 등록하기"
                  onClick={() =>
                    handleNavigation('/management/stages/register')
                  }
                />
                <MyPageItem
                  label="공연장 삭제하기"
                  onClick={() => handleNavigation('/management/stages/modify')}
                />
                <LineDivider />
              </>
            )}
            {isAudience && (
              <>
                <MyPageItem label="찜한 공연" />
                <MyPageItem label="찜한 뮤지션" />
                <MyPageItem label="예매 내역" />
                <LineDivider />
              </>
            )}
            <MyPageItem
              label="정보 수정하기"
              onClick={() => handleNavigation('/mypage/modify')}
            />
            <MyPageItem
              label="탈퇴하기"
              onClick={() => handleNavigation('/mypage/withdrawal')}
            />
          </div>
          <div className="my-4 h-fit p-4">
            <LargeButton label="로그아웃" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
