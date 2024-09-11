import type { Meta, StoryObj } from '@storybook/react';
import OptionButton from './OptionButton';

const meta: Meta<typeof OptionButton> = {
  component: OptionButton,
};

export default meta;
type Story = StoryObj<typeof OptionButton>;

export const Default: Story = {
  args: {
    label: '가나다순',
    // onClick: () => alert('클릭'),
  },
};
