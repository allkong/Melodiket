import Skeleton from '@/components/atoms/skeleton/Skeleton';

interface TicketItemSkeletonProps {
  count?: number;
}

const TicketItemSkeleton = ({ count = 4 }: TicketItemSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => idx).map((key) => (
        <div className="flex items-center px-5 py-4" key={key}>
          <Skeleton width={72} height={99.2}></Skeleton>
          <div className="px-4 py-1.5 space-y-2">
            <Skeleton width={271} height={23} />
            <div className="space-y-1">
              <Skeleton width={100} height={13} />
              <Skeleton width={100} height={13} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TicketItemSkeleton;
