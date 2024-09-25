import Link from 'next/link';

const MenuHeader = () => {
  return (
    <div className="flex justify-between w-full h-14 bg-pink-500 px-4">
      <Link href="/">123</Link>
      <Link href="/">456</Link>
    </div>
  );
};

export default MenuHeader;
