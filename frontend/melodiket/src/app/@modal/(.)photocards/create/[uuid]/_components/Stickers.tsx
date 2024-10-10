import Image from 'next/image';

import { Sticker } from '@/types/photocard';

import MusicianSignature from './musician-signature';

interface StickerImageProps {
  src: string;
}

const StickerImage = ({ src }: StickerImageProps) => {
  return <Image src={src} alt="sticker" width={80} height={80} />;
};

export const stickers: Sticker[] = [
  { name: 'signature', category: 'favorite', image: <MusicianSignature /> },
  {
    name: 'animal1',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/1.png" />,
  },
  {
    name: 'animal2',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/2.png" />,
  },
  {
    name: 'animal3',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/3.png" />,
  },
  {
    name: 'animal4',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/4.png" />,
  },
  {
    name: 'animal5',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/5.png" />,
  },
  {
    name: 'animal6',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/6.png" />,
  },
  {
    name: 'animal7',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/7.png" />,
  },
  {
    name: 'animal8',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/8.png" />,
  },
  {
    name: 'animal9',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/9.png" />,
  },
  {
    name: 'animal10',
    category: 'animal',
    image: <StickerImage src="/stickers/animal/10.png" />,
  },
  {
    name: 'christmas1',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/1.png" />,
  },
  {
    name: 'christmas2',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/2.png" />,
  },
  {
    name: 'christmas3',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/3.png" />,
  },
  {
    name: 'christmas4',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/4.png" />,
  },
  {
    name: 'christmas5',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/5.png" />,
  },
  {
    name: 'christmas6',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/6.png" />,
  },
  {
    name: 'christmas7',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/7.png" />,
  },
  {
    name: 'christmas8',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/8.png" />,
  },
  {
    name: 'christmas9',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/9.png" />,
  },
  {
    name: 'christmas10',
    category: 'christmas',
    image: <StickerImage src="/stickers/christmas/10.png" />,
  },
  {
    name: 'emoji1',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/1.png" />,
  },
  {
    name: 'emoji2',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/2.png" />,
  },
  {
    name: 'emoji3',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/3.png" />,
  },
  {
    name: 'emoji4',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/4.png" />,
  },
  {
    name: 'emoji5',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/5.png" />,
  },
  {
    name: 'emoji6',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/6.png" />,
  },
  {
    name: 'emoji7',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/7.png" />,
  },
  {
    name: 'emoji8',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/8.png" />,
  },
  {
    name: 'emoji9',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/9.png" />,
  },
  {
    name: 'emoji10',
    category: 'emoji',
    image: <StickerImage src="/stickers/emoji/10.png" />,
  },
];
