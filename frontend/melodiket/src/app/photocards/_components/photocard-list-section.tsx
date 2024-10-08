'use client';

import PhotocardCard from '@/components/molecules/card/PhotocardCard';
import { usePhotocardList } from '@/services/photocard/usePhotocardList';
import Link from 'next/link';

const PhotocardListSection = () => {
  const { data: photocards } = usePhotocardList();

  return (
    <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 place-items-center w-full px-3 mt-2">
      {photocards &&
        photocards.map((photocard) => (
          <Link
            key={photocard.photocardUuid}
            href={`/photocards/${photocard.photocardUuid}`}
            className="mb-3"
          >
            <PhotocardCard
              src={photocard.imageCid}
              title={photocard.concertName}
            />
          </Link>
        ))}
    </div>
  );
};

export default PhotocardListSection;
