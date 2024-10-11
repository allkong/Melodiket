import { formatDateCustom } from '@/utils/dayjsPlugin';
import { formatDetailedSeatPosition } from '@/utils/concertFormatter';

import { Heart, LogoImage, LogoText } from '@/public/icons';
import RotateButton from '@/components/atoms/button/RotateButton';
import PhotocardFrame from './PhotocardFrame';

interface PhotocardBackProps {
  concertName: string;
  startAt: string;
  stageName: string;
  seatRow: number;
  seatCol: number;
  musicians: string[];
  favoriteMusician: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const PhotocardBack = ({
  concertName,
  startAt,
  stageName,
  seatRow,
  seatCol,
  musicians,
  favoriteMusician,
  onClick,
}: PhotocardBackProps) => {
  console.log(musicians);
  return (
    <PhotocardFrame isCreated back>
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
          <p>{musicians?.join(', ')}</p>
          <div className="flex space-x-1.5 items-center">
            <Heart
              className="w-[1.1rem] h-auto text-black"
              fill="currentColor"
            />
            <p>{favoriteMusician}</p>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center">
        <LogoImage className="mb-3 w-[1.4rem] h-[1.4rem]" />
        <LogoText className="w-[4.5rem] h-auto" />
      </div>

      <div className="absolute bottom-0 right-0 px-3 py-3">
        <RotateButton onClick={onClick} />
      </div>
    </PhotocardFrame>
  );
};

export default PhotocardBack;
