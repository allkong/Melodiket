import { ReactNode } from 'react';
import clsx from 'clsx';

interface DetailSectionProps {
  title: string;
  children: ReactNode;
  isLast?: boolean;
}

const DetailSection = ({ title, children, isLast }: DetailSectionProps) => {
  return (
    <div className={clsx('py-4 space-y-3', !isLast && 'border-b')}>
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="px-1">{children}</div>
    </div>
  );
};

export default DetailSection;
