import { ReactNode, Suspense } from 'react';
import { LogoText } from '@/public/icons';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './_components/error-component';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full max-w-full h-screen max-h-screen flex flex-col items-center px-6 overflow-hidden">
      <ErrorBoundary fallback={<ErrorComponent />}>
        <div className="my-7 min-h-0">
          <LogoText />
        </div>
        <div className="flex-grow w-full">
          <Suspense>{children}</Suspense>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
