import { LogoImage } from '@/public/icons';

interface PageTitleProps {
  title: string;
  total: number;
}

const PageTitle = ({ title, total }: PageTitleProps) => {
  return (
    <div className="flex items-center px-6 py-3 space-x-4 bg-white h-fit">
      <LogoImage className="w-8 h-auto" />
      <div className="flex space-x-3 text-xl font-medium">
        <p>{title}</p>
        <p className="text-gray-400">{total}</p>
      </div>
    </div>
  );
};

export default PageTitle;
