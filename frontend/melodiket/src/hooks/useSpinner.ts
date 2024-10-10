import useSpinnerStore from '@/store/spinnerStore';
import { useEffect } from 'react';

const useSpinner = (loading?: boolean) => {
  const { setIsLoading } = useSpinnerStore();

  useEffect(() => {
    setIsLoading(loading ?? false);
  }, [loading, setIsLoading]);
};

export default useSpinner;
