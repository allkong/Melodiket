'use client';

import RecentSearch from './_section/recent-search';
import SearchResult from './_section/search-result';
import { useRef, useState } from 'react';
import SearchInput from '@/components/molecules/input/SearchInput';
import useRecentSearchStore from '@/store/recentSearchStore';

const Page = () => {
  const [query, setQuery] = useState('');
  const { addRecentSearchItem } = useRecentSearchStore();

  const handleSubmit = (value: string) => {
    if (query !== value) {
      setQuery(value);

      if (value !== '') {
        addRecentSearchItem(value);
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <SearchInput
        onSubmit={handleSubmit}
        placeholder="검색어를 입력해주세요"
      />
      <div className="flex flex-col flex-grow h-0 w-full">
        {query === '' && <RecentSearch onClickRecentSearch={handleSubmit} />}
        {query !== '' && <SearchResult query={query} />}
      </div>
    </div>
  );
};

export default Page;
