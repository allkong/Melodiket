'use client';

import { usePhotocardList } from '@/services/photocard/fetchPhotocard';

import PageTitle from '@/components/molecules/title/PageTitle';

const PhotocardTitle = () => {
  const { data: photocards } = usePhotocardList();
  return <PageTitle title="포토카드" total={photocards?.length ?? 0} />;
};

export default PhotocardTitle;
