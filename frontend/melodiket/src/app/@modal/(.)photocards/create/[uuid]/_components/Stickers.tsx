import Image from 'next/image';

import { Sticker } from '@/types/photocard';

import MusicianSignature from './musician-signature';

interface StickerImageProps {
  src: string;
}

const StickerImage = ({ src }: StickerImageProps) => {
  return <Image src={src} alt="sticker" width={80} height={80} />;
};

const createStickers = (category: string, count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    name: `${category}${index + 1}`,
    category,
    image: <StickerImage src={`/stickers/${category}/${index + 1}.png`} />,
  }));
};

export const stickers = [
  { name: 'signature', category: 'favorite', image: <MusicianSignature /> },
  ...createStickers('animal', 10),
  ...createStickers('christmas', 10),
  ...createStickers('emoji', 10),
  ...createStickers('flower', 10),
  ...createStickers('fruit', 10),
  ...createStickers('heart', 10),
  ...createStickers('instrument', 10),
  ...createStickers('member', 6),
  ...createStickers('ocean', 10),
  ...createStickers('pixel', 10),
  ...createStickers('real_cat', 6),
];
