import type { Meta, StoryObj } from '@storybook/react';
import TicketItem from './TicketItem';

const meta: Meta<typeof TicketItem> = {
  component: TicketItem,
};

export default meta;
type Story = StoryObj<typeof TicketItem>;

export const Default: Story = {
  args: {
    src: 'https://i.namu.wiki/i/kurz0p1Tm_YMWDDeOzBkBd2P0odt2vWapIJHvcVd1KWEhEoLYP-oDj4ZmZxi2dlVMKsT8NcWsMJOIWtiA5rSaHEm2RqzkfrlhC3HdWg0dNjYwGaom5oOwcHFiSPYexcvRXDtY0dnuJnr9JvWXP0Cng.webp',
    concertTitle: 'The Golden Hour : 오렌지 태양 아래',
    stageName: '서울올림픽주경기장',
    createdAt: '2024.09.03',
    startAt: '2024.09.30',
  },
};
