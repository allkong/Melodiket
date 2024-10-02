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

export interface TicketsResponse {
  result: Ticket[];
}

export type TicketStatus = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];

export interface TicketBook {
  concertId: string;
  seatRow: number;
  seatCol: number;
  tokenAmount: number;
  favoriteMusician: string;
}

export interface TicketBookPolicy {
  key: number;
  label: string;
  isEssential: boolean;
}
