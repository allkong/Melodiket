'use client';

import { usePhotocardList } from '@/services/photocard/fetchPhotocard';

import PageTitle from '@/components/molecules/title/PageTitle';
import useAuthStore from '@/store/authStore';

const PhotocardTitle = () => {
  const { data: photocards } = usePhotocardList();
  const { user } = useAuthStore();

  const currentPhotocards = photocards?.filter(
    (concert) => concert.nickName === user?.nickname
  );

  return <PageTitle title="포토카드" total={currentPhotocards?.length ?? 0} />;
};

export default PhotocardTitle;
