'use client';

import { useState } from 'react';

import { FAVORITE_TYPES } from '@/constants/favoriteTypes';

import Header from '@/components/organisms/navigation/Header';
import FavoriteTitle from '@/components/molecules/title/FavoriteTitle';
import Tabs from '@/components/organisms/controls/Tabs';
import MusicianItem from '@/components/molecules/item/MusicianItem';

const Page = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(FAVORITE_TYPES)[0]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div className="flex flex-col h-screen">
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
      <div className="flex-grow h-0 overflow-y-auto">
        {activeTab === 'musician' && (
          <div>
            <MusicianItem
              src={''}
              musicianName={'장원영'}
              favoriteCount={10}
              bookingCount={2}
              isFavorite
            />
          </div>
        )}
        <div className="h-96 bg-pink-50">dd</div>
        <div className="h-96 bg-pink-50">dd</div>
      </div>
    </div>
  );
};

export default Page;
