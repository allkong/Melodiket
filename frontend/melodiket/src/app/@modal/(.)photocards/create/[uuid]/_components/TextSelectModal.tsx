'use client';

import { useState } from 'react';
import { getDatetime } from '@/utils/dayjsPlugin';
import usePhotocardStore from '@/store/photocardStore';
import SelectModal from '@/components/organisms/modal/SelectModal';
import { useRouter } from 'next/navigation';

const TextSelectModal = () => {
  const router = useRouter();
  const { addText } = usePhotocardStore();

  const [inputText, setInputText] = useState('');

  const handleTextSubmit = () => {
    if (!inputText) return;

    addText({
      id: getDatetime(),
      label: inputText,
      color: '#000000',
      x: 150,
      y: 200,
      scale: 1,
      rotate: 0,
    });

    router.back();
  };

  return (
    <SelectModal>
      <div className="p-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="텍스트를 입력하세요"
          className="w-full p-2 border border-gray-300 rounded"
        />
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
