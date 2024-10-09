import type { Meta, StoryObj } from '@storybook/react';
import IsErrorButton from './IsErrorButton';

const meta: Meta<typeof IsErrorButton> = {
  component: IsErrorButton,
};

export default meta;
type Story = StoryObj<typeof IsErrorButton>;

export const Default: Story = {
  args: {},
};
