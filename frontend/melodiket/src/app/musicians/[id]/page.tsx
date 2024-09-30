import BackgroundFrame from '@/components/atoms/image-frame/BackgroundFrame';
import FavoriteProfile from '@/components/molecules/profile/FavoriteProfile';
import ControlsBar from '@/components/organisms/controls/ControlsBar';
import Header from '@/components/organisms/navigation/Header';

const Page = () => {
  return (
    <div>
      <Header isFixed />
      <div className="relative mb-20">
        <BackgroundFrame src="" />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2">
          <FavoriteProfile src="" size="lg" />
          <div className="absolute bottom-0 right-0 transform translate-x-8">
            <p>516</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mx-5">
        <h1 className="text-2xl font-semibold">짱원영</h1>
        <div className="py-4 text-sm border-b">
          안녕하세요! 아이브의 원영이입니다! 아이브 예쁘당 하츄핑 티니티니티니핑
          원영이 하츄핑 닮음
        </div>
      </div>
      <div className="w-full my-4">
        <h2 className="mx-5 text-lg font-medium">뮤지션의 공연</h2>
        <ControlsBar />
        <div className="mx-5 bg-purple-100 h-96">공연 목록</div>
      </div>
    </div>
  );
};

export default Page;
