import type { Meta, StoryObj } from '@storybook/react';
import MusicianItemSkeleton from './MusicianItemSkeleton';

const meta: Meta<typeof MusicianItemSkeleton> = {
  component: MusicianItemSkeleton,
};

export default meta;
type Story = StoryObj<typeof MusicianItemSkeleton>;

export const Default: Story = {
  args: {
    count: 3,
  },
};
