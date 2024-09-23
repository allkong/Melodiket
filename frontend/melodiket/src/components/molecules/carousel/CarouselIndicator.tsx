import CarouselButton from '@/components/molecules/carousel/CarouselButton';
import type { ConcertData } from '@/types/concert';

interface CarouselIndicatorProps {
  datas: ConcertData[]; // ContextAPI 설정 후 datas 삭제 필요
  align?: 'left' | 'middle' | 'right';
}

const CarouselIndicator = ({
  datas,
  // align = 'middle',
}: CarouselIndicatorProps) => {
  return (
    <div className="absolute bottom-3 right-3">
      <div className="flex items-center gap-[5px]">
        {datas.map((data) => (
          <CarouselButton
            key={data.index}
            index={data.index}
            isSelected={data.index === 0 ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselIndicator;
