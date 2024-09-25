import type { Meta, StoryObj } from '@storybook/react';
import ConcertCard from './ConcertCard';
import { useState } from 'react';
import { CONCERT_LIST } from '@/constants/concertMocks';

const meta: Meta<typeof ConcertCard> = {
  component: ConcertCard,
};

export default meta;
type Story = StoryObj<typeof ConcertCard>;

export const Default: Story = {
  args: CONCERT_LIST[0],
};

export const Favorite: Story = {
  render: () => {
    const [favorite, setFavorite] = useState(true);

    const data = CONCERT_LIST[0];

    const handleClickFavorite = (concertId: string) => {
      // 서버로 api 요청

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
