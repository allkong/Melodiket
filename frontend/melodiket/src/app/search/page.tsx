'use client';

import ConcertSearchResult from './_section/concert-search-result';
import { useState } from 'react';
import SearchInput from '@/components/molecules/input/SearchInput';
import useRecentSearchStore from '@/store/recentSearchStore';
import Tabs from '@/components/organisms/controls/Tabs';
import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import SearchContainer from './_components/search-container';
import RecentConcertSearch from './_section/recent-concert-search';
import RecentMusicianSearch from './_section/recent-musician-search';

const Page = () => {
  const [query, setQuery] = useState('');
  const { addRecentSearchItem } = useRecentSearchStore();

  const [activeTab, setActiveTab] = useState(
    Object.keys(FAVORITE_TYPES)[0] as keyof typeof FAVORITE_TYPES
  );

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue as keyof typeof FAVORITE_TYPES);
  };

  const handleSubmit = (value: string) => {
    if (query !== value) {
      setQuery(value);

      if (value !== '') {
        addRecentSearchItem(value, activeTab);
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <SearchInput
        onSubmit={handleSubmit}
        placeholder="검색어를 입력해주세요"
      />
      <div className="flex flex-col flex-grow h-0 w-full gap-2 px-2">
        <Tabs
          tabs={Object.keys(FAVORITE_TYPES)}
          activeTab={activeTab}
          onClick={handleTabClick}
          labelMap={FAVORITE_TYPES}
        />
        <SearchContainer isVisible={query === ''} currentTab={activeTab}>
          <RecentConcertSearch onClickRecentSearch={handleSubmit} />
          <RecentMusicianSearch onClickRecentSearch={handleSubmit} />
        </SearchContainer>
        <SearchContainer isVisible={query !== ''} currentTab={activeTab}>
          <ConcertSearchResult query={query} currentTab={activeTab} />
          <ConcertSearchResult query={query} currentTab={activeTab} />
        </SearchContainer>
      </div>
    </div>
  );
};

export default Page;
