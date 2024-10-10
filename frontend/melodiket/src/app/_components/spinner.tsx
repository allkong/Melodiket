'use client';

import LoadingSpinner from '@/components/atoms/feedback/LoadingSpinner';
import useSpinnerStore from '@/store/spinnerStore';
import SpinnerPortal from './spinner-portal';
import clsx from 'clsx';

const Spinner = () => {
  const { isLoading } = useSpinnerStore();

  return (
    <>
      {isLoading ? (
        <SpinnerPortal>
          <div
            className={clsx(
              'fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-full bg-gray-500 opacity-30',
              {
                'pointer-events-none': !isLoading,
                'pointer-events-auto': isLoading,
              }
            )}
          ></div>
          <div className="fixed">
            <LoadingSpinner />
          </div>
        </SpinnerPortal>
      ) : null}
    </>
  );
};

export default Spinner;
