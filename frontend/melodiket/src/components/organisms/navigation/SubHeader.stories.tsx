import type { Meta, StoryObj } from '@storybook/react';
import SubHeader from './SubHeader';

const meta: Meta<typeof SubHeader> = {
  component: SubHeader,
};

export default meta;
type Story = StoryObj<typeof SubHeader>;

export const Default: Story = {
  args: {
    title: '모바일 티켓',
    onPrev: () => {
      alert('이동');
    },
    canGoPrev: true,
  },
};
