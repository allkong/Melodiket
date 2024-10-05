import PageTitle from '@/components/molecules/title/PageTitle';
import Header from '@/components/organisms/navigation/Header';

const Page = () => {
  return (
    <div>
      <Header />
      <PageTitle title="포토카드" total={4} />
    </div>
  );
};

export default Page;
