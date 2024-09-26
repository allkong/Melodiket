import type { Meta, StoryObj } from '@storybook/react';
import ConcertRankingCardSkeleton from './ConcertRankingCardSkeleton';

const meta: Meta<typeof ConcertRankingCardSkeleton> = {
  component: ConcertRankingCardSkeleton,
};

export default meta;
type Story = StoryObj<typeof ConcertRankingCardSkeleton>;

export const Default: Story = {};
