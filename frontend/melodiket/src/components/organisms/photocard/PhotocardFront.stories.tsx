import type { Meta, StoryObj } from '@storybook/react';
import PhotocardFront from './PhotocardFront';

const meta: Meta<typeof PhotocardFront> = {
  component: PhotocardFront,
};

export default meta;
type Story = StoryObj<typeof PhotocardFront>;

export const Default: Story = {
  args: {
    src: 'https://newsimg.sedaily.com/2024/07/03/2DBLHV9TUG_1.jpg',
  },
};
