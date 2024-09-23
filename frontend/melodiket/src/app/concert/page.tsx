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
    router.push('/concert/register');
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <Tabs
        tabs={Object.keys(CONCERT_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={CONCERT_TYPES}
      />

      <div className="w-full p-4">
        <LargeButton label="공연 등록" onClick={handleRegisterClick} />
      </div>
    </div>
  );
};

export default Page;
