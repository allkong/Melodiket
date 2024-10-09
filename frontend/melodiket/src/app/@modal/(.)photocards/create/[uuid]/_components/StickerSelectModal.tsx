'use client';

import { useState } from 'react';

import usePhotocardStore from '@/store/photocardStore';
import { getDatetime } from '@/utils/dayjsPlugin';
import { Sticker } from '@/types/photocard';
import { STICKER_CATEGORIES } from '@/constants/photocard';

import Tabs from '@/components/organisms/controls/Tabs';
import SelectModal from '@/components/organisms/modal/SelectModal';
import { Bear, Cherries, GrowingHeart } from '@/public/stickers';
import { useRouter } from 'next/navigation';

export const stickers: Sticker[] = [
  { name: 'bear', category: 'animal', image: <Bear /> },
  { name: 'cherries', category: 'fruit', image: <Cherries /> },
  { name: 'growing-heart', category: 'heart', image: <GrowingHeart /> },
];

const StickerSelectModal = () => {
  const router = useRouter();
  const { setStickers } = usePhotocardStore();

  const [activeTab, setActiveTab] = useState(
    Object.keys(STICKER_CATEGORIES)[0]
  );

  const handleStickerSelect = (sticker: Sticker) => {
    setStickers([
      {
        ...sticker,
        id: getDatetime(),
        image: sticker.image,
        x: 150,
        y: 200,
        scale: 1,
        rotate: 0,
      },
    ]);

    router.back();
  };

  return (
    <SelectModal>
      <Tabs
        tabs={Object.keys(STICKER_CATEGORIES)}
        activeTab={activeTab}
        onClick={setActiveTab}
        labelMap={STICKER_CATEGORIES}
        color="secondary"
        line={false}
      />
      <div className="overflow-x-scroll space-x-4 px-4">
        {stickers.map((sticker) => (
          <button
            key={sticker.name}
            onClick={() => handleStickerSelect(sticker)}
            className="w-20 h-20"
          >
            {sticker.image}
          </button>
        ))}
      </div>
      <div className="flex py-4">
        <p className="font-medium text-xl">스티커</p>
      </div>
    </SelectModal>
  );
};

export default StickerSelectModal;
