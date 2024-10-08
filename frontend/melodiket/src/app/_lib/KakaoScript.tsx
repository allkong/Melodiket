'use client';

import Script from 'next/script';

declare global {
  interface Window {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}
function KakaoScript() {
  const handleLoad = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      async
      onLoad={handleLoad}
    />
  );
}

export default KakaoScript;
