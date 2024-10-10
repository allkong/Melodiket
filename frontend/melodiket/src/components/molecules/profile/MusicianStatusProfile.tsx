import Profile from '@/components/atoms/profile/Profile';
import { STATUS_TYPES } from '@/constants/statusTypes';
import clsx from 'clsx';

interface MusicianStatusProfile {
  src: string;
  musicianName: string;
  status?: keyof typeof STATUS_TYPES;
}

const MusicianStatusProfile = ({
  src,
  musicianName,
  status,
}: MusicianStatusProfile) => {
  return (
    <div className="flex flex-col items-center w-fit">
      <Profile src={src} size="sm" />
      <p className="text-xs mt-2.5">{musicianName}</p>
      {status && (
        <p
          className={clsx(
            'py-0.5 px-2 rounded-full text-white text-2xs mt-0.5',
            {
              'bg-secondary': status === 'APPROVED',
              'bg-gray-300': status === 'PENDING',
              'bg-red-400': status === 'DENIED',
            }
          )}
        >
          {STATUS_TYPES[status]}
        </p>
      )}
    </div>
  );
};

export default MusicianStatusProfile;
