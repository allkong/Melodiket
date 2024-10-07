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
