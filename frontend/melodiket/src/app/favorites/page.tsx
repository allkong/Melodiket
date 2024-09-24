'use client';

import { useState } from 'react';

import { FAVORITE_TYPES } from '@/constants/favoriteTypes';

import Header from '@/components/organisms/navigation/Header';
import FavoriteTitle from '@/components/molecules/title/FavoriteTitle';
import Tabs from '@/components/organisms/controls/Tabs';

const Page = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(FAVORITE_TYPES)[0]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div>
      <Header />
      <FavoriteTitle
        type={activeTab as keyof typeof FAVORITE_TYPES}
        total={3}
      />
      <Tabs
        tabs={Object.keys(FAVORITE_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={FAVORITE_TYPES}
      />
    </div>
  );
};

export default Page;
