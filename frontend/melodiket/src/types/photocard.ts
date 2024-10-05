export interface Photocard {
  photocardUuid: string;
  concertName: string;
  imageCid: string;
  createdAt: string;
}

export interface PhotocardList {
  result: Photocard[];
}
