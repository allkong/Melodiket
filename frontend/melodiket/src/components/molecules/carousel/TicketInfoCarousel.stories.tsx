import type { Meta, StoryObj } from '@storybook/react';
import TicketInfoCarousel from './TicketInfoCarousel';

const meta: Meta<typeof TicketInfoCarousel> = {
  component: TicketInfoCarousel,
};

export default meta;
type Story = StoryObj<typeof TicketInfoCarousel>;

export const Default: Story = {
  args: {
    data: ['예매한 티켓이 없어요 T_T', '사실 잇지롱', 'A310 화이팅~'],
  },
};
