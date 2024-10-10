import Skeleton from '@/components/atoms/skeleton/Skeleton';

interface PhotocardListSkeletonProps {
  count?: number;
}

const PhotocardListSkeleton = ({ count = 1 }: PhotocardListSkeletonProps) => {
  return (
    <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 place-items-center w-full px-3 mt-2 gap-y-2">
      {Array.from({ length: count }, (_, idx) => idx).map((idx) => (
        <div key={idx} className="space-y-2 px-1 py-1">
          <Skeleton width={170} height={240} />
          <Skeleton width={170} height={10} />
        </div>
      ))}
    </div>
  );
};

export default PhotocardListSkeleton;
