'use client';

import { useState } from 'react';

import { FAVORITE_TYPES } from '@/constants/favoriteTypes';

import Header from '@/components/organisms/navigation/Header';
import PageTitle from '@/components/molecules/title/PageTitle';
import Tabs from '@/components/organisms/controls/Tabs';
import FavoriteConcert from './_components/favorite-concert';
import {
  useFetchFavoriteConcert,
  useFetchFavoriteMusiciansList,
} from '@/services/favorite/fetchFavorite';
import FavoriteMusician from './_components/favorite-musician';

const Page = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(FAVORITE_TYPES)[0]);
  const { data: concertData, refetch: refetchConcert } =
    useFetchFavoriteConcert();
  const { data: musician, refetch: refetchMusician } =
    useFetchFavoriteMusiciansList();
  const { result: musicianData } = musician ?? {};

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <PageTitle
        title={`좋아하는 ${FAVORITE_TYPES[activeTab as keyof typeof FAVORITE_TYPES]}`}
        total={
          activeTab === 'concert'
            ? (concertData?.length ?? 0)
            : (musicianData?.length ?? 0)
        }
      />
      <Tabs
        tabs={Object.keys(FAVORITE_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={FAVORITE_TYPES}
      />
      <div className="flex-grow h-0 overflow-y-auto">
        {activeTab === 'musician' && (
          <FavoriteMusician data={musicianData} refetch={refetchMusician} />
        )}
        {activeTab === 'concert' && (
          <FavoriteConcert data={concertData} refetch={refetchConcert} />
        )}
      </div>
    </div>
  );
};

export default Page;
