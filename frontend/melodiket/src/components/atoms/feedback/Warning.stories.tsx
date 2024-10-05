import type { Meta, StoryObj } from '@storybook/react';
import Warning from './Warning';

const meta: Meta<typeof Warning> = {
  component: Warning,
};

export default meta;
type Story = StoryObj<typeof Warning>;

export const Default: Story = {
  args: {
    type: 'info',
  },
};
