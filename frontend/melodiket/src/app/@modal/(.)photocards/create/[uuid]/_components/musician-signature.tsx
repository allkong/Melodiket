import Image from 'next/image';

import usePosterStore from '@/store/posterStore';
import { getS3Url } from '@/utils/getUrl';

const MusicianSignature = () => {
  const { signatureImage } = usePosterStore();

  return (
    <>
      <Image
        src={getS3Url(signatureImage || '')}
        alt="signature"
        width={80}
        height={80}
      />
    </>
  );
};

export default MusicianSignature;
