'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CONCERT_TYPES } from '@/constants/concertTypes';

import Header from '@/components/organisms/navigation/Header';
import Tabs from '@/components/organisms/controls/Tabs';
import LargeButton from '@/components/atoms/button/LargeButton';

const Page = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(CONCERT_TYPES)[0]);
  const router = useRouter();

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const handleRegisterClick = () => {
    router.push('/concert/register/step1');
  };

  return (
    <div>
      <Header />
      <Tabs
        tabs={Object.keys(CONCERT_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={CONCERT_TYPES}
      />
      <div className="my-4 h-fit ml-4 mr-4">
        <LargeButton label="공연 등록" onClick={handleRegisterClick} />
      </div>
    </div>
  );
};

export default Page;
