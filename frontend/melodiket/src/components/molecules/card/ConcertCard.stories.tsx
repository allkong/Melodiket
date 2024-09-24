import type { Meta, StoryObj } from '@storybook/react';
import ConcertCard from './ConcertCard';
import { useState } from 'react';

const meta: Meta<typeof ConcertCard> = {
  component: ConcertCard,
};

export default meta;
type Story = StoryObj<typeof ConcertCard>;

export const Default: Story = {
  args: {
    href: '/',
    concertId: '',
    musicians: ['빈지노', '한로로'],
    stage: '고척스카이돔',
    ticketingAt: '2024.09.03',
    posterURL:
      'https://i.namu.wiki/i/LjoRsrSGtYk1tm1yXk0f5cNPrqiz0bSHOdVG5Fnv-jTwtqYlco2usYxXGMGQ23qbA0IJEbjuHHVX50NBWYIT6YTQzgzn3k-eKmX08EXGsjfvKgdOkCLXv4yUfjJkL7B1ICgJ3Khrsq-Y79G0GRH-Bg.webp',
  },
};

export const Favorite: Story = {
  render: () => {
    const [favorite, setFavorite] = useState(true);

    const data = {
      concertId: '',
      musicians: ['빈지노', '한로로'],
      stage: '고척스카이돔',
      ticketingAt: '2024.09.03',
      posterURL:
        'https://i.namu.wiki/i/LjoRsrSGtYk1tm1yXk0f5cNPrqiz0bSHOdVG5Fnv-jTwtqYlco2usYxXGMGQ23qbA0IJEbjuHHVX50NBWYIT6YTQzgzn3k-eKmX08EXGsjfvKgdOkCLXv4yUfjJkL7B1ICgJ3Khrsq-Y79G0GRH-Bg.webp',
    };

    const handleClickFavorite = (concertId: string) => {
      // 서버로 api 요청
      console.log(concertId);

      // api 요청 결과
      const response = !favorite;
      setFavorite(response);

      alert(`응답 결과 : ${response}`);
    };

    return (
      <ConcertCard
        {...data}
        isFavorite={favorite}
        onClickFavorite={handleClickFavorite}
      />
    );
  },
};
