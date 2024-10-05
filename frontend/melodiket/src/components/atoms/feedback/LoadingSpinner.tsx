import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <Image src="/images/spinner.png" alt="loading" width={70} height={70} />
  );
};

export default LoadingSpinner;
