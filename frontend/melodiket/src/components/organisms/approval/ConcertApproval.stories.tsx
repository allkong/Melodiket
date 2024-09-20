import type { Meta, StoryObj } from '@storybook/react';
import ConcertApproval from './ConcertApproval';

const meta: Meta<typeof ConcertApproval> = {
  component: ConcertApproval,
};

export default meta;
type Story = StoryObj<typeof ConcertApproval>;

export const Default: Story = {
  args: {
    concertName: '공연 이름',
    date: '2024.09.06(금)',
    price: '10,000원',
  },
};
