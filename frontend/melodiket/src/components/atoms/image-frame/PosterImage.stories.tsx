import type { Meta, StoryObj } from '@storybook/react';
import PosterImage from './PosterImage';

const meta: Meta<typeof PosterImage> = {
  component: PosterImage,
};

export default meta;
type Story = StoryObj<typeof PosterImage>;

export const Default: Story = {
  args: {},
};
