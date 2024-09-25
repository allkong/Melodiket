export interface Ticket {
  ticketId: number;
  poster: string;
  concertTitle: string;
  stageName: string;
  startAt: string;
  createdAt?: string;
  refundAt?: string;
}

export interface TicketsResponse {
  result: Ticket[];
}
