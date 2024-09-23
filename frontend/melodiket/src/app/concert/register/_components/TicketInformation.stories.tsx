import type { Meta, StoryObj } from '@storybook/react';
import TicketInformation from './TicketInformation';

const meta: Meta<typeof TicketInformation> = {
  component: TicketInformation,
};

export default meta;
type Story = StoryObj<typeof TicketInformation>;

export const Default: Story = {
  args: {},
};
