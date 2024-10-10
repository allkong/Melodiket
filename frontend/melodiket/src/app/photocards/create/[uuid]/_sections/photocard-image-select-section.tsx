import usePosterStore from '@/store/posterStore';

import PhotocardFrame from '@/components/organisms/photocard/PhotocardFrame';
import MediumButton from '@/components/atoms/button/MediumButton';
import { ImageLine, Ticket } from '@/public/icons';

interface PhotocardImageSelectSection {
  onNext: (value: string) => void;
}

const PhotocardImageSelectSection = ({
  onNext,
}: PhotocardImageSelectSection) => {
  const { posterCid } = usePosterStore();

  const handlePosterSelect = () => {
    if (posterCid) {
      onNext(posterCid);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onNext(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <PhotocardFrame>
        <div className="flex items-center justify-center w-full h-full bg-gray-100">
          <p>사진에 들어갈 이미지를 선택해 주세요</p>
        </div>
      </PhotocardFrame>

      <div className="flex mt-10 space-x-3">
        <MediumButton
          label="공연 포스터"
          icon={<Ticket />}
          onClick={handlePosterSelect}
        />
        <div>
          <MediumButton
            label="이미지 선택"
            icon={<ImageLine />}
            onClick={() => document.getElementById('image-upload')?.click()} // input 요소 클릭
          />
          {/* 파일 업로드 input */}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotocardImageSelectSection;
