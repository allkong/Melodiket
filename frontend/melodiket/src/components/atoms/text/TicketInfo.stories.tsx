import type { Meta, StoryObj } from '@storybook/react';
import TicketInfoRow from './TicketInfo';

const meta: Meta<typeof TicketInfoRow> = {
  component: TicketInfoRow,
};

export default meta;
type Story = StoryObj<typeof TicketInfoRow>;

export const Default: Story = {
  args: {
    fields: [
      { label: '장소', value: '서울올림픽주경기장' },
      { label: '예매일', value: '2024.02.12' },
    ],
  },
};
