'use client';

import { useParams } from 'next/navigation';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import type { TicketBook } from '@/types/ticket';
import SeatRadio from '@/components/atoms/radio/SeatRadio';

interface SeatSelectorProps {
  seatInfo: Pick<TicketBook, 'seatRow' | 'seatCol' | 'tokenAmount'>;
  onChange: (
    seatInfo: Pick<TicketBook, 'seatRow' | 'seatCol' | 'tokenAmount'>
  ) => void;
}

const SeatSelector = ({ seatInfo, onChange }: SeatSelectorProps) => {
  const params = useParams<{ uuid: string }>();
  const { data } = useFetchConcertDetail(params.uuid);

  const handleChange = (row: number, col: number) => {
    onChange({
      ...seatInfo,
      seatRow: row,
      seatCol: col,
      tokenAmount: data?.price ?? -1,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="mb-2 text-2xl font-medium text-gray-400">STAGE</p>
      <div className="flex flex-col gap-1">
        {data &&
          data?.isAvailableSeat.map((line, row) => (
            <div key={row} className="flex flex-row gap-1">
              {line?.map((available, col) => (
                <SeatRadio
                  key={`${row}-${col}`}
                  name="seat"
                  onChange={handleChange}
                  checked={seatInfo.seatRow === row && seatInfo.seatCol === col}
                  row={row}
                  col={col}
                  disabled={!available}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeatSelector;
