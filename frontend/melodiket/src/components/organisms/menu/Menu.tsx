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
  Guitar,
  Microphone,
  Music,
  MyPage,
} from '@/public/icons';
import { useLogout } from '@/services/auth/useLogout';

const MenuWithPortal = () => {
  const handleLogout = useLogout();

  return (
    <MenuPortal>
      <MenuMain>
        <Menu.Header />
        <Menu.Profile />
        <Menu.Divider />
        <Menu.Item href="/concerts" icon={<Music />} label="공연" />
        <Menu.Item
          href="/management/concerts"
          icon={<Music />}
          label="공연 생성"
        />
        <Menu.Item href="/musicians" icon={<Guitar />} label="뮤지션" />
        <Menu.Divider />
        <Menu.Item
          href="/favorites"
          icon={<Favorite />}
          label="찜한 공연/뮤지션"
        />
        <Menu.Item href="/mytickets" icon={<Basket />} label="예매내역" />
        <Menu.Item
          href="/photocards"
          icon={<Card width={22} height={22} className="text-purple-200" />}
          label="포토카드"
        />
        <Menu.Item
          href="/management/concerts"
          icon={<Microphone />}
          label="내 공연"
        />
        <Menu.Divider />
        <Menu.Item href="/mypage" icon={<MyPage />} label="마이페이지" />
        <Menu.Item
          onClick={handleLogout}
          icon={<BackLine />}
          label="로그아웃"
        />
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
