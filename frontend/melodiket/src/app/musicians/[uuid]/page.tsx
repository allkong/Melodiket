import { Suspense } from 'react';

import Header from '@/components/organisms/navigation/Header';
import MusicianProfileSection from './_section/musician-profile-section';
import ControlsBar from '@/components/organisms/controls/ControlsBar';
import ControlsBarSkeleton from '@/components/organisms/controls/ControlsBarSkeleton';
import MusicianConcertSection from './_section/musician-concert-section';

interface PageProps {
  params: { uuid: string };
}

const Page = ({ params }: PageProps) => {
  return (
    <div>
      <Header isFixed />
      <MusicianProfileSection musicianUuid={params.uuid} />
      <div className="w-full my-4">
        <h2 className="mx-5 text-lg font-medium">뮤지션의 공연</h2>
        <Suspense fallback={<ControlsBarSkeleton />}>
          <ControlsBar />
        </Suspense>
        <MusicianConcertSection uuid={params.uuid} />
      </div>
    </div>
  );
};

export default Page;
