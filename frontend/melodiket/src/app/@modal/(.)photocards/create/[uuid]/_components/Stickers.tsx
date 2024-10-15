import Image from 'next/image';

import MusicianSignature from './musician-signature';

interface StickerImageProps {
  src: string;
}

const StickerImage = ({ src }: StickerImageProps) => {
  return <Image src={src} alt="sticker" width={80} height={80} />;
};

const createStickersForPng = (category: string, count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    name: `${category}${index + 1}`,
    category,
    image: <StickerImage src={`/stickers/${category}/${index + 1}.png`} />,
  }));
};

const createStickersForSvg = (category: string, count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    name: `${category}${index + 1}`,
    category,
    image: <StickerImage src={`/stickers/${category}/${index + 1}.svg`} />,
  }));
};

export const stickers = [
  { name: 'signature', category: 'favorite', image: <MusicianSignature /> },
  ...createStickersForSvg('animal', 10),
  ...createStickersForSvg('christmas', 10),
  ...createStickersForSvg('emoji', 10),
  ...createStickersForSvg('flower', 10),
  ...createStickersForSvg('fruit', 10),
  ...createStickersForSvg('heart', 10),
  ...createStickersForSvg('instrument', 10),
  ...createStickersForPng('member', 6),
  ...createStickersForSvg('ocean', 10),
  ...createStickersForSvg('pixel', 10),
  ...createStickersForSvg('real_cat', 6),
];
