import { SORT_OPTIONS } from '@/constants/controlOptions';
import { TICKET_STATUS } from '@/constants/tickets';

export interface Ticket {
  ticketUuid: string;
  concertTitle: string;
  posterCid: string;
  stageName: string;
  stageAddress: string;
  status: TicketStatus;
  startAt?: string;
  createdAt?: string;
  refundAt?: string;
  myFavoriteMusician: {
    musicianName: string;
    musicianImageUrl: string;
    musicianSignatureImageUrl: string;
  };
}

export interface TicketList {
  result: Ticket[];
}

export interface TicketDetail {
  ticketUuid: string;
  concertUuid: string;
  concertTitle: string;
  posterCid: string;
  stageName: string;
  stageAddress: string;
  ticketPrice: number;
  status: TicketStatus;
  seatRow: number;
  seatCol: number;
  refundAt: string;
  usedAt: string;
  createdAt: string;
  startAt: string;
  userName: string;
  myFavoriteMusician: {
    musicianName: string;
    musicianImageUrl: string;
    musicianSignatureImageUrl: string;
  };
}

export type TicketStatus = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];

export interface TicketBookRequest {
  concertId: string;
  seatRow: number;
  seatCol: number;
  favoriteMusician: string;
}

export interface TicketBookResponse {
  ticketUuid: string;
  concertTitle: string;
  posterCid: string;
  stageName: string;
  stageAddress: string;
  ticketPrice: number;
  status: TicketStatus;
  seatRow: number;
  seatCol: number;
  refundAt: string;
  usedAt: string;
  createdAt: string;
  startAt: string;
  myFavoriteMusician: {
    musicianName: string;
    musicainImageUrl: string;
  };
  userName: string;
}

export interface TicketBookPolicy {
  key: number;
  label: string;
  isEssential: boolean;
}

export interface FetchConcertRequest {
  isFirstPage?: boolean;
  lastUuid?: string;
  pageSize?: number;
  orderDirection?: 'ASC' | 'DESC';
  title?: string;
  isNowBooking?: boolean;
  currentSort?: keyof typeof SORT_OPTIONS;
}
