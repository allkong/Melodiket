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
  id: string;
  src: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export interface Text {
  id: string;
  text: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}
