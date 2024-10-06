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
    if (window.Kakao) {
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
    }
  };

  return <button onClick={handleKakaoShare}>공유</button>;
};

export default KakaoShareButton;
