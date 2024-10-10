'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/organisms/navigation/Header';
import Profile from '@/components/atoms/profile/Profile';
import MyPageItem from '@/components/molecules/item/MyPageItem';
import LineDivider from '@/components/atoms/divider/LineDivider';
import LargeButton from '@/components/atoms/button/LargeButton';

import { MLDY, Authority } from '@/public/icons';
import { useRouter } from 'next/navigation';
import { useGetMe, useUpdateMe } from '@/services/user/fetchUser';
import { useUploadImage } from '@/services/user/fetchUser';
import { useGetMyWallet } from '@/services/wallet/fetchWallet';
import { getS3Url } from '@/utils/getUrl';
import toast from 'react-hot-toast';
import { formatPrice } from '@/utils/concertFormatter';
import { useLogout } from '@/services/auth/fetchAuth';

const Page = () => {
  const router = useRouter();
  const { mutate: getMe, data } = useGetMe();
  const { mutate: getMyWallet, data: walletData } = useGetMyWallet();
  const { mutate: uploadImage } = useUploadImage();
  const { mutate: updateMe } = useUpdateMe();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const logout = useLogout();

  const isStageManager = data?.role === 'STAGE_MANAGER';
  const isAudience = data?.role === 'AUDIENCE';

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    getMe();
    getMyWallet();
  }, []);

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const uploadImageRequest = {
        type: data?.role,
        fileName: fileName,
      };

      uploadImage(uploadImageRequest, {
        onSuccess: async (response) => {
          const imageUrl = response.cdn;
          const presignedUrl = response.presigned;

          try {
            const uploadResponse = await fetch(presignedUrl, {
              method: 'PUT',
              body: file,
              headers: {
                'Content-Type': file.type,
              },
            });

            if (uploadResponse.ok) {
              updateMe(
                { imageUrl },
                {
                  onSuccess: () => {
                    toast('프로필 이미지가 성공적으로 업데이트되었습니다.');
                    getMe();
                  },
                  onError: () => {
                    toast.error('프로필 업데이트 실패!');
                  },
                }
              );
            } else {
              toast.error('파일 업로드에 실패했습니다.');
            }
          } catch (error) {
            toast.error('파일 업로드 중 오류가 발생했습니다.');
          }
        },
        onError: () => {
          toast.error('이미지 업로드 실패!');
        },
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0">
        <div className="h-full flex flex-col">
          <div className="flex-grow h-0 overflow-y-auto">
            <div className="flex items-center space-x-4 mb-4 p-4 relative">
              <Profile
                size="md"
                src={data?.imageUrl ? getS3Url(data.imageUrl) : undefined}
                onClick={handleProfileClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleFileChange}
              />

              <div>
                <p className="text-xl font-semibold text-black">
                  {data?.nickname}
                </p>
                <p className="text-sm text-gray-500">@{data?.loginId}</p>
              </div>
            </div>

            <div className="flex flex-col m-4 p-4 bg-purple-100 rounded-md">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Authority />
                  <p className="text-purple-400 font-medium">권한</p>
                </div>
                <p className="text-black ml-auto">{data?.role}</p>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <MLDY />
                  <p className="text-purple-400 font-medium">잔액</p>
                </div>
                <p className="text-black ml-auto">
                  {formatPrice(walletData?.tokenBalance ?? 0)}
                </p>
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
                <MyPageItem
                  label="찜한 공연/뮤지션"
                  onClick={() => handleNavigation('/favorites')}
                />
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
            <LargeButton label="로그아웃" onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
