import Skeleton from '@/components/atoms/skeleton/Skeleton';

interface ConcertCardSkeletonProps {
  count?: number;
}

const ConcertCardSkeleton = ({ count = 1 }: ConcertCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => idx).map((idx) => (
        <div key={idx} className="space-y-2 px-1 py-1">
          <Skeleton width={170} height={240} />
          <div className="space-y-1">
            <Skeleton width={140} height={18} />
            <Skeleton width={80} height={11} />
            <Skeleton width={80} height={11} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ConcertCardSkeleton;
