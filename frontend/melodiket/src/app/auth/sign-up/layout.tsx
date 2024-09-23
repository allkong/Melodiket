import { ReactNode } from 'react';
import { LogoText } from '@/public/icons';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full max-w-full h-screen min-h-screen flex flex-col items-center px-6">
      <div className="my-7">
        <LogoText />
      </div>
      {children}
    </div>
  );
};

export default Layout;
