import BackgroundImage from '@/components/atoms/background/BackgroundImage';
import FavoriteProfile from '@/components/molecules/profile/FavoriteProfile';
import Header from '@/components/organisms/navigation/Header';

const Page = () => {
  return (
    <div>
      <Header isFixed />
      <div className="relative">
        <BackgroundImage src="" />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2">
          <FavoriteProfile src="" size="lg" />
        </div>
      </div>
    </div>
  );
};

export default Page;
