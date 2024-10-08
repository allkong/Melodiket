'use client';

import QRScanner from '@/components/atoms/qrcode/QRScanner';
import SubHeader from '@/components/organisms/navigation/SubHeader';

const Page = () => {
  return (
    <div className="flex flex-col h-screen bg-purple-50">
      {/* 상단 헤더 */}
      <SubHeader title="입장 처리" />

      {/* QR 스캐너 */}
      <div className="flex flex-col items-center justify-center w-full h-full mb-[8vh]">
        <QRScanner />
        <div className="mt-6 space-y-2 text-center text-gray-600">
          <p>모바일 티켓</p>
          <p className="text-xl font-semibold">QR코드를 스캔하세요</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
