'use client';

import { useState } from 'react';
import Header from '@/components/organisms/navigation/Header';
import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import Checkbox from '@/components/atoms/checkbox/Checkbox';

const Page = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (value: boolean) => {
    setIsChecked(value);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0">
        <div className="h-full flex flex-col">
          <div className="flex-grow h-0 overflow-y-auto">
            <div className="flex flex-col p-6">
              <div className="mt-[8vh]">
                <div className="w-full">
                  <TextBanner
                    title={`회원 탈퇴 전 확인하세요`}
                    description="탈퇴하시면 삭제된 정보는 복구가 불가능합니다"
                    hasLogo
                  />
                </div>
              </div>
              <div className="flex flex-col mt-10 space-y-4">
                <div className="bg-gray-100 rounded-md px-4 py-3">
                  <p>1. 계정과 관련된 정보가 모두 삭제됩니다.</p>
                  <p>2. 사용 및 환전하지 않은 멜로디는 사라집니다.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    rounded
                    isChecked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <p className="text-gray-700">
                    안내사항을 모두 확인하였으며, 이에 동의합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 h-fit p-4">
            <LargeButton label="탈퇴하기" disabled={!isChecked} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
