import Image from 'next/image';

interface ProfileProps {
  src: string;
}

const Profile = ({ src }: ProfileProps) => {
  return (
    // 크기는 나중에 다시 수정해야 함
    <div className="p-0.5 rounded-full bg-gradient-to-b from-secondary to-primary w-[58px] h-[58px]">
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden rounded-full">
        <Image src={src} alt="profile" className="object-cover" fill />
      </div>
    </div>
  );
};

export default Profile;
