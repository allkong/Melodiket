import type { Meta, StoryObj } from '@storybook/react';
import TicketItemSkeleton from './TicketItemSkeleton';

const meta: Meta<typeof TicketItemSkeleton> = {
  component: TicketItemSkeleton,
};

export default meta;
type Story = StoryObj<typeof TicketItemSkeleton>;

export const Default: Story = {
  args: {
    count: 1,
  },
};
