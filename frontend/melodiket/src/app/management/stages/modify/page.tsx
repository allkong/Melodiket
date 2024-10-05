'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/organisms/navigation/Header';
import TextBanner from '@/components/molecules/text/TextBanner';
import StageItem from '@/components/molecules/item/StageItem';

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0 p-4">
        <TextBanner
          title="수정할 공연장을 선택해주세요"
          description="공연장을 수정하면 되돌릴 수 없습니다"
        />
        <div className="mt-10 mb-4">
          <StageItem
            title="고척 스카이돔"
            content="서울특별시 구로구 경인로 430"
            isModify={true}
          />
          <StageItem
            title="잠실 종합운동장"
            content="서울특별시 송파구 올림픽로 25"
            isModify={true}
          />
          <StageItem
            title="올림픽공원 체조경기장"
            content="서울특별시 송파구 방이동 올림픽로 424"
            isModify={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
