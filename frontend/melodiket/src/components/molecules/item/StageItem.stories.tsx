import type { Meta, StoryObj } from '@storybook/react';
import StageItem from './StageItem';

const meta: Meta<typeof StageItem> = {
  component: StageItem,
};

export default meta;
type Story = StoryObj<typeof StageItem>;

export const Default: Story = {
  args: {
    title: '고척 스카이돔',
    content: '서울특별시 구로구 경인로 430',
  },
};
