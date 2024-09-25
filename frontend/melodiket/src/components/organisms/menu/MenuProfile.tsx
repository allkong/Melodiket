import Profile from '@/components/atoms/profile/Profile';
import ArrowButton from '@/components/atoms/button/ArrowButton';
import OptionButton from '@/components/atoms/button/OptionButton';

interface MenuProfileProps {
  nickname: string;
  imageURL: string;
  role: string;
}

const MenuProfile = ({ nickname, imageURL, role }: MenuProfileProps) => {
  return (
    <div className="flex items-center gap-4 w-full h-[104px] px-5 py-4">
      <Profile size="sm" src={imageURL} />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <p>{nickname}</p>
          <ArrowButton />
        </div>
        <OptionButton label={role} isSelected={true} onClick={() => {}} />
      </div>
    </div>
  );
};

export default MenuProfile;
