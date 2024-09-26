import LargeButton from '@/components/atoms/button/LargeButton';
import DarkedImage from '@/components/atoms/image/DarkedImage';
import Header from '@/components/organisms/navigation/Header';

const Page = () => {
  return (
    <div className="w-full min-h-screen h-0 bg-pink-300">
      <Header isFixed />
      <div className="w-full h-96">
        <DarkedImage />
        <div className="text-white">sadasd</div>
      </div>
      <div className="w-full "></div>
      <div className="fixed bottom-0 left-0 right-0 px-6 py-3 bg-white">
        <LargeButton label="예매하기" />
      </div>
    </div>
  );
};

export default Page;
