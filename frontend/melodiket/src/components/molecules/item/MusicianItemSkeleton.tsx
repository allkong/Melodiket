import Skeleton from '@/components/atoms/skeleton/Skeleton';

interface MusicianItemSkeletonProps {
  count?: number;
}

const MusicianItemSkeleton = ({ count = 4 }: MusicianItemSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => idx).map((key) => (
        <div className="flex w-full px-6 py-5 gap-4" key={key}>
          <Skeleton width={52} height={52} rounded />
          <div className="flex flex-col justify-center gap-2">
            <Skeleton width={50} height={15} />
            <Skeleton width={70} height={12} />
          </div>
        </div>
      ))}
    </>
  );
};

export default MusicianItemSkeleton;
