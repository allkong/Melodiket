import PhotocardFront from './PhotocardFront';
import PhotocardBack from './PhotocardBack';
import { useState } from 'react';
import RotateButton from '@/components/atoms/button/RotateButton';

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
    <div className="relative w-[20.7rem] h-[31rem]">
      {/* 포토카드 크기 설정 */}
      <div
        className="absolute inset-0 transition-transform duration-700"
        style={{
          transform: `perspective(1000px) ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}`,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        <PhotocardFront src={src} />
      </div>
      <div
        className="absolute inset-0 transition-transform duration-700"
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
      {/* 버튼을 오른쪽 아래에 고정 */}
      <div className="absolute right-0 -bottom-5">
        <RotateButton onClick={() => setIsFlipped(!isFlipped)} />
      </div>
    </div>
  );
};

export default PhotocardFlip;
