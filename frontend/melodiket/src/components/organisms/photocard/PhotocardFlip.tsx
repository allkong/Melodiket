import PhotocardFront from './PhotocardFront';
import PhotocardBack from './PhotocardBack';

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
  return (
    <div>
      <PhotocardFront src={src} />

      <PhotocardBack
        concertName={concertName}
        startAt={startAt}
        stageName={stageName}
        seatRow={seatRow}
        seatCol={seatCol}
      />
    </div>
  );
};

export default PhotocardFlip;
