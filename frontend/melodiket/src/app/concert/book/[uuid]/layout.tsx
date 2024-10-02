'use client';

import { ReactNode } from 'react';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import ArrowButton from '@/components/atoms/button/ArrowButton';
import CrossButton from '@/components/atoms/button/CrossButton';
import { useParams, useRouter } from 'next/navigation';
import SubHeader from '@/components/organisms/navigation/SubHeader';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const params = useParams<{ uuid: string }>();
  const { data } = useFetchConcertDetail(params.uuid);

  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <SubHeader
        title={data?.title ?? ''}
        onClose={() => router.push(`/concert/${params.uuid}`)}
        canGoBack
      />
      <div className="h-0 flex-grow w-full">{children}</div>
    </div>
  );
};

export default Layout;
