import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    data: [
      {
        description: '누구일까?\n비밀의 콘서트',
        index: 0,
        location: '고척스카이돔',
        title: '콘서트 제목',
        ticketingAt: '2024.09.03',
        posterURL:
          'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
      },
      {
        description: '눈이 반짝',
        index: 1,
        location: '양재',
        title: '콘서트 제목',
        ticketingAt: '2024.09.03',
        posterURL:
          'https://www.harpersbazaar.co.kr/resources_old/online/org_online_image/3574a333-f251-4e64-8141-8861b11a1e17.jpg',
      },
    ],
    size: 'md',
    rounded: false,
  },
};
