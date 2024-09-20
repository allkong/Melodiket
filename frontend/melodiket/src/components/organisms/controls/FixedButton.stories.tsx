import type { Meta, StoryObj } from '@storybook/react';
import FixedButton from './FixedButton';

const meta: Meta<typeof FixedButton> = {
  component: FixedButton,
};

export default meta;
type Story = StoryObj<typeof FixedButton>;

export const Default: Story = {
  args: {
    label: '다음',
    onClick: () => {},
    disabled: true,
  },
};
