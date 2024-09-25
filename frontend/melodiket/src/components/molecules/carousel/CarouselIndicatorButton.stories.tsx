import type { Meta, StoryObj } from '@storybook/react';
import CarouselButton from './CarouselIndicatorButton';

const meta: Meta<typeof CarouselButton> = {
  component: CarouselButton,
};

export default meta;
type Story = StoryObj<typeof CarouselButton>;

export const Default: Story = {
  args: {},
};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};
