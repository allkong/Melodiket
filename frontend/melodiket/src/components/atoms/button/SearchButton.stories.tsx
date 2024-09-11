import type { Meta, StoryObj } from '@storybook/react';
import SearchButton from './SearchButton';

const meta: Meta<typeof SearchButton> = {
  component: SearchButton,
};

export default meta;
type Story = StoryObj<typeof SearchButton>;

export const Default: Story = {
  args: {
    onClick: () => alert('검색'),
  },
};
