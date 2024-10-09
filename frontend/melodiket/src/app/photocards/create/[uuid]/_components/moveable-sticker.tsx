import { cloneElement, isValidElement, useRef } from 'react';
import Moveable from 'react-moveable';

import { SelectSticker } from '@/types/photocard';

interface MoveableStickerProps {
  sticker: SelectSticker;
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

  return (
    <>
      <div
        ref={stickerRef}
        onClick={onSelect}
        className="absolute"
        style={{ left: `${sticker.x}px`, top: `${sticker.y}px` }}
      >
        <div className="w-16 h-16">
          {isValidElement(sticker.image) && cloneElement(sticker.image)}
        </div>
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
