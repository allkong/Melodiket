'use client';

import Link from 'next/link';
import { usePhotocardList } from '@/services/photocard/fetchPhotocard';

import PhotocardCard from '@/components/molecules/card/PhotocardCard';
import EmptyData from '@/components/molecules/text/EmptyData';
import PhotocardListSkeleton from './photocard-list-skeleton';
import { getCidUrl } from '@/utils/getUrl';
import useAuthStore from '@/store/authStore';

const PhotocardListSection = () => {
  const { data: photocards, isLoading, isSuccess } = usePhotocardList();
  const { user } = useAuthStore();

  const currentPhotocards = photocards?.filter(
    (concert) => concert.nickName === user?.nickname
  );

  if (isLoading) {
    return <PhotocardListSkeleton count={4} />;
  }

  if (isSuccess && (!currentPhotocards || currentPhotocards.length === 0)) {
    return <EmptyData text="제작한 포토카드가 없어요" />;
  }

  if (isSuccess && photocards.length) {
    return (
      <div className="h-full">
        <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 place-items-center w-full px-3 mt-2">
          {currentPhotocards?.map((photocard) => (
            <Link
              key={photocard.photocardUuid}
              href={`/photocards/${photocard.photocardUuid}`}
              className="mb-3"
            >
              <PhotocardCard
                src={getCidUrl(photocard.imageCid)}
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
