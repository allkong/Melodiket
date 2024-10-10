import MusicianItem from '@/components/molecules/item/MusicianItem';
import { MusicianDetail } from '@/types/musician';
import { getS3Url } from '@/utils/getUrl';
import { RefetchOptions } from '@tanstack/react-query';

interface FavoriteMusicianProps {
  data?: MusicianDetail[];
  refetch?: (options?: RefetchOptions) => void;
}

const FavoriteMusician = ({ data, refetch }: FavoriteMusicianProps) => {
  return (
    <div>
      {data?.map((musician) => (
        <MusicianItem
          key={musician.uuid}
          uuid={musician.uuid}
          musicianName={musician.nickname}
          src={getS3Url(musician.imageUrl)}
          initialFavorite={musician.isLike}
          initialFavoriteCount={musician.likeCount}
          onClick={refetch}
        />
      ))}
    </div>
  );
};

export default FavoriteMusician;
