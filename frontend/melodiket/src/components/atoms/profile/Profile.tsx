import clsx from 'clsx';
import Image from 'next/image';

interface ProfileProps {
  src: string;
  size: 'sm' | 'md' | 'lg';
}

const Profile = ({ src, size }: ProfileProps) => {
  return (
    <div
      className={clsx(
        'rounded-full bg-gradient-to-b from-secondary to-primary',
        {
          'p-0.5 w-14 h-14': size === 'sm',
          'p-[0.2rem] w-20 h-20': size === 'md',
          'p-1 w-28 h-28': size === 'lg',
        }
      )}
    >
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden rounded-full">
        <Image src={src} alt="profile" className="object-cover" fill />
      </div>
    </div>
  );
};

export default Profile;
