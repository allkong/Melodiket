import { ReactNode, Suspense } from 'react';
import { LogoText } from '@/public/icons';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './_components/error-component';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-center w-full h-screen max-w-full max-h-screen px-6 overflow-hidden">
      <ErrorBoundary fallback={<ErrorComponent />}>
        <div className="min-h-0 my-7">
          <LogoText className="h-auto w-28" />
        </div>
        <div className="flex-grow w-full">
          <Suspense>{children}</Suspense>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
