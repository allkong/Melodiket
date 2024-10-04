'use client';

import { useEffect, useRef, useCallback } from 'react';
import QrScanner from 'qr-scanner';
import { usePathname, useRouter } from 'next/navigation';

const QrOptions = {
  preferredCamera: 'environment', // 후면 카메라 사용
  maxScansPerSecond: 10, // 1초당 스캔 횟수
  highlightScanRegion: false, // 스캔 영역 표시 여부
};

const QRScan = () => {
  const router = useRouter();
  const pathname = usePathname();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleScan = useCallback(
    (result: QrScanner.ScanResult | null) => {
      if (result) {
        console.log(result.data);
        router.push(`${pathname}?ticket=${result.data}`);
      }
    },
    [router, pathname]
  );

  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      const qrScanner = new QrScanner(videoElem, handleScan, QrOptions);

      qrScanner.start();

      return () => {
        qrScanner.destroy();
      };
    }
  }, [handleScan]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* QR 코드 스캐너 */}
      <div className="relative w-64 h-64 overflow-hidden rounded-lg">
        {/* 테두리에 그라데이션을 주기 위한 가상 요소 */}
        <div className="absolute inset-0 p-1 rounded-lg bg-gradient-to-t from-primary to-secondary">
          <div className="w-full h-full bg-white rounded-lg">
            <video
              ref={videoRef}
              className="object-cover w-full h-full rounded-lg"
              autoPlay
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScan;
