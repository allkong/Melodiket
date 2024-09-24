import type { Meta, StoryObj } from '@storybook/react';
import ControlsBar from './ControlsBar';

const meta: Meta<typeof ControlsBar> = {
  component: ControlsBar,
};

export default meta;
type Story = StoryObj<typeof ControlsBar>;

export const Default: Story = {
  args: {},
};
