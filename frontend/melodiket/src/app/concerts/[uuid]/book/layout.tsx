'use client';

import { ReactNode } from 'react';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import { useParams, useRouter } from 'next/navigation';
import SubHeader from '@/components/organisms/navigation/SubHeader';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const params = useParams<{ uuid: string }>();
  const { data: concert } = useFetchConcertDetail(params.uuid);

  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <SubHeader
        title={concert?.title ?? ''}
        onPrev={() => router.push(`/concerts/${params.uuid}`)}
        canGoPrev
      />
      <div className="h-0 flex-grow w-full">{children}</div>
    </div>
  );
};

export default Layout;
