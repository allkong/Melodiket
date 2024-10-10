'use client';

import Link from 'next/link';
import { usePhotocardList } from '@/services/photocard/fetchPhotocard';

import PhotocardCard from '@/components/molecules/card/PhotocardCard';
import EmptyData from '@/components/molecules/text/EmptyData';
import PhotocardListSkeleton from './photocard-list-skeleton';

const PhotocardListSection = () => {
  const { data: photocards, isLoading, isSuccess } = usePhotocardList();

  if (isLoading) {
    return <PhotocardListSkeleton count={4} />;
  }

  if (isSuccess && (!photocards || photocards.length === 0)) {
    return <EmptyData text="제작한 포토카드가 없어요" />;
  }

  if (isSuccess && photocards.length) {
    return (
      <div className="h-full">
        <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 place-items-center w-full px-3 mt-2">
          {photocards.map((photocard) => (
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
      </div>
    );
  }
};

export default PhotocardListSection;
