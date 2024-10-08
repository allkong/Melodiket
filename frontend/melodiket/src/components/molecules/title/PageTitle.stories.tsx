import type { Meta, StoryObj } from '@storybook/react';
import PageTitle from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  component: PageTitle,
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    title: '좋아하는 뮤지션',
    total: 3,
  },
};
