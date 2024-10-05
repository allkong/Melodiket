import { Suspense } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';

import { usePhotocardListDehydrateState } from '@/services/photocard/usePhotocardList';

import Header from '@/components/organisms/navigation/Header';
import PageTitle from '@/components/molecules/title/PageTitle';
import PhotocardListSection from './_components/photocard-list-section';
import PhotocardListSkeleton from './_components/photocard-list-skeleton';

const Page = () => {
  return (
    <div>
      <Header />
      <PageTitle title="포토카드" total={2} />
      <div>
        <HydrationBoundary state={usePhotocardListDehydrateState()}>
          <Suspense fallback={<PhotocardListSkeleton count={2} />}>
            <PhotocardListSection />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default Page;
