'use client';

import Header from '@/components/organisms/navigation/Header';
import PhotocardFlip from '@/components/organisms/photocard/PhotocardFlip';
import { usePhotocardDetail } from '@/services/photocard/usePhotocardDetail';

const Page = () => {
  const { data: photocard } = usePhotocardDetail();

  if (!photocard) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center">
        <section className="flex flex-col items-center">
          <h1 className="flex text-lg">
            <p className="font-semibold">{photocard.nickname}</p>님의 포토카드
          </h1>
          <div className="relative flex flex-col items-center w-fit">
            <p className="relative z-10">{photocard.createdAt}</p>
            <div className="h-2 w-[120%] bg-purple-200 opacity-30 absolute bottom-0.5" />
          </div>
        </section>

        <PhotocardFlip
          concertName={photocard.concertName}
          src={photocard.imageCid}
          startAt={photocard.startAt}
          stageName={photocard.stageName}
          seatRow={photocard.seatRow}
          seatCol={photocard.seatCol}
        />
      </div>
    </div>
  );
};

export default Page;
