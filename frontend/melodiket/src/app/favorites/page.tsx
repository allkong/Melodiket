'use client';

import { FAVORITE_TYPE } from '@/constants/favoriteType';

import Header from '@/components/organisms/navigation/Header';
import FavoriteTitle from '@/components/molecules/title/FavoriteTitle';
import Tabs from '@/components/organisms/controls/Tabs';
import { useState } from 'react';

const Page = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(FAVORITE_TYPE)[0]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div>
      <Header />
      <FavoriteTitle type={activeTab as keyof typeof FAVORITE_TYPE} total={3} />
      <Tabs
        tabs={Object.keys(FAVORITE_TYPE)}
        activeTab={activeTab}
        onClick={handleTabClick}
      />
    </div>
  );
};

export default Page;
