import type { Meta, StoryObj } from '@storybook/react';
import ConcertCard from './ConcertCard';

const meta: Meta<typeof ConcertCard> = {
  component: ConcertCard,
};

export default meta;
type Story = StoryObj<typeof ConcertCard>;

export const Default: Story = {};
