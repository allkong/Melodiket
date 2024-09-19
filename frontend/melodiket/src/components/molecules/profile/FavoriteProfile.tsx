import Profile from '@/components/atoms/profile/Profile';

interface FavoriteProfile {
  src: string;
  size: 'md' | 'lg';
}

const FavoriteProfile = ({ src, size }: FavoriteProfile) => {
  return (
    <div>
      <Profile src={src} size={size} />
    </div>
  );
};

export default FavoriteProfile;
