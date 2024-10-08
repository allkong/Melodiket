import type { Meta, StoryObj } from '@storybook/react';
import MenuProfile from './MenuProfile';

const meta: Meta<typeof MenuProfile> = {
  component: MenuProfile,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MenuProfile>;

export const Default: Story = {
  args: {
    nickname: '박유빈님',
    imageURL: '',
    role: '공연장 관리자',
  },
};
