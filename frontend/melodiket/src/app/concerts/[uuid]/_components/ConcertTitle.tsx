import type { Concert } from '@/types/concert';

interface ConcertTitleProps
  extends Partial<Pick<Concert, 'title' | 'stageName'>> {}

const ConcertTitle = ({ title, stageName }: ConcertTitleProps) => {
  return (
    <div className="space-y-2">
      <p className="text-2xl font-semibold">{title}</p>
      <p className="text-tiny font-semibold">{stageName}</p>
    </div>
  );
};

export default ConcertTitle;
