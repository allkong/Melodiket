'use client';

import BackgroundFrame from '@/components/atoms/image-frame/BackgroundFrame';
import FavoriteProfile from '@/components/molecules/profile/FavoriteProfile';
import ControlsBar from '@/components/organisms/controls/ControlsBar';
import Header from '@/components/organisms/navigation/Header';
import { useMusicianDetail } from '@/services/musician/fetchMusician';
import { getS3Url } from '@/utils/getUrl';

interface PageProps {
  params: { uuid: string };
}

const Page = ({ params }: PageProps) => {
  const { data: musician } = useMusicianDetail(params.uuid);

  return (
    <div>
      <Header isFixed />
      <div className="relative mb-20">
        <BackgroundFrame src={getS3Url(musician?.imageUrl || '')} />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2">
          <FavoriteProfile src={getS3Url(musician?.imageUrl || '')} size="lg" />
          <div className="absolute bottom-0 right-0 transform translate-x-8">
            <p>{musician?.likeCount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mx-5">
        <h1 className="text-2xl font-semibold">{musician?.nickname}</h1>
        <div className="py-4 text-sm border-b w-full text-center">
          <p>{musician?.description}</p>
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
