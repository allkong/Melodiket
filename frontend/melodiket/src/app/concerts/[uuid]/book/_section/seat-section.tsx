'use client';

import LargeButton from '@/components/atoms/button/LargeButton';
import type { TicketBookRequest } from '@/types/ticket';
import { Suspense, useState } from 'react';
import SeatSelector from '../_components/seat-selector';
import { formatPrice } from '@/utils/concertFormatter';
import LoadingSpinner from '@/components/atoms/feedback/LoadingSpinner';

interface SeatSectionProps {
  onNext: (data: Pick<TicketBookRequest, 'seatRow' | 'seatCol'>) => void;
  price: number;
}

const isDisabled = ({
  seatRow,
  seatCol,
}: {
  seatRow: number;
  seatCol: number;
}) => {
  return seatRow === -1 || seatCol === -1;
};

const SeatSection = ({ onNext, price }: SeatSectionProps) => {
  const [seatInfo, setSeatInfo] = useState<
    Pick<TicketBookRequest, 'seatRow' | 'seatCol'>
  >({
    seatRow: -1,
    seatCol: -1,
  });

  return (
    <div className="flex flex-col w-full h-full pb-20">
      <div className="h-0 flex-grow overflow-auto">
        <Suspense fallback={<LoadingSpinner />}>
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
          <p className="text-sm">
            {isDisabled(seatInfo)
              ? '좌석을 선택해주세요'
              : `${seatInfo.seatRow}행 ${seatInfo.seatCol}열`}
          </p>
        </div>
        <p className="text-base space-x-1">
          <span className="font-semibold">가격</span>{' '}
          <span>{formatPrice(isDisabled(seatInfo) ? 0 : price)}</span>
        </p>
      </div>
      <div className="fixed w-full max-w-xl bottom-0 left-1/2 -translate-x-1/2 px-6 py-3 bg-white">
        <LargeButton
          label="다음 단계"
          onClick={() =>
            onNext({
              seatCol: seatInfo.seatCol,
              seatRow: seatInfo.seatRow,
            })
          }
          disabled={isDisabled(seatInfo)}
        />
      </div>
    </div>
  );
};

export default SeatSection;
