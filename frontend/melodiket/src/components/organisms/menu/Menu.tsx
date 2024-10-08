import useAuthStore from '@/store/authStore';
import { useLogout } from '@/services/auth/useLogout';

import MenuPortal from './MenuPortal';
import MenuMain from './MenuMain';
import ThinDivider from '@/components/atoms/divider/ThinDivider';
import MenuHeader from './MenuHeader';
import MenuItem from './MenuItem';
import MenuProfile from './MenuProfile';
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

const MenuWithPortal = () => {
  const { user } = useAuthStore();
  const handleLogout = useLogout();

  return (
    <MenuPortal>
      <MenuMain>
        <Menu.Header />
        <Menu.Profile />
        <Menu.Divider />
        <Menu.Item
          href="/concerts"
          icon={<Music className="text-secondary" />}
          label="공연"
        />
        <Menu.Item href="/musicians" icon={<Guitar />} label="뮤지션" />
        <Menu.Divider />
        {user?.role === 'AUDIENCE' && (
          <Menu.Item href="/favorites" icon={<Favorite />} label="찜 리스트" />
        )}
        {user?.role === 'AUDIENCE' && (
          <Menu.Item href="/mytickets" icon={<Basket />} label="예매내역" />
        )}
        {user?.role === 'AUDIENCE' && (
          <Menu.Item
            href="/photocards"
            icon={<Card width={22} height={22} className="text-purple-200" />}
            label="포토카드"
          />
        )}
        {user?.role === 'STAGE_MANAGER' ||
          (user?.role === 'MUSICIAN' && (
            <Menu.Item
              href="/management/concerts"
              icon={<Microphone />}
              label="내 공연"
            />
          ))}
        {user?.role === 'STAGE_MANAGER' && (
          <Menu.Item
            href="/management/concerts/register"
            icon={<Music className="text-purple-200" />}
            label="공연 등록"
          />
        )}
        {user?.role === 'MUSICIAN' && (
          <Menu.Item
            href="/management/concerts/approval"
            icon={<Music className="text-purple-200" />}
            label="공연 승인"
          />
        )}
        {user ? (
          <>
            <Menu.Divider />
            <Menu.Item href="/mypage" icon={<MyPage />} label="마이페이지" />
            <Menu.Item
              onClick={handleLogout}
              icon={<BackLine />}
              label="로그아웃"
            />
          </>
        ) : (
          <Menu.Item href="/auth/login" icon={<ForwardLine />} label="로그인" />
        )}
      </MenuMain>
    </MenuPortal>
  );
};

const Menu = Object.assign(MenuWithPortal, {
  Divider: ThinDivider,
  Header: MenuHeader,
  Item: MenuItem,
  Profile: MenuProfile,
});

export default Menu;
