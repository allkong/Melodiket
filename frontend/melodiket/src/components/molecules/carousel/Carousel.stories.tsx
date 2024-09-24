import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const mockDatas = [
  {
    description: '누구일까?\n비밀의 콘서트',
    index: 0,
    location: '고척스카이돔',
    title: '콘서트 제목',
    startedAt: '2024.09.03',
    image:
      'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
  },
  {
    description: '눈이 반짝',
    index: 1,
    location: '양재',
    title: '콘서트 제목',
    startedAt: '2024.09.03',
    image:
      'https://www.harpersbazaar.co.kr/resources_old/online/org_online_image/3574a333-f251-4e64-8141-8861b11a1e17.jpg',
  },
  {
    description: '눈 찌릿',
    index: 2,
    location: '싸피 서울캠퍼스',
    title: '콘서트 제목',
    startedAt: '2024.09.03',
    image:
      'https://i.namu.wiki/i/3KxPCWTEPGKYT-jBZ8AcQY2AaTOEXlgBkxr-oSAzdfXrsassqyff6qYjHZqNODbB5p8PWKk_kmjfNC62z8OTww.webp',
  },
  {
    description: '내가 최고',
    index: 3,
    location: '싸피 식당',
    title: '콘서트 제목',
    startedAt: '2024.09.03',
    image:
      'https://blog.kakaocdn.net/dn/bBn3p7/btsEWg4ENQw/nx4lRKblsQ2gATzK8temw0/img.jpg',
  },
  {
    description: '하트',
    index: 4,
    location: '텐퍼센트 커피',
    title: '콘서트 제목',
    startedAt: '2024.09.03',
    image:
      'https://thumbnail.laftel.net/items/home/acc5935b-2657-423c-bdbc-39a461b6fb4e.jpg?webp=0&w=760&c=0%2C0%2C640%2C360',
  },
];

export const Default: Story = {
  render: () => {
    return <Carousel datas={mockDatas} size="lg" />;
  },
};
