import type { Meta, StoryObj } from '@storybook/react';
import RotateButton from './RotateButton';

const meta: Meta<typeof RotateButton> = {
  component: RotateButton,
};

export default meta;
type Story = StoryObj<typeof RotateButton>;

export const Default: Story = {
  args: {
    onClick: () => alert('회전'),
  },
};
