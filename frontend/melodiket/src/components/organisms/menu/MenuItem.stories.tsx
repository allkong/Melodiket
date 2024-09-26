import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from './MenuItem';
import { BackLine } from '@/public/icons';

const meta: Meta<typeof MenuItem> = {
  component: MenuItem,
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    icon: <BackLine />,
    label: '로그아웃',
  },
};
