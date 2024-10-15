import type { Metadata, Viewport } from 'next';
import Providers from '@/app/providers';
import '../styles/globals.css';
import { MSWComponent } from './_components/MSWComponent';
import KakaoScript from './_lib/KakaoScript';
import { Toaster } from 'react-hot-toast';
import Spinner from './_components/spinner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: 'melodiket',
  description: '밴드 공연 티케팅 서비스',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/pwa/icon-192x192.png',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'melodiket',
    description: '밴드 공연 티케팅 서비스',
    images: [
      {
        url: `${siteUrl}/images/melodiket.png`,
        alt: 'Melodiket Thumbnail',
      },
    ],
  },
};

export const viewport: Viewport = {
  userScalable: false,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <MSWComponent />
          <div className="max-w-xl min-h-screen mx-auto my-0 bg-white shadow-md">
            {children}
            {modal}
            <Toaster position="top-center" />
            <Spinner />
          </div>
          <div
            id="menu-portal"
            className="fixed top-0 z-10 w-full max-w-xl min-h-screen mx-auto overflow-x-hidden -translate-x-1/2 pointer-events-none left-1/2"
          ></div>
          <div
            id="spinner-portal"
            className="fixed w-full max-w-xl top-0 z-20 h-screen flex items-center justify-center pointer-events-none"
          ></div>
        </Providers>
      </body>
      <KakaoScript />
    </html>
  );
}
