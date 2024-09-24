import type { Meta, StoryObj } from '@storybook/react';
import ConcertRankingCard from './ConcertRankingCard';

const meta: Meta<typeof ConcertRankingCard> = {
  component: ConcertRankingCard,
};

export default meta;
type Story = StoryObj<typeof ConcertRankingCard>;

export const Default: Story = {};
