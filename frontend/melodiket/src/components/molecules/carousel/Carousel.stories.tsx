import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';
import { CAROUSEL_DATAS } from '@/constants/concertList';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    datas: CAROUSEL_DATAS,
    size: 'md',
    rounded: false,
  },
};
