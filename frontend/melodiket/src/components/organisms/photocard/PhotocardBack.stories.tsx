import type { Meta, StoryObj } from '@storybook/react';
import PhotocardBack from './PhotocardBack';

const meta: Meta<typeof PhotocardBack> = {
  component: PhotocardBack,
};

export default meta;
type Story = StoryObj<typeof PhotocardBack>;

export const Default: Story = {
  args: {
    concertName: '윈터와 함께하는 사랑의 하츄핑 콘서트',
    startAt: '2024-10-05T10:44:48.330372',
    stageName: '고척스카이돔',
    seatRow: 2,
    seatCol: 12,
  },
};
