import type { Meta, StoryObj } from '@storybook/react';
import PosterFrame from './PosterFrame';

const meta: Meta<typeof PosterFrame> = {
  component: PosterFrame,
};

export default meta;
type Story = StoryObj<typeof PosterFrame>;

export const Default: Story = {
  args: {
    src: 'https://i.namu.wiki/i/kurz0p1Tm_YMWDDeOzBkBd2P0odt2vWapIJHvcVd1KWEhEoLYP-oDj4ZmZxi2dlVMKsT8NcWsMJOIWtiA5rSaHEm2RqzkfrlhC3HdWg0dNjYwGaom5oOwcHFiSPYexcvRXDtY0dnuJnr9JvWXP0Cng.webp',
    size: 'sm',
  },
};
