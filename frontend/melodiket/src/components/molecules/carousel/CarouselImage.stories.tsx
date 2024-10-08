import type { Meta, StoryObj } from '@storybook/react';
import CarouselImage from './CarouselImage';

const meta: Meta<typeof CarouselImage> = {
  component: CarouselImage,
};

export default meta;
type Story = StoryObj<typeof CarouselImage>;

export const Default: Story = {
  args: {
    data: {
      description: '누구일까?\n비밀의 콘서트',
      stageName: '고척스카이돔',
      title: '콘서트 제목',
      ticketingAt: '2024.09.03',
      posterCid:
        'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
    },
  },
};
