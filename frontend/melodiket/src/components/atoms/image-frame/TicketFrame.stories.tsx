import type { Meta, StoryObj } from '@storybook/react';
import TicketFrame from './TicketFrame';

const meta: Meta<typeof TicketFrame> = {
  component: TicketFrame,
};

export default meta;
type Story = StoryObj<typeof TicketFrame>;

export const Default: Story = {
  args: {
    src: 'https://i.namu.wiki/i/QwiztPBYzKX8d8-VsOKnVErKfVRk2wijjyXRT5P2r8PWC_K5Rd6zoq-GNL2C3jYROGcakDMfi_rmwOPB4ZwnB09VtdrHW_gnLZ0G1JlUXsFCxtu7Yk4I7UAirtE9gwAMEAGnCpAD04emSIrK9voE7g.webp',
  },
};
