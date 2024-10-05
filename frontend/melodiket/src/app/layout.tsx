import type { Metadata } from 'next';
import Providers from '@/app/providers';
import '../styles/globals.css';
import { MSWComponent } from './_component/MSWComponent';

export const metadata: Metadata = {
  title: 'melodiket',
  description: '밴드 공연 티케팅 서비스',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/pwa/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="kor">
      <body>
        <Providers>
          <MSWComponent />
          <div className="max-w-xl min-h-screen mx-auto my-0 bg-white shadow-md">
            {children}
            {modal}
          </div>
          <div
            id="menu-portal"
            className="fixed top-0 z-10 w-full max-w-xl min-h-screen mx-auto overflow-x-hidden -translate-x-1/2 pointer-events-none left-1/2"
          ></div>
        </Providers>
      </body>
    </html>
  );
}
