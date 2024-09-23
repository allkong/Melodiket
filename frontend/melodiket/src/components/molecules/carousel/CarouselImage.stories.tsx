import type { Meta, StoryObj } from '@storybook/react';
import CarouselImage from './CarouselImage';

const meta: Meta<typeof CarouselImage> = {
  component: CarouselImage,
};

export default meta;
type Story = StoryObj<typeof CarouselImage>;

export const Default: Story = {
  args: {
    image:
      'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
  },
};
