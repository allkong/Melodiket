import { ReactNode } from 'react';
import { LogoText } from '@/public/icons';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full max-w-full h-screen max-h-screen flex flex-col items-center px-6 overflow-hidden">
      <div className="my-7 min-h-0">
        <LogoText />
      </div>
      <div className="flex-grow w-full">{children}</div>
    </div>
  );
};

export default Layout;
