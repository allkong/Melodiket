'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import useConfetti from '@/hooks/useConfetti';
import type { TicketBookResponse } from '@/types/ticket';
import { formatDateToYMD } from '@/utils/dayjsPlugin';

interface SuccessSectionProps {
  bookResult: TicketBookResponse | null;
}

const SuccessSection = ({ bookResult }: SuccessSectionProps) => {
  const router = useRouter();
  const fire = useConfetti();

  useEffect(() => {
    fire();
  }, [fire]);

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="flex-grow pt-[10vh] px-7 overflow-y-auto">
        <TextBanner
          hasLogo
          title="결제 완료!"
          description="멜로디켓에서 행복한 공연 생활을 보내보세요."
        />
        <div className="mt-14 flex justify-between items-center gap-4">
          <div className="relative w-28 h-36 rounded-md overflow-none">
            {bookResult?.posterCid && (
              <Image
                className="object-cover"
                src={bookResult.posterCid}
                alt="공연 완료 이미지"
                fill
              />
            )}
          </div>
          <div className="w-0 flex-grow">
            <p className="text-tiny">{bookResult?.concertTitle}</p>
            <div className="text-xs text-gray-500">
              <p>{bookResult?.stageName}</p>
              <p className="mb-3">{`${bookResult?.seatRow}행 ${bookResult?.seatCol}열`}</p>
              <p>{formatDateToYMD(bookResult?.startAt ?? '')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 flex px-3 h-fit gap-3">
        <LargeButton label="메인 화면" onClick={() => router.push('/')} />
        <LargeButton label="티켓 확인" onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default SuccessSection;
