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
          onDrag={({ target, left, top }) => {
            // 스티커가 bounds를 벗어나지 않도록 조정
            const stickerWidth = stickerRef.current?.offsetWidth || 0;
            const stickerHeight = stickerRef.current?.offsetHeight || 0;
            const containerWidth = containerRef.current?.offsetWidth || 0;
            const containerHeight = containerRef.current?.offsetHeight || 0;

            // 스티커가 부모 컨테이너를 넘지 않도록 조정
            const newLeft = Math.min(
              Math.max(0, left),
              containerWidth - stickerWidth
            );
            const newTop = Math.min(
              Math.max(0, top),
              containerHeight - stickerHeight
            );

            target!.style.left = `${newLeft}px`;
            target!.style.top = `${newTop}px`;
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
          bounds={{
            left: 0,
            top: 0,
            right: containerRef.current?.offsetWidth || 0,
            bottom: containerRef.current?.offsetHeight || 0,
          }}
        />
      )}
    </>
  );
};

export default MoveableSticker;
