import type { Meta, StoryObj } from '@storybook/react';
import ConcertRankingCard from './ConcertRankingCard';

const meta: Meta<typeof ConcertRankingCard> = {
  component: ConcertRankingCard,
};

export default meta;
type Story = StoryObj<typeof ConcertRankingCard>;

export const Default: Story = {
  args: {
    ranking: 1,
    concertId: '0',
    location: '고척스카이돔',
    posterURL:
      'https://tkfile.yes24.com/upload2/PerfBlog/202211/20221122/20221122-44221.jpg',
    ticketingAt: '2024.09.03',
    title: 'The Volunteers 1st Concert',
  },
};
