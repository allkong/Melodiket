import { MenuLine } from '@/public/icons';

interface MenuButtonProps {
  onClick?: () => void;
}

const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button onClick={onClick}>
      <MenuLine />
    </button>
  );
};

export default MenuButton;
