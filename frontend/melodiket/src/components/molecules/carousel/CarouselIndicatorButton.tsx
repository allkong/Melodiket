import clsx from 'clsx';

interface CarouselButtonProps {
  index: number;
  onClick?: (index: number) => void;
  isSelected?: boolean;
}

const CarouselButton = ({
  index,
  isSelected,
  onClick,
}: CarouselButtonProps) => {
  return (
    <button
      className={clsx('w-[5px] h-[5px] rounded-full opacity-70', {
        'bg-white': !isSelected,
        'bg-purple-400': isSelected,
      })}
      onClick={() => onClick?.(index)}
      disabled={isSelected}
    ></button>
  );
};

export default CarouselButton;
