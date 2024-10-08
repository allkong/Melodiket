import Skeleton from '@/components/atoms/skeleton/Skeleton';

const ControlsBarSkeleton = () => {
  return (
    <div className="flex gap-3 px-6 py-3 bg-white justify-end">
      <Skeleton width={68} height={37} rounded />
      <Skeleton width={105} height={37} rounded />
    </div>
  );
};

export default ControlsBarSkeleton;
