import clsx from 'clsx';

interface PhotocardFrameProps {
  children: React.ReactNode;
  isCreated?: boolean;
  back?: boolean;
}

const PhotocardFrame = ({
  children,
  isCreated = false,
  back = false,
}: PhotocardFrameProps) => {
  return (
    <div
      className={clsx(
        'w-[20.7rem] h-[33.3rem] relative rounded-lg overflow-hidden border border-gray-200',
        {
          'px-5 pt-5 bg-white': !isCreated,
          'bg-white flex flex-col py-10 px-5 justify-between': back,
        }
      )}
    >
      {isCreated ? (
        <>{children}</>
      ) : (
        <div className="w-full h-[25.9rem] rounded-lg relative">{children}</div>
      )}
    </div>
  );
};

export default PhotocardFrame;
