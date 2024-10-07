import type { Meta, StoryObj } from '@storybook/react';
import PhotocardCard from './PhotocardCard';

const meta: Meta<typeof PhotocardCard> = {
  component: PhotocardCard,
};

export default meta;
type Story = StoryObj<typeof PhotocardCard>;

export const Default: Story = {
  args: {
    src: 'https://newsimg.sedaily.com/2024/07/03/2DBLHV9TUG_1.jpg',
    title: '윈터와 함께하는 사랑의 하츄핑 콘서트',
  },
};
