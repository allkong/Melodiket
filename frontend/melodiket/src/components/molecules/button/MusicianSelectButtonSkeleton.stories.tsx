import type { Meta, StoryObj } from '@storybook/react';
import MusicianSelectButtonSkeleton from './MusicianSelectButtonSkeleton';

const meta: Meta<typeof MusicianSelectButtonSkeleton> = {
  component: MusicianSelectButtonSkeleton,
  decorators: (Story) => {
    return (
      <div style={{ width: 400, height: 200 }}>
        <Story />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof MusicianSelectButtonSkeleton>;

export const Default: Story = {
  args: {
    count: 1,
  },
};
