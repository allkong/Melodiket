'use client';

import MediumButton from '@/components/atoms/button/MediumButton';
import SubHeader from '@/components/organisms/navigation/SubHeader';
import { Heart, ImageLine, Ticket } from '@/public/icons';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handlePrev = () => {
    router.back();
  };

  const handleClose = () => {
    router.push('/photocards');
  };
  return (
    <div className="flex flex-col h-screen">
      <SubHeader
        title="포토카드 제작"
        onPrev={handlePrev}
        canGoPrev
        onClose={handleClose}
      />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-[20.7rem] h-[33.3rem] relative rounded-lg overflow-hidden border border-gray-200 px-5 pt-5">
          <div className="w-full bg-gray-100 h-[25.9rem] rounded-lg flex items-center justify-center">
            사진에 들어갈 이미지를 선택해 주세요
          </div>
        </div>

        <div className="flex mt-10 space-x-3">
          <MediumButton
            label="공연 포스터"
            icon={<Ticket />}
            onClick={() => {}}
          />
          <MediumButton
            label="이미지 선택"
            icon={<ImageLine />}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
