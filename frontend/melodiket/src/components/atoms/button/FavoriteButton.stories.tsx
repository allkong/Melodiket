import type { Meta, StoryObj } from '@storybook/react';
import favoriteButton from './FavoriteButton';

const meta: Meta<typeof favoriteButton> = {
  component: favoriteButton,
};

export default meta;
type Story = StoryObj<typeof favoriteButton>;

export const Default: Story = {
  args: {},
};
