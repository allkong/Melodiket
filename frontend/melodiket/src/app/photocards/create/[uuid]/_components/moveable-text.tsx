import { SelectText } from '@/types/photocard';
import { useRef } from 'react';
import Moveable from 'react-moveable';

interface MoveableTextProps {
  text: SelectText;
  isSelected: boolean;
  onSelect: () => void;
  containerRef: React.RefObject<HTMLElement>;
}

const MoveableText = ({
  text,
  isSelected,
  onSelect,
  containerRef,
}: MoveableTextProps) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div
        ref={textRef}
        onClick={onSelect}
        className="absolute cursor-pointer"
        style={{ left: `${text.x}px`, top: `${text.y}px` }}
      >
        <p style={{ color: text.color, whiteSpace: 'pre-wrap' }}>
          {text.label}
        </p>
      </div>

      {isSelected && (
        <Moveable
          target={textRef.current}
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

export default MoveableText;
