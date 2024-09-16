'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import LoginLabel from '@/components/organisms/label/LoginLabel';
import AllCheckbox from '@/components/molecules/checkbox/AllCheckbox';
import LabelCheckbox from '@/components/molecules/checkbox/LabelCheckbox';

const Page = () => {
  const [isChecked, setIsChecked] = useState([false, false, false, false]);

  const handleCheck = (targetIdx: number, newValue: boolean) => {
    setIsChecked(
      isChecked.map((value, idx) => (idx !== targetIdx ? value : newValue))
    );
  };

  const handleCheckAll = (value: boolean) => {
    setIsChecked([value, value, value, value]);
  };

  const isCheckedAll = isChecked.every((value) => value);

  const isCheckValid = isChecked[0] && isChecked[1];

  return (
    <div className="w-full max-w-full h-full flex flex-col">
      <div className="flex-grow">
        <LoginLabel
          mainLabel={'멜로디켓 회원가입을 위해\n약관에 동의해 주세요.'}
          subLabel={'멜로디켓 서비스는 블록체인을 사용한 서비스에요.'}
        />
        <div className="mt-9 flex flex-col gap-4">
          <AllCheckbox
            label="전체 동의"
            isChecked={isCheckedAll}
            onChange={handleCheckAll}
          />
          <LabelCheckbox
            label="[필수] 만 14세 이상입니다."
            isChecked={isChecked[0]}
            onChange={(value) => handleCheck(0, value)}
          />
          <LabelCheckbox
            label="[필수] 이용약관, 개인정보 수집/이용"
            isChecked={isChecked[1]}
            onChange={(value) => handleCheck(1, value)}
          />
          <LabelCheckbox
            label="[선택] 위치 기반 서비스 이용"
            isChecked={isChecked[2]}
            onChange={(value) => handleCheck(2, value)}
          />
          <LabelCheckbox
            label="[선택] 홍보성 정보 수신"
            isChecked={isChecked[3]}
            onChange={(value) => handleCheck(3, value)}
          />
        </div>
      </div>
      <div className="my-4 h-fit">
        <LargeButton label="다음" disabled={!isCheckValid} />
      </div>
    </div>
  );
};

export default Page;
