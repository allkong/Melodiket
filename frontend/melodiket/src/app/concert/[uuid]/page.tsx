import LargeButton from '@/components/atoms/button/LargeButton';
import DarkedImage from '@/components/atoms/image/DarkedImage';
import Header from '@/components/organisms/navigation/Header';

const Page = () => {
  return (
    <div className="flex flex-col w-full min-h-screen h-fit bg-white">
      <Header isFixed />
      <div className="relative w-full h-96">
        <DarkedImage />
        <div className="absolute flex items-center justify-center w-full h-96 left-0 top-0 px-6 pt-20 pb-12 text-white">
          <div className="w-full h-full bg-pink-300"></div>
        </div>
      </div>
      <div className="relative w-full flex-grow h-fit py-7 px-7">
        <div className="absolute w-full h-10 -top-5 left-0 right-0 bg-white rounded-2xl"></div>
        <div className="h-96"></div>
        <div className="h-96"></div>
        <div className="h-96"></div>
      </div>
      <div className="fixed w-full max-w-xl mx-auto bottom-0 px-6 py-3 bg-white">
        <LargeButton label="예매하기" />
      </div>
    </div>
  );
};

export default Page;
