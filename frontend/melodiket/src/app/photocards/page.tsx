import Header from '@/components/organisms/navigation/Header';
import PageTitle from '@/components/molecules/title/PageTitle';
import PhotocardListSection from './_components/photocard-list-section';
import FixedButton from '@/components/organisms/controls/FixedButton';
import { Card } from '@/public/icons';

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Header />
        <PageTitle title="포토카드" total={2} />
      </div>
      <div className="overflow-y-scroll">
        <PhotocardListSection />
      </div>
      <FixedButton
        href="/photocards/create"
        label="포토카드 생성"
        icon={<Card width={26} height={26} />}
      />
    </div>
  );
};

export default Page;
