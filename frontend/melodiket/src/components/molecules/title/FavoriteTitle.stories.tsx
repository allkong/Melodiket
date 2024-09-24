import type { Meta, StoryObj } from '@storybook/react';
import FavoriteTitle from './FavoriteTitle';

const meta: Meta<typeof FavoriteTitle> = {
  component: FavoriteTitle,
};

export default meta;
type Story = StoryObj<typeof FavoriteTitle>;

export const Default: Story = {
  args: {
    type: 'musician',
    total: 3,
  },
};
