import type { Meta, StoryObj } from '@storybook/react';
import MyPageItem from './MyPageItem';

const meta: Meta<typeof MyPageItem> = {
  component: MyPageItem,
};

export default meta;
type Story = StoryObj<typeof MyPageItem>;

export const Default: Story = {
  args: {
    label: '이름',
    content: '강혁준일지도',
  },
};
