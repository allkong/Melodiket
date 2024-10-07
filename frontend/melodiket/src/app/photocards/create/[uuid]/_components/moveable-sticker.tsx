import { useRef } from 'react';
import Image from 'next/image';
import Moveable from 'react-moveable';

import { preventContextMenu } from '@/utils/eventUtil';
import { Sticker } from '@/types/photocard';

interface MoveableStickerProps {
  sticker: Sticker;
  isSelected: boolean;
  onSelect: () => void;
  containerRef: React.RefObject<HTMLElement>;
}

const MoveableSticker = ({
  sticker,
  isSelected,
  onSelect,
  containerRef,
}: MoveableStickerProps) => {
  const stickerRef = useRef<HTMLDivElement | null>(null);
  console.log(sticker.x, sticker.y);
  return (
    <>
      <div
        ref={stickerRef}
        onClick={onSelect}
        className="absolute"
        style={{ left: `${sticker.x}px`, top: `${sticker.y}px` }}
      >
        <Image
          src={sticker.src}
          alt="sticker"
          width={80}
          height={80}
          draggable={false}
          onContextMenu={preventContextMenu}
        />
      </div>

      {isSelected && (
        <Moveable
          target={stickerRef.current}
          container={containerRef.current}
          draggable={true}
          onDrag={({ target, transform }) => {
            target!.style.transform = transform;
          }}
          keepRatio={true}
          scalable={true}
          onScale={({ target, transform }) => {
            target!.style.transform = transform;
          }}
          rotatable={true}
          onRotate={({ target, transform }) => {
            target!.style.transform = transform;
          }}
          pinchable={true}
          pinchOutside={true}
        />
      )}
    </>
  );
};

export default MoveableSticker;
