import { SearchLine } from '@/public/icons';
import Link from 'next/link';

const SearchButton = () => {
  return (
    <Link href={'/search'}>
      <SearchLine />
    </Link>
  );
};

export default SearchButton;
