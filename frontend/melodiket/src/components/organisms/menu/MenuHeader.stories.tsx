import type { Meta, StoryObj } from '@storybook/react';
import MenuHeader from './MenuHeader';

const meta: Meta<typeof MenuHeader> = {
  component: MenuHeader,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MenuHeader>;

export const Default: Story = {};
