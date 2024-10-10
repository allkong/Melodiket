'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';

import usePhotocardStore from '@/store/photocardStore';
import { preventContextMenu } from '@/utils/eventUtil';
import { PHOTOCARD_EDIT_TYPES } from '@/constants/photocard';

import PhotocardFrame from '@/components/organisms/photocard/PhotocardFrame';
import Tabs from '@/components/organisms/controls/Tabs';
import MoveableSticker from '../_components/moveable-sticker';

interface PhotocardEditSelectionProps {
  uuid: string;
  src: string;
  onNext: (cid: string) => void;
}

const PhotocardEditSelection = ({
  uuid,
  src,
  onNext,
}: PhotocardEditSelectionProps) => {
  const router = useRouter();
  const { stickers, setStickers, clearStickers } = usePhotocardStore();

  const [activeTab, setActiveTab] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const photocardRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    router.push(`/photocards/create/${uuid}?step=edit&select=${tabValue}`);
  };

  const handleDeselect = (e: React.MouseEvent) => {
    if (e.target === photocardRef.current) {
      setSelectedId(null);
    }
  };

  const handleSelectedRemove = () => {
    if (stickers && selectedId !== null) {
      setStickers(stickers.filter((sticker) => sticker.id !== selectedId));
      setSelectedId(null);
    }
  };

  useEffect(() => {
    return () => {
      clearStickers();
    };
  }, [clearStickers]);

  const handlePhotocardCapture = async () => {
    if (photocardRef.current) {
      const canvas = await html2canvas(photocardRef.current);
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'photocard.png', { type: 'image/png' });

          const formData = new FormData();
          formData.append('file', file);

          try {
            const ipfsUrl = process.env.NEXT_PUBLIC_IPFS_URL ?? '';
            const response = await fetch(ipfsUrl, {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              toast.error('포토카드 업로드 실패');
            }

            const result = await response.json();
            onNext(result.cid);
          } catch (error) {
            throw error;
          }
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex mb-3 text-sm justify-between w-[20.7rem]">
          <button
            onClick={handleSelectedRemove}
            disabled={selectedId === null}
            className="bg-gray-300 text-white px-4 py-2 rounded-full"
          >
            삭제
          </button>
          <button
            onClick={handlePhotocardCapture}
            className="bg-primary text-white px-4 py-2 rounded-full"
          >
            완료
          </button>
        </div>
        <div
          ref={photocardRef}
          className="relative overflow-hidden rounded-lg"
          onClick={handleDeselect}
        >
          <PhotocardFrame>
            <Image
              src={src}
              alt="photocard"
              fill
              draggable={false}
              onContextMenu={preventContextMenu}
              className="select-none"
            />
          </PhotocardFrame>

          {stickers?.map((sticker) => (
            <MoveableSticker
              key={sticker.id}
              sticker={sticker}
              isSelected={selectedId === sticker.id}
              onSelect={() => setSelectedId(sticker.id)}
              containerRef={photocardRef}
            />
          ))}
        </div>
      </div>
      <div className="w-full py-2 bg-white">
        <Tabs
          tabs={Object.keys(PHOTOCARD_EDIT_TYPES)}
          activeTab={activeTab}
          onClick={handleTabClick}
          labelMap={PHOTOCARD_EDIT_TYPES}
          line={false}
        />
      </div>
    </>
  );
};

export default PhotocardEditSelection;
