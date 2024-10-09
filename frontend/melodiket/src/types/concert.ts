export interface ConcertData {
  stageUuid: string;
  title: string;
  startAt: string;
  ticketingAt: string;
  description: string;
  posterCid: string;
  musicians: string[];
  ticketPrice: number;
  ownerStake: number;
  musicianStake: number;
  favoriteMusicianStake: number;
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
    | 'concertUuid'
    | 'posterCid'
    | 'title'
    | 'stageName'
    | 'ticketingAt'
    | 'startAt'
  >[];
}

export interface ConcertDetail {
  availableTickets: number;
  isAvailableSeat?: boolean[][];
  capacity: number;
  concertUuid: string;
  createdAt: string;
  description: string;
  favoriteMusicianStake: number;
  isStanding: boolean;
  musicianStake: number;
  musicians: {
    musicianUuid: string;
    name: string;
    imageUrl: string;
  }[];
  ownerStake: number;
  posterCid: string;
  stageName: string;
  stageUuid: string;
  startAt: string;
  status: string;
  ticketPrice: number;
  ticketingAt: string;
  title: string;
  isLike: boolean;
  likeCount: number;
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

export interface CreateConcertResponse {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  posterCid: string;
  owner: string;
  ownerStake: string;
  musicianStake: string;
  favoriteMusicianStake: string;
  musicians: string[];
  isDeleted: boolean;
}
