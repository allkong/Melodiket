import CloseButton from '@/components/atoms/button/CloseButton';
import Image from 'next/image';

interface KakaoShareButtonProps {
  nickname: string;
  concertName: string;
  imageUrl: string;
}

const KakaoShareButton = ({
  nickname,
  concertName,
  imageUrl,
}: KakaoShareButtonProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const handleKakaoShare = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${nickname}님의 포토카드`,
        description: `${nickname}님이 제작한 [${concertName}]의 포토카드를 보러 오세요!`,
        imageUrl: `${imageUrl}`,
        link: {
          mobileWebUrl: `${siteUrl}/photocards`,
          webUrl: `${siteUrl}/photocards`,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: `${siteUrl}/photocards`,
            webUrl: `${siteUrl}/photocards`,
          },
        },
      ],
    });
  };

  return (
    <div
      onClick={handleKakaoShare}
      className="flex items-center cursor-pointer bg-[#F9E000] px-5 rounded-lg flex-grow justify-center"
    >
      <div className="relative h-8 w-8 rounded-sm overflow-hidden w-fill">
        <Image
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="kakao share"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-lg font-medium text-[#3A1D1D] ms-3">
        카카오톡 공유하기
      </p>
    </div>
  );
};

export default KakaoShareButton;
