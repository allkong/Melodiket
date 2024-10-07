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
  concertUuid: string;
  stageUuid: string;
  title: string;
  startAt: string;
  ticketingAt: string;
  availableTickets: number;
  isAvailableSeat: boolean[][];
  description: string;
  posterCid: string;
  ticketPrice: number;
  owner: string;
  ownerStake: string;
  favoriteMusicianStake: string;
  musicians: {
    musicianUuid: string;
    name: string;
    imageUrl: string;
  }[];
  isDeleted: boolean;
  stageName: string;
  isFavorite: boolean;
  isStanding: boolean;
  favorites?: number;
}

export interface CarouselConcert
  extends Pick<
    Concert,
    'description' | 'stageName' | 'title' | 'ticketingAt' | 'posterCid'
  > {}

export interface FetchConcertResponse {
  pageInfo: {
    hasNextPage: boolean;
    lastUuid: string;
    requestedSize: number;
    responsedSize: number;
  };
  result: Pick<
    Concert,
    'concertUuid' | 'posterCid' | 'title' | 'stageName' | 'ticketingAt'
  >[];
}

export interface FetchConcertDetail {
  pageInfo: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    pageNo: number;
    requestedSize: number;
    responsedSize: number;
  };
  result: Concert;
}

export interface FetchMyConcertsResponse {
  pageInfo: {
    hasNextPage: boolean;
    requestedSize: number;
    responsedSize: number;
  };
  result: ConcertApprovalStatus[];
}

export interface ConcertApprovalStatus {
  uuid: string;
  title: string;
  stageName: string;
  createdAt: string;
  startAt: string;
  ticketingAt: string;
  description: string;
  ticketPrice: number;
  concertStatus: string;
  approvalStatus: string;
}
