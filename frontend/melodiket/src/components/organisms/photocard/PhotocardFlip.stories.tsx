import type { Meta, StoryObj } from '@storybook/react';
import PhotocardFlip from './PhotocardFlip';

const meta: Meta<typeof PhotocardFlip> = {
  component: PhotocardFlip,
};

export default meta;
type Story = StoryObj<typeof PhotocardFlip>;

export const Default: Story = {
  args: {
    src: 'https://newsimg.sedaily.com/2024/07/03/2DBLHV9TUG_1.jpg',
    concertName: '윈터와 함께하는 사랑의 하츄핑 콘서트',
    startAt: '2024-10-05T10:44:48.330372',
    stageName: '고척스카이돔',
    seatRow: 2,
    seatCol: 12,
  },
};
