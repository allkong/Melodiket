import type { Meta, StoryObj } from '@storybook/react';
import SmallButton from './SmallButton';

const meta: Meta<typeof SmallButton> = {
  component: SmallButton,
};

export default meta;
type Story = StoryObj<typeof SmallButton>;

export const Default: Story = {
  args: {
    label: '예매 페이지 보기',
    onClick: () => alert('이동'),
  },
};
