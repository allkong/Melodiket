import Skeleton from '@/components/atoms/skeleton/Skeleton';

interface MusicianItemSkeletonProps {
  count?: number;
}

const MusicianItemSkeleton = ({ count = 1 }: MusicianItemSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => idx).map((idx) => (
        <div
          key={idx}
          className="flex items-center px-6 py-5 space-x-4 bg-white border-b border-purple-50"
        >
          <Skeleton width={56} height={56} rounded />
          <Skeleton width={80} height={18} />
        </div>
      ))}
    </>
  );
};

export default MusicianItemSkeleton;
