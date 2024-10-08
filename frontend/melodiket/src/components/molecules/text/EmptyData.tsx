import { LogoImage } from '@/public/icons';

interface EmptyDataProps {
  text: string;
}

const EmptyData = ({ text }: EmptyDataProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full pb-[8vh]">
      <LogoImage className="h-auto w-11" />
      <p className="mt-3 text-gray-500">{text}</p>
    </div>
  );
};

export default EmptyData;
