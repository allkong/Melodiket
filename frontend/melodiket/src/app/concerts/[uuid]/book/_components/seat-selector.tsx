'use client';

import { useParams } from 'next/navigation';

import { useFetchRemainSeat } from '@/services/concert/fetchConcert';
import type { TicketBookRequest } from '@/types/ticket';
import SeatRadio from '@/components/atoms/radio/SeatRadio';

interface SeatSelectorProps {
  seatInfo: Pick<TicketBookRequest, 'seatRow' | 'seatCol'>;
  onChange: (seatInfo: Pick<TicketBookRequest, 'seatRow' | 'seatCol'>) => void;
}

const SeatSelector = ({ seatInfo, onChange }: SeatSelectorProps) => {
  const params = useParams<{ uuid: string }>();
  const { data: remainSeat } = useFetchRemainSeat(params.uuid);

  const handleChange = (row: number, col: number) => {
    onChange({
      ...seatInfo,
      seatRow: row,
      seatCol: col,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="mb-2 text-2xl font-medium text-gray-400">STAGE</p>
      <div className="flex flex-col gap-1">
        {remainSeat &&
          remainSeat.map((line, row) => (
            <div key={row} className="flex flex-row gap-1">
              {line?.map((occupied, col) => (
                <SeatRadio
                  key={`${row}-${col}`}
                  name="seat"
                  onChange={handleChange}
                  checked={seatInfo.seatRow === row && seatInfo.seatCol === col}
                  row={row}
                  col={col}
                  disabled={occupied}
                  hidden={row === 0 || col === 0}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeatSelector;
