import type { Meta, StoryObj } from '@storybook/react';
import ControlsBarSkeleton from './ControlsBarSkeleton';

const meta: Meta<typeof ControlsBarSkeleton> = {
  component: ControlsBarSkeleton,
};

export default meta;
type Story = StoryObj<typeof ControlsBarSkeleton>;

export const Default: Story = {
  args: {},
};
