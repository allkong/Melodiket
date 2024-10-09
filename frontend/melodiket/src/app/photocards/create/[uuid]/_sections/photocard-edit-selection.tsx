'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Image from 'next/image';

import { preventContextMenu } from '@/utils/eventUtil';
import { PHOTOCARD_EDIT_TYPES } from '@/constants/photocard';

import PhotocardFrame from '@/components/organisms/photocard/PhotocardFrame';
import usePhotocardStore from '@/store/photocardStore';
import Tabs from '@/components/organisms/controls/Tabs';
import MoveableSticker from '../_components/moveable-sticker';

interface PhotocardEditSelectionProps {
  uuid: string;
  src: string;
  onNext: () => void;
}

const PhotocardEditSelection = ({
  uuid,
  src,
  onNext,
}: PhotocardEditSelectionProps) => {
  const router = useRouter();
  const { stickers } = usePhotocardStore();

  const [activeTab, setActiveTab] = useState(
    Object.keys(PHOTOCARD_EDIT_TYPES)[0]
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const photocardRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    router.push(`/photocards/create/${uuid}?step=edit&select=${tabValue}`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div ref={photocardRef} className="relative">
          <PhotocardFrame>
            <Image
              src={src}
              alt="photocard"
              fill
              draggable={false}
              onContextMenu={preventContextMenu}
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
        {/* <button
          onClick={() => {}}
          disabled={selectedId === null}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          삭제
        </button> */}
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
