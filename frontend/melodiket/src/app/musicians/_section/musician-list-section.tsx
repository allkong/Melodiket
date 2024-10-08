'use client';

import MusicianItem from '@/components/molecules/item/MusicianItem';
import { useMusiciansQuery } from '@/services/musician/fetchMusicians';
import { getS3Url } from '@/utils/getUrl';

const MusicianListSection = () => {
  const { data } = useMusiciansQuery();
  const { pages } = data ?? {};

  return (
    <div>
      {pages &&
        pages
          ?.flatMap((page) => page.result)
          .map((musician) => (
            <MusicianItem
              href={`/musicians/${musician.uuid}`}
              key={musician.uuid}
              src={getS3Url(musician.imageUrl)}
              musicianName={musician.nickname}
              favoriteCount={musician.likeCount}
              bookingCount={2}
              isFavorite
            />
          ))}
    </div>
  );
};

export default MusicianListSection;
