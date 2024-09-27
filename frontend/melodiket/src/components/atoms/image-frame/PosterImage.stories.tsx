import type { Meta, StoryObj } from '@storybook/react';
import PosterImage from './PosterImage';

const meta: Meta<typeof PosterImage> = {
  component: PosterImage,
};

export default meta;
type Story = StoryObj<typeof PosterImage>;

export const Default: Story = {
  args: {
    src: 'https://i.namu.wiki/i/kurz0p1Tm_YMWDDeOzBkBd2P0odt2vWapIJHvcVd1KWEhEoLYP-oDj4ZmZxi2dlVMKsT8NcWsMJOIWtiA5rSaHEm2RqzkfrlhC3HdWg0dNjYwGaom5oOwcHFiSPYexcvRXDtY0dnuJnr9JvWXP0Cng.webp',
    size: 'sm',
  },
};
