import { STICKER_CATEGORIES } from '@/constants/photocard';

export interface Photocard {
  photocardUuid: string;
  concertName: string;
  imageCid: string;
  createdAt: string;
}

export interface PhotocardList {
  result: Photocard[];
}

export interface PhotocardDetail {
  photocardUuid: string;
  concertName: string;
  imageCid: string;
  createdAt: string;
  startAt: string;
  stageName: string;
  seatRow: number;
  seatCol: number;
  musicans: string[];
  favoriteMusician: string;
  nickname: string;
}

export interface Sticker {
  name: string;
  category: keyof typeof STICKER_CATEGORIES;
  image: React.ReactNode;
}

export interface SelectSticker extends Sticker {
  id: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export interface SelectText {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}
