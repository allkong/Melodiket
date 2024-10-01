import type { Meta, StoryObj } from '@storybook/react';
import CrossButton from './CrossButton';
import { fn } from '@storybook/test';

const meta: Meta<typeof CrossButton> = {
  component: CrossButton,
};

export default meta;
type Story = StoryObj<typeof CrossButton>;

export const Default: Story = {
  args: {
    onClick: fn(),
  },
};
