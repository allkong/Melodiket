import Link from 'next/link';
import { ReactElement } from 'react';

interface MenuItemProps {
  icon: ReactElement;
  label: string;
  href: string;
}

const MenuItem = ({ icon, label, href }: MenuItemProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-[10px] w-full h-[41px] px-6"
    >
      <div>{icon}</div>
      <p className="text-sm">{label}</p>
    </Link>
  );
};

export default MenuItem;
