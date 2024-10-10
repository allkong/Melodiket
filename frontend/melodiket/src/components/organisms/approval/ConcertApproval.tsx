import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ApprovalButton from '@/components/atoms/button/ApprovalButton';
import ArrowButton from '@/components/atoms/button/ArrowButton';
import clsx from 'clsx';
import SmallButton from '@/components/atoms/button/SmallButton';
import { useUploadImage } from '@/services/user/fetchUser';

interface ConcertApprovalProps {
  concertName: string;
  date: string;
  price: string;
  onApprove?: (signatureUrl: string) => void;
  onReject?: () => void;
  isChecked: boolean;
}

const ConcertApproval = ({
  concertName,
  date,
  price,
  onApprove,
  onReject,
  isChecked,
}: ConcertApprovalProps) => {
  const [isSigning, setIsSigning] = useState(false);
  const signatureCanvasRef = useRef<SignatureCanvas | null>(null);
  const { mutate: uploadImage } = useUploadImage();

  const handleOpenSignature = () => {
    setIsSigning(true);
  };

  const handleClearSignature = () => {
    signatureCanvasRef.current?.clear();
  };

  const handleConfirmSignature = () => {
    if (signatureCanvasRef.current && !signatureCanvasRef.current.isEmpty()) {
      const fileName = `signature-${Date.now()}.png`;
      const signatureDataUrl = signatureCanvasRef.current.toDataURL();

      const uploadImageRequest = {
        type: 'MUSICIAN',
        fileName: fileName,
      };

      uploadImage(uploadImageRequest, {
        onSuccess: async (response) => {
          const presignedUrl = response.presigned;
          const imageUrl = response.cdn;

          try {
            const imageBlob = await (await fetch(signatureDataUrl)).blob();

            const uploadResponse = await fetch(presignedUrl, {
              method: 'PUT',
              body: imageBlob,
              headers: {
                'Content-Type': 'image/png',
              },
            });

            if (uploadResponse.ok) {
              onApprove?.(imageUrl);
              setIsSigning(false);
            } else {
              alert('S3 업로드에 실패했습니다.');
            }
          } catch (error) {
            alert('S3 업로드 중 오류가 발생했습니다.');
          }
        },
        onError: () => {
          alert('이미지 업로드 요청 실패!');
        },
      });
    } else {
      alert('서명을 완료해주세요.');
    }
  };

  return (
    <div
      className={clsx('w-full p-4 bg-white border rounded-lg flex flex-col')}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-lg">{concertName}</p>
        <ArrowButton direction="right" color="text-gray-400" />
      </div>
      <div className="flex items-center justify-between text-gray-500">
        <div>
          <p>{date}</p>
          <p>{price}</p>
        </div>
        {!isChecked && (
          <div className="flex space-x-2">
            <ApprovalButton label="승인" onClick={handleOpenSignature} />
            <ApprovalButton label="거절" onClick={onReject} />
          </div>
        )}
      </div>

      {isSigning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="mb-2 font-semibold">서명</p>
            <SignatureCanvas
              ref={signatureCanvasRef}
              canvasProps={{ className: 'w-full h-40 border' }}
            />
            <div className="flex justify-between mt-2">
              <SmallButton label="지우기" onClick={handleClearSignature} />
              <SmallButton label="확인" onClick={handleConfirmSignature} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConcertApproval;
