import type { Meta, StoryObj } from '@storybook/react';
import ConcertCard from './ConcertCard';

const meta: Meta<typeof ConcertCard> = {
  component: ConcertCard,
};

export default meta;
type Story = StoryObj<typeof ConcertCard>;

export const Default: Story = {
  args: {
    concertUuid: '1',
    posterCid:
      'https://cdn2.ppomppu.co.kr/zboard/data3/2021/0421/m_20210421121541_cukpzbvs.jpg',
    title: 'あいみょん 2024 SSAFY ソウルキャンパス',
    stageName: '싸피서울캠퍼스',
    ticketingAt: '2024.09.03',
  },
};
