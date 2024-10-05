import type { Concert } from '@/types/concert';

interface ConcertTitleProps
  extends Partial<Pick<Concert, 'title' | 'location'>> {}

const ConcertTitle = ({ title, location }: ConcertTitleProps) => {
  return (
    <div className="space-y-2">
      <p className="text-2xl font-semibold">{title}</p>
      <p className="text-tiny font-semibold">{location}</p>
    </div>
  );
};

export default ConcertTitle;
