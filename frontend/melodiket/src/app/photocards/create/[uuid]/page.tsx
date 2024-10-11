'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import useFunnel from '@/hooks/useFunnel';
import { usePhotocardUpload } from '@/services/photocard/fetchPhotocard';

import SubHeader from '@/components/organisms/navigation/SubHeader';
import PhotocardImageSelectSection from './_sections/photocard-image-select-section';
import toast from 'react-hot-toast';
import useSpinner from '@/hooks/useSpinner';
const PhotocardEditSelection = dynamic(
  () => import('./_sections/photocard-edit-selection'),
  {
    ssr: false,
  }
);

interface PageProps {
  params: { uuid: string };
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();
  const { mutateAsync: photocardUpload, isPending } = usePhotocardUpload();
  // useSpinner(isPending);

  const { Funnel, setStep } = useFunnel<'select' | 'edit'>({
    addToHistory: true,
    initialStep: 'select',
    preventForwardNavigate: true,
  });
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

  const handlePhotocardUpload = (cid: string) => {
    photocardUpload({ uuid: params.uuid, cid: cid });
    toast.success('제작 완료되면 알림이 가요');
    router.push('/photocards');
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
          <PhotocardEditSelection
            uuid={params.uuid}
            src={imageUrl}
            onNext={handlePhotocardUpload}
          />
        </Funnel.Step>
      </Funnel>
    </div>
  );
};

export default Page;
