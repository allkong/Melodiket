import { formatDateCustom } from '@/utils/dayjsPlugin';
import { formatDetailedSeatPosition } from '@/utils/concertFormatter';

import { Heart, LogoImage, LogoText } from '@/public/icons';

interface PhotocardBackProps {
  concertName: string;
  startAt: string;
  stageName: string;
  seatRow: number;
  seatCol: number;
}

const PhotocardBack = ({
  concertName,
  startAt,
  stageName,
  seatRow,
  seatCol,
}: PhotocardBackProps) => {
  return (
    <div className="w-[20.7rem] h-[31rem] relative rounded-lg overflow-hidden border border-gray-200 bg-white flex flex-col py-10 px-5 justify-between">
      <section className="py-6 border-t border-b border-black">
        <h1 className="text-xl font-semibold line-clamp-1">{concertName}</h1>
      </section>

      <div className="space-y-8">
        <section className="space-y-1">
          <p>{formatDateCustom(startAt, 'YYYY.MM.DD(ddd)')}</p>
          <p>{formatDateCustom(startAt, 'HH:MM')}</p>
        </section>

        <section className="space-y-1">
          <p>{stageName}</p>
          <p>{formatDetailedSeatPosition(seatRow, seatCol)}</p>
        </section>

        <section className="space-y-1">
          <p>카리나, 윈터, 닝닝, 지젤</p>
          <div className="flex space-x-1.5 items-center">
            <Heart
              className="w-[1.1rem] h-auto text-black"
              fill="currentColor"
            />
            <p>윈터</p>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center">
        <LogoImage className="mb-3 w-[1.4rem] h-[1.4rem]" />
        <LogoText className="w-[4.5rem] h-auto" />
      </div>
    </div>
  );
};

export default PhotocardBack;
