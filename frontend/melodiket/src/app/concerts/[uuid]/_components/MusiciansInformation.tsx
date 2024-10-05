import type { Concert } from '@/types/concert';
import MusicianStatusProfile from '@/components/molecules/profile/MusicianStatusProfile';

interface MusiciansInformationProps
  extends Partial<Pick<Concert, 'musicians'>> {}

const MusiciansInformation = ({ musicians }: MusiciansInformationProps) => {
  return (
    <div className="w-full h-fit space-y-2">
      <p className="text-sm font-medium">뮤지션 정보</p>
      <div className="flex gap-2 w-full flex-wrap">
        {musicians &&
          musicians.map((musician) => (
            <MusicianStatusProfile
              key={musician.musicianId}
              musicianName={musician.musicianName}
              src={musician.imageURL}
            />
          ))}
      </div>
    </div>
  );
};

export default MusiciansInformation;
