import CarouselButton from '@/components/molecules/carousel/CarouselButton';

interface CarouselIndicatorProps {
  size: number;
  currentIndex: number;
  onClick: (value: number) => void;
}

const CarouselIndicator = ({
  size,
  currentIndex,
  onClick,
}: CarouselIndicatorProps) => {
  return (
    <div className="absolute bottom-3 right-3">
      <div className="flex items-center gap-[5px]">
        {Array.from({ length: size }, (_, index) => index).map((index) => (
          <CarouselButton
            key={index}
            index={index}
            onClick={onClick}
            isSelected={index === currentIndex ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselIndicator;
