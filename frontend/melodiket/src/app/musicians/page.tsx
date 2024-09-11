import Header from '@/components/organisms/navigation/Header';
import ControlsBar from '@/components/organisms/controls/ControlsBar';

const Page = () => {
  return (
    <div>
      <Header />
      <div className="h-40 bg-gray-200"></div>
      <ControlsBar />
    </div>
  );
};

export default Page;
