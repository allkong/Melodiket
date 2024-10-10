'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { getDatetime } from '@/utils/dayjsPlugin';
import usePhotocardStore from '@/store/photocardStore';

import SelectModal from '@/components/organisms/modal/SelectModal';

const TextSelectModal = () => {
  const router = useRouter();
  const { addText } = usePhotocardStore();

  const [inputText, setInputText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleTextSubmit = () => {
    if (!inputText) return;

    addText({
      id: getDatetime(),
      label: inputText,
      color: selectedColor,
      x: 150,
      y: 200,
      scale: 1,
      rotate: 0,
    });
    console.log(selectedColor);

    router.back();
  };

  return (
    <SelectModal>
      <div className="p-4">
        <div className="flex space-x-4">
          <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="텍스트를 입력하세요"
            className="overflow-hidden resize-none px-5 py-3 borde w-full p-2 outline-none border border-gray-300 rounded-md"
            rows={2}
          />
        </div>

        <button
          onClick={handleTextSubmit}
          className="mt-4 w-full bg-primary text-white py-2 rounded"
        >
          확인
        </button>
      </div>
    </SelectModal>
  );
};

export default TextSelectModal;
