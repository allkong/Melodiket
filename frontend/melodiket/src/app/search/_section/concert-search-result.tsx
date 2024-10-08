import { FAVORITE_TYPES } from '@/constants/favoriteTypes';

interface SearchResultProps {
  query: string;
  currentTab: keyof typeof FAVORITE_TYPES;
}

const SearchResult = ({ query }: SearchResultProps) => {
  return (
    <div className="flex flex-col flex-shrink-0 h-full w-full overflow-y-auto">
      {query}
    </div>
  );
};

export default SearchResult;
