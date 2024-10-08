import type { Meta, StoryObj } from '@storybook/react';
import ConcertCardSkeleton from './ConcertCardSkeleton';

const meta: Meta<typeof ConcertCardSkeleton> = {
  component: ConcertCardSkeleton,
};

export default meta;
type Story = StoryObj<typeof ConcertCardSkeleton>;

export const Default: Story = {};
