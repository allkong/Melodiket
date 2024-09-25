export interface Concert {
  index: number;
  concertId: string;
  ticketingAt: string;
  startedAt: string;
  title: string;
  description: string;
  musicians: string[];
  location: string;
  posterURL: string;
}

export interface CarouselConcert
  extends Pick<
    Concert,
    'index' | 'description' | 'location' | 'title' | 'ticketingAt' | 'posterURL'
  > {}

export interface ConcertListItem
  extends Pick<
    Concert,
    'concertId' | 'posterURL' | 'title' | 'location' | 'ticketingAt'
  > {}
