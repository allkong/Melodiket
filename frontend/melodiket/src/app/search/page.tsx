'use client';

import ConcertSearchResult from './_section/concert-search-result';
import { KeyboardEvent, useState } from 'react';
import SearchInput from '@/components/molecules/input/SearchInput';
import useRecentSearchStore from '@/store/recentSearchStore';
import Tabs from '@/components/organisms/controls/Tabs';
import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import SearchContainer from './_components/search-container';
import RecentConcertSearch from './_section/recent-concert-search';
import RecentMusicianSearch from './_section/recent-musician-search';
import MusicianSearchResult from './_section/musician-search-result';

const Page = () => {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const { addRecentSearchItem } = useRecentSearchStore();

  const [activeTab, setActiveTab] = useState(
    Object.keys(FAVORITE_TYPES)[0] as keyof typeof FAVORITE_TYPES
  );

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue as keyof typeof FAVORITE_TYPES);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(value);
    }
  };

  const handleRecentClick = (value: string) => {
    setValue(value);
    handleSubmit(value);
  };

  const handleCloseClick = () => {
    setValue('');
    handleSubmit('');
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
        value={value}
        onChange={setValue}
        onKeyDown={handleKeyDown}
        onCloseClick={handleCloseClick}
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
          <RecentConcertSearch onClickRecentSearch={handleRecentClick} />
          <RecentMusicianSearch onClickRecentSearch={handleRecentClick} />
        </SearchContainer>
        <SearchContainer isVisible={query !== ''} currentTab={activeTab}>
          <ConcertSearchResult query={query} currentTab={activeTab} />
          <MusicianSearchResult query={query} currentTab={activeTab} />
        </SearchContainer>
      </div>
    </div>
  );
};

export default Page;
