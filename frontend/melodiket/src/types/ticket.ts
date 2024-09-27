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
}

export interface TicketListResponse {
  result: Ticket[];
}

export interface TicketDetailResponse {
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
    musicianImageUrl: string;
  };
}

export type TicketStatus = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];
