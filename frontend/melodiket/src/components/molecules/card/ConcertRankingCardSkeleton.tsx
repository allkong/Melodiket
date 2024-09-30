import Skeleton from '@/components/atoms/skeleton/Skeleton';

interface ConcertRankingCardSkeletonProps {
  count?: number;
}

const ConcertRankingCardSkeleton = ({
  count = 1,
}: ConcertRankingCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => idx).map((idx) => (
        <div key={idx} className="space-y-2 px-1 py-1">
          <Skeleton width={136} height={192} />
          <div className="space-y-1">
            <Skeleton width={100} height={18} />
            <Skeleton width={80} height={10} />
            <Skeleton width={80} height={10} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ConcertRankingCardSkeleton;
