'use client';

import { useRouter } from 'next/navigation';

import { usePhotocardDetail } from '@/services/photocard/fetchPhotocard';
import { formatDateToYMD } from '@/utils/dayjsPlugin';
import { getCidUrl } from '@/utils/getUrl';

import Header from '@/components/organisms/navigation/Header';
import PhotocardFlip from '@/components/organisms/photocard/PhotocardFlip';
import LargeButton from '@/components/atoms/button/LargeButton';

interface PageProps {
  params: { uuid: string };
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();
  const { data: photocard } = usePhotocardDetail(params.uuid);

  if (!photocard) {
    return null;
  }

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header />
      <div className="flex flex-col items-center py-8">
        <section className="flex flex-col items-center mb-9">
          <h1 className="flex text-lg">
            <p className="font-semibold">{photocard.nickName}</p>님의 포토카드
          </h1>
          <div className="relative flex flex-col items-center w-fit">
            <p className="relative z-10">
              {formatDateToYMD(photocard.createdAt)}
            </p>
            <div className="h-2 w-[120%] bg-purple-200 opacity-30 absolute bottom-0.5" />
          </div>
        </section>

        <div className="mb-10">
          <PhotocardFlip
            concertName={photocard.concertName}
            src={getCidUrl(photocard.imageCid)}
            startAt={photocard.startAt}
            stageName={photocard.stageName}
            seatRow={photocard.seatRow}
            seatCol={photocard.seatCol}
            musicians={photocard.musicians}
            favoriteMusician={photocard.favoriteMusician}
          />
        </div>

        <div className="w-[20.7rem]">
          <LargeButton label="홈으로 이동" onClick={handleGoHome} />
        </div>
      </div>
    </div>
  );
};

export default Page;
