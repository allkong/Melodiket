'use client';

import { ReactNode } from 'react';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import ArrowButton from '@/components/atoms/button/ArrowButton';
import CrossButton from '@/components/atoms/button/CrossButton';
import { useParams, useRouter } from 'next/navigation';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const params = useParams<{ uuid: string }>();
  const { data } = useFetchConcertDetail(params.uuid);

  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="relative flex items-center justify-between w-full h-14 px-6 bg-white">
        <ArrowButton direction="left" onClick={() => router.back()} />
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-tiny">
          {data?.title ?? ''}
        </p>
        <CrossButton onClick={() => router.push(`/concert/${params.uuid}`)} />
      </div>
      <div className="h-0 flex-grow w-full">{children}</div>
    </div>
  );
};

export default Layout;
