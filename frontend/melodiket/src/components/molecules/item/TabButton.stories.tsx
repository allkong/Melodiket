import type { Meta, StoryObj } from '@storybook/react';
import TabButton from './TabButton';

const meta: Meta<typeof TabButton> = {
  component: TabButton,
};

export default meta;
type Story = StoryObj<typeof TabButton>;

export const Default: Story = {
  args: {},
};
