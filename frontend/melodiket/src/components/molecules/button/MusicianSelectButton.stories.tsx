import type { Meta, StoryObj } from '@storybook/react';
import MusicianSelectButton from './MusicianSelectButton';

const meta: Meta<typeof MusicianSelectButton> = {
  component: MusicianSelectButton,
};

export default meta;
type Story = StoryObj<typeof MusicianSelectButton>;

export const Default: Story = {
  args: {
    label: '정다빈 밴드',
  },
};
