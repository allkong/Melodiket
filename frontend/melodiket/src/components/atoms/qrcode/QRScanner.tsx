import { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

const QrOptions = {
  // 후면 카메라인지 셀프 카메라인지
  preferredCamera: 'environment',
  // 1초당 몇번의 스캔을 할 건지
  maxScansPerSecond: 10,
  // QR 스캔이 일어나는 부분 표시 여부 (노란색 네모 테두리)
  highlightScanRegion: false,
};

const QRScan = () => {
  const videoRef = useRef(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    console.log(result.data);
  };

  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      const qrScanner = new QrScanner(
        videoElem,
        (result) => handleScan(result),
        QrOptions
      );
      qrScanner.start();

      return () => qrScanner.destroy();
    }
  }, []);

  return (
    <>
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
    </>
  );
};

export default QRScan;
