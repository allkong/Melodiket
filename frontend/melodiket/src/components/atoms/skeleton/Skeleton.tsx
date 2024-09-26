import clsx from 'clsx';

interface SekeletonProps {
  width?: number;
  height?: number;
  rounded?: boolean;
  count?: number;
}

const Skeleton = ({
  width = 40,
  height = 10,
  count = 1,
  rounded,
}: SekeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => idx).map((idx) => (
        <div
          key={idx}
          className={clsx('bg-gray-200 rounded animate-pulse', {
            'rounded-full': rounded,
          })}
          style={{ width, height }}
        ></div>
      ))}
    </>
  );
};

export default Skeleton;
