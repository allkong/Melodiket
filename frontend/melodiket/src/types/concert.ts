import { StageData } from './stage';

export interface ConcertData {
  concertName: string;
  startAt: Date;
  ticketingAt: Date;
  concertDescription: string;
  concertPoster: File;
  musicianList: { [key: string]: string };
  ticketPrice: number;
  ownerStake: number;
  musicianStake: number;
  favoriteMusicianStake: number;
  stageInformation: StageData;
}

export interface Concert {
  index: number;
  image: string;
  title: string;
  description: string;
  startedAt: string;
  location: string;
}
