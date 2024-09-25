'use client';

import { useState } from 'react';

import { HISTORY_TYPES } from '@/constants/tickets';

import Header from '@/components/organisms/navigation/Header';
import Tabs from '@/components/organisms/controls/Tabs';

const Page = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(HISTORY_TYPES)[0]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Tabs
        tabs={Object.keys(HISTORY_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={HISTORY_TYPES}
      />
      <div>assdfsdfsd</div>
    </div>
  );
};

export default Page;
