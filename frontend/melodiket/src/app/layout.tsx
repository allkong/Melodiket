import type { Metadata } from 'next';
import Providers from '@/app/providers';
import '../styles/globals.css';
import { MSWComponent } from './_component/MSWComponent';
import Menu from '@/components/organisms/menu/Menu';
import {
  BackLine,
  Basket,
  Card,
  Favorite,
  ForwardLine,
  Guitar,
  Microphone,
  Music,
  MyPage,
} from '@/public/icons';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kor">
      <body>
        <Providers>
          <MSWComponent />
          <div className="max-w-xl min-h-screen mx-auto my-0 bg-white shadow-md">
            {children}
            <Menu>
              <Menu.Header />
              <Menu.Profile />
              <Menu.Divider />
              <Menu.Item href="/concert/list" icon={<Music />} label="공연" />
              <Menu.Item href="/concert" icon={<Music />} label="공연 생성" />
              <Menu.Item href="/musicians" icon={<Guitar />} label="뮤지션" />
              <Menu.Divider />
              <Menu.Item
                href="/favorites"
                icon={<Favorite />}
                label="찜한 공연/뮤지션"
              />
              <Menu.Item href="/" icon={<Basket />} label="예매내역" />
              <Menu.Item href="/" icon={<Card />} label="포토카드" />
              <Menu.Item href="/" icon={<Microphone />} label="내 공연" />
              <Menu.Divider />
              <Menu.Item href="/" icon={<MyPage />} label="마이페이지" />
              <Menu.Item href="/" icon={<BackLine />} label="로그아웃" />
              <Menu.Item
                href="/auth/login"
                icon={<ForwardLine />}
                label="로그인"
              />
            </Menu>
          </div>
          <div
            id="menu-portal"
            className="fixed overflow-x-hidden top-0 left-1/2 -translate-x-1/2 max-w-xl w-full min-h-screen mx-auto z-10 pointer-events-none"
          ></div>
        </Providers>
      </body>
    </html>
  );
}
