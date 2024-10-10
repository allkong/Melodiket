import useRecentSearchStore from '@/store/recentSearchStore';
import RecentSearchItem from '../_components/recent-search-item';

interface RecentConcertSearchProps {
  onClickRecentSearch: (value: string) => void;
}

const RecentConcertSearch = ({
  onClickRecentSearch,
}: RecentConcertSearchProps) => {
  const { recentConcertSearchList, removeRecentSearchItem, removeAll } =
    useRecentSearchStore();

  return (
    <div className="flex flex-col flex-shrink-0 h-full w-full overflow-y-auto">
      <div className="flex items-center justify-between w-full h-9 mb-3 px-5 text-xs">
        <p>최근 검색</p>
        <button onClick={() => removeAll('concert')} className="text-gray-300">
          전체 삭제
        </button>
      </div>
      <div className="flex flex-col gap-3 w-full flex-grow h-0 overflow-y-auto">
        {recentConcertSearchList.map((recentSearch) => (
          <RecentSearchItem
            key={recentSearch.index}
            label={recentSearch.label}
            onClick={() => onClickRecentSearch(recentSearch.label)}
            onClickDelete={() =>
              removeRecentSearchItem(recentSearch.index, 'concert')
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RecentConcertSearch;
