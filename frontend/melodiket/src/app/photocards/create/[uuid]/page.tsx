'use client';

import { useRouter } from 'next/navigation';

import useFunnel from '@/hooks/useFunnel';

import SubHeader from '@/components/organisms/navigation/SubHeader';
import PhotocardImageSelectSection from './_components/photocard-image-select-section';
import PhotocardDecorateSelection from './_components/photocard-decorate-selection';
import { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const { Funnel, setStep } = useFunnel<'select' | 'edit'>(
    true,
    true,
    'select'
  );
  const [imageUrl, setImageUrl] = useState<string>('');

  const handlePrev = () => {
    router.back();
  };

  const handleClose = () => {
    router.push('/photocards');
  };

  const handleImageSelect = (value: string) => {
    setImageUrl(value);
    setStep('edit');
  };

  return (
    <div className="flex flex-col h-screen">
      <SubHeader
        title="포토카드 제작"
        onPrev={handlePrev}
        canGoPrev
        onClose={handleClose}
      />
      <Funnel>
        <Funnel.Step step="select">
          <PhotocardImageSelectSection onNext={handleImageSelect} />
        </Funnel.Step>
        <Funnel.Step step="edit">
          <PhotocardDecorateSelection
            src={imageUrl}
            onNext={() => {
              router.push('/');
            }}
          />
        </Funnel.Step>
      </Funnel>
    </div>
  );
};

export default Page;
