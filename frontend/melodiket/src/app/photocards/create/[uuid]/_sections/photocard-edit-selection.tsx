import { useRef, useState } from 'react';
import Image from 'next/image';

import type { Sticker, Text } from '@/types/photocard';

import PhotocardFrame from '@/components/organisms/photocard/PhotocardFrame';
import { getDatetime } from '@/utils/dayjsPlugin';
import usePhotocardStore from '@/store/photocardStore';
import Tabs from '@/components/organisms/controls/Tabs';
import { PHOTOCARD_EDIT_TYPES } from '@/constants/photocard';
import MoveableSticker from '../_components/moveable-sticker';

interface PhotocardEditSelectionProps {
  src: string;
  onNext: () => void;
}

const PhotocardEditSelection = ({
  src,
  onNext,
}: PhotocardEditSelectionProps) => {
  const {} = usePhotocardStore();

  const [activeTab, setActiveTab] = useState(
    Object.keys(PHOTOCARD_EDIT_TYPES)[0]
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const photocardRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const sticker: Sticker = {
    id: getDatetime(),
    src: '/stickers/bear.svg',
    x: 150,
    y: 200,
    scale: 1,
    rotate: 0,
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div ref={photocardRef} className="relative">
        <PhotocardFrame>
          <Image
            src={src}
            alt="photocard"
            fill
            draggable={false}
            onContextMenu={handleContextMenu}
          />
        </PhotocardFrame>

        <MoveableSticker
          sticker={sticker}
          isSelected={selectedId === sticker.id}
          onSelect={() => setSelectedId(sticker.id)}
          containerRef={photocardRef}
        />
      </div>

      <div className="mt-4">
        <button
          onClick={() => {}}
          disabled={selectedId === null}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          삭제
        </button>
      </div>
      <Tabs
        tabs={Object.keys(PHOTOCARD_EDIT_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={PHOTOCARD_EDIT_TYPES}
        line={false}
      />
    </div>
  );
};

export default PhotocardEditSelection;
