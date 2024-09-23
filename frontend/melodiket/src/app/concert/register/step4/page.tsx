'use client';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import StageItem from '@/components/molecules/item/StageItem';

const Step4 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="w-full p-4">
      <TextBanner
        title="공연 등록을 위해 공연 정보를 입력해주세요"
        description="공연장을 선택해주세요"
      />
      <div className="mt-10 mb-4">
        <StageItem
          title="고척 스카이돔"
          content="서울특별시 구로구 경인로 430"
        />
        <StageItem
          title="고척 스카이돔"
          content="서울특별시 구로구 경인로 430"
        />
        <StageItem
          title="고척 스카이돔"
          content="서울특별시 구로구 경인로 430"
        />
      </div>
      <LargeButton label="다음" onClick={onNext} />
    </div>
  );
};

export default Step4;
