import type { Metadata } from 'next';
import { pretendard } from '../../public/fonts/fonts';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'melodiket',
  description: '밴드 공연 티케팅 서비스',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kor">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        {/* <body className={`font-pretendard antialiased`}> */}
        <div className="max-w-xl min-h-screen mx-auto my-0 bg-white shadow-md">
          {children}
        </div>
      </body>
    </html>
  );
}
