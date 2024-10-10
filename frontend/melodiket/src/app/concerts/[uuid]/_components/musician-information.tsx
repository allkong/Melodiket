import { getS3Url } from '@/utils/getUrl';
import type { Concert } from '@/types/concert';

import MusicianStatusProfile from '@/components/molecules/profile/MusicianStatusProfile';
import { getS3Url } from '@/utils/getUrl';

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
              key={musician.musicianUuid}
              musicianName={musician.name}
              src={getS3Url(musician.imageUrl)}
            />
          ))}
      </div>
    </div>
  );
};

export default MusiciansInformation;
