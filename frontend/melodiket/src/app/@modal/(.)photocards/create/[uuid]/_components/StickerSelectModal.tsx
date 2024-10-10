'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import usePhotocardStore from '@/store/photocardStore';
import { getDatetime } from '@/utils/dayjsPlugin';
import { Sticker } from '@/types/photocard';
import { STICKER_CATEGORIES } from '@/constants/photocard';

import ScrollTabs from '@/components/organisms/controls/ScrollTabs';
import SelectModal from '@/components/organisms/modal/SelectModal';
import MusicianSignature from './musician-signature';
import { stickers } from './Stickers';

const StickerSelectModal = () => {
  const router = useRouter();
  const { addSticker } = usePhotocardStore();

  const [activeTab, setActiveTab] = useState(
    Object.keys(STICKER_CATEGORIES)[0]
  );

  const filteredStickers = stickers.filter(
    (sticker) => sticker.category === activeTab
  );

  const handleStickerSelect = (sticker: Sticker) => {
    addSticker({
      ...sticker,
      id: getDatetime(),
      image: sticker.image,
      x: 150,
      y: 200,
      scale: 1,
      rotate: 0,
    });

    router.back();
  };

  return (
    <SelectModal>
      <ScrollTabs
        tabs={Object.keys(STICKER_CATEGORIES)}
        activeTab={activeTab}
        onClick={setActiveTab}
        labelMap={STICKER_CATEGORIES}
        line={false}
      />
      <div className="overflow-x-auto whitespace-nowrap space-x-4 px-4 h-20 w-full">
        {filteredStickers.map((sticker) => (
          <button
            key={sticker.name}
            onClick={() => handleStickerSelect(sticker)}
            className="w-20 h-20"
          >
            {sticker.image}
          </button>
        ))}
      </div>
      <div className="flex py-4 justify-center">
        <p className="font-medium text-lg text-gray-600">스티커</p>
      </div>
    </SelectModal>
  );
};

export default StickerSelectModal;
