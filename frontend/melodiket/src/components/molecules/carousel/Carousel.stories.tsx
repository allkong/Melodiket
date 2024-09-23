import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';
import CarouselImage from './CarouselImage';
import CarouselIndicator from './CarouselIndicator';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const mockDatas = [
  {
    description: '기타 설명(참여 가수 목록 등)0',
    index: 0,
    location: '장소명',
    title: '콘서트 제목',
    startedAt: 'YYYY.MM.DD',
    image:
      'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
  },
  {
    description: '기타 설명(참여 가수 목록 등)1',
    index: 1,
    location: '장소명',
    title: '콘서트 제목',
    startedAt: 'YYYY.MM.DD',
    image:
      'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
  },
  {
    description: '기타 설명(참여 가수 목록 등)2',
    index: 2,
    location: '장소명',
    title: '콘서트 제목',
    startedAt: 'YYYY.MM.DD',
    image:
      'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
  },
  {
    description: '기타 설명(참여 가수 목록 등)3',
    index: 3,
    location: '장소명',
    title: '콘서트 제목',
    startedAt: 'YYYY.MM.DD',
    image:
      'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
  },
  {
    description: '기타 설명(참여 가수 목록 등)4',
    index: 4,
    location: '장소명',
    title: '콘서트 제목',
    startedAt: 'YYYY.MM.DD',
    image:
      'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
  },
];

export const Default: Story = {
  render: () => {
    return (
      <Carousel datas={mockDatas}>
        <CarouselImage image={mockDatas[0].image} />
        <CarouselIndicator datas={mockDatas} />
      </Carousel>
    );
  },
};
