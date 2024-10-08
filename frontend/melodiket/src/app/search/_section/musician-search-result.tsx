import { FAVORITE_TYPES } from '@/constants/favoriteTypes';

interface MusicianSearchResultProps {
  query: string;
  currentTab: keyof typeof FAVORITE_TYPES;
}

const MusicianSearchResult = ({}: MusicianSearchResultProps) => {
  return <div></div>;
};

export default MusicianSearchResult;
