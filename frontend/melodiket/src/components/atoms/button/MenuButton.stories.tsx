import type { Meta, StoryObj } from '@storybook/react';
import MenuButton from './MenuButton';

const meta: Meta<typeof MenuButton> = {
  component: MenuButton,
};

export default meta;
type Story = StoryObj<typeof MenuButton>;

export const Default: Story = {
  args: {
    onClick: () => alert('메뉴'),
  },
};
