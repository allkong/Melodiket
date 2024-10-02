'use client';

import LargeButton from '@/components/atoms/button/LargeButton';
import type { TicketBook } from '@/types/ticket';
import { Suspense, useState } from 'react';
import SeatSelector from './seat-selector';
import { formatPrice } from '@/utils/concertFormatter';

interface SeatSectionProps {
  onNext: (
    data: Pick<TicketBook, 'seatRow' | 'seatCol' | 'tokenAmount'>
  ) => void;
}

const SeatSection = ({ onNext }: SeatSectionProps) => {
  const [seatInfo, setSeatInfo] = useState<
    Pick<TicketBook, 'seatRow' | 'seatCol' | 'tokenAmount'>
  >({
    seatRow: -1,
    seatCol: -1,
    tokenAmount: 0,
  });

  return (
    <div className="flex flex-col w-full h-full pb-20">
      <div className="h-0 flex-grow overflow-auto">
        <Suspense fallback={<div>loading...</div>}>
          <SeatSelector
            seatInfo={seatInfo}
            onChange={(data) => setSeatInfo(data)}
          />
        </Suspense>
      </div>
      <div className="relative w-full px-6 pb-6 bg-white space-y-7">
        <div className="absolute w-full h-6 top-0 left-0 rounded-full -translate-y-1/2 bg-white" />
        <div>
          <p className="text-base font-semibold">선택된 좌석</p>
          <p className="text-xs">
            {seatInfo.tokenAmount !== 0
              ? `${seatInfo.seatRow}행 ${seatInfo.seatCol}열`
              : '좌석을 선택해주세요'}
          </p>
        </div>
        <p className="text-base font-semibold">
          가격 {formatPrice(seatInfo.tokenAmount)}
        </p>
      </div>
      <div className="fixed w-full max-w-xl bottom-0 left-1/2 -translate-x-1/2 px-6 py-3 bg-white">
        <LargeButton
          label="다음 단계"
          onClick={() => onNext(seatInfo)}
          disabled={seatInfo.tokenAmount === 0}
        />
      </div>
    </div>
  );
};

export default SeatSection;
