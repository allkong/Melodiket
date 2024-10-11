import Skeleton from '@/components/atoms/skeleton/Skeleton';

interface MusicianSelectButtonSkeletonProps {
  count?: number;
}

const MusicianSelectButtonSkeleton = ({
  count = 4,
}: MusicianSelectButtonSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => idx).map((key) => (
        <div key={key} className="flex w-full px-5 py-3 justify-between">
          <Skeleton height={22} width={100} />
          <Skeleton height={22} width={22} rounded />
        </div>
      ))}
    </>
  );
};

export default MusicianSelectButtonSkeleton;
