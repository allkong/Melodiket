import type { Meta, StoryObj } from '@storybook/react';
import EmptyData from './EmptyData';

const meta: Meta<typeof EmptyData> = {
  component: EmptyData,
};

export default meta;
type Story = StoryObj<typeof EmptyData>;

export const Default: Story = {
  args: {
    text: '예매한 공연이 없어요',
  },
};
