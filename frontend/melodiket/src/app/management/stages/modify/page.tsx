'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/organisms/navigation/Header';
import TextBanner from '@/components/molecules/text/TextBanner';
import StageItem from '@/components/molecules/item/StageItem';
import { useGetMyStages } from '@/services/stage/fetchStage';

const Page = () => {
  const router = useRouter();
  const { mutate: getStages, data } = useGetMyStages();

  useEffect(() => {
    getStages();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0 p-4 overflow-y-auto">
        <TextBanner
          title="수정할 공연장을 선택해주세요"
          description="공연장을 수정하면 되돌릴 수 없습니다"
        />
        <div className="mt-10 mb-4">
          {data?.stages?.map((stage) => (
            <StageItem
              key={stage.id}
              title={stage.name}
              content={stage.address}
              isModify={false}
              uuid={stage.uuid}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
