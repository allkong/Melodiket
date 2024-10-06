import PhotocardFront from './PhotocardFront';
import PhotocardBack from './PhotocardBack';
import { useState } from 'react';

interface PhotocardFlipProps {
  src: string;
  concertName: string;
  startAt: string;
  stageName: string;
  seatRow: number;
  seatCol: number;
}

const PhotocardFlip = ({
  src,
  concertName,
  startAt,
  stageName,
  seatRow,
  seatCol,
}: PhotocardFlipProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <div className="relative">
      <div
        className="absolute inline-block transition-transform duration-700"
        style={{
          transform: `perspective(1000px) ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}`,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        <PhotocardFront src={src} />
      </div>

      <div
        className="absolute inline-block transition-transform duration-700"
        style={{
          transform: `perspective(1000px) ${isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)'}`,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        <PhotocardBack
          concertName={concertName}
          startAt={startAt}
          stageName={stageName}
          seatRow={seatRow}
          seatCol={seatCol}
        />
      </div>

      <button
        className="absolute px-4 py-2 mt-4 bg-gray-200 rounded"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        회전
      </button>
    </div>
  );
};

export default PhotocardFlip;
