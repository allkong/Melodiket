import FavoriteTitle from '@/components/molecules/title/FavoriteTitle';
import Header from '@/components/organisms/navigation/Header';

const Page = () => {
  return (
    <div>
      <Header />
      <FavoriteTitle type="musician" total={3} />
    </div>
  );
};

export default Page;
