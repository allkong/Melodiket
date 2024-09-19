import Header from '@/components/organisms/navigation/Header';
import ControlsBar from '@/components/organisms/controls/ControlsBar';
import MusicianItem from '@/components/molecules/item/MusicianItem';

const Page = () => {
  return (
    <div>
      <Header isFixed />
      <div className="h-40 bg-gray-200"></div>
      <ControlsBar />
      <div>
        <MusicianItem
          src={''}
          musicianName={'장원영'}
          favoriteCount={10}
          bookingCount={2}
          isFavorite
        />
      </div>
    </div>
  );
};

export default Page;
