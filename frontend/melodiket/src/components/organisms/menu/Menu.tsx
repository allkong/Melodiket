import { ReactNode } from 'react';
import MenuPortal from './MenuPortal';
import MenuMain from './MenuMain';
import ThinDivider from '@/components/atoms/divider/ThinDivider';
import MenuHeader from './MenuHeader';
import MenuItem from './MenuItem';
import MenuProfile from './MenuProfile';

interface MenuWithPortalProps {
  children?: ReactNode;
}

const MenuWithPortal = ({ children }: MenuWithPortalProps) => {
  return (
    <MenuPortal>
      <MenuMain>{children}</MenuMain>
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
