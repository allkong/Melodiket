'use client';

import LargeButton from '@/components/atoms/button/LargeButton';
import Header from '@/components/organisms/navigation/Header';
import PhotocardFlip from '@/components/organisms/photocard/PhotocardFlip';
import { usePhotocardDetail } from '@/services/photocard/usePhotocardDetail';
import { formatDateToYMD } from '@/utils/dayjsPlugin';

const Page = () => {
  const { data: photocard } = usePhotocardDetail();

  if (!photocard) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header />
      <div className="flex flex-col items-center justify-between flex-grow">
        <section className="flex flex-col items-center">
          <h1 className="flex text-lg">
            <p className="font-semibold">{photocard.nickname}</p>님의 포토카드
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
            src={photocard.imageCid}
            startAt={photocard.startAt}
            stageName={photocard.stageName}
            seatRow={photocard.seatRow}
            seatCol={photocard.seatCol}
          />
        </div>

        <div className="w-[20.7rem]">
          <LargeButton label="예매 정보" />
        </div>
      </div>
    </div>
  );
};

export default Page;
