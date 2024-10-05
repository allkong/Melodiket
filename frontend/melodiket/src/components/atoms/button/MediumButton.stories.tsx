import type { Meta, StoryObj } from '@storybook/react';
import MediumButton from './MediumButton';

const meta: Meta<typeof MediumButton> = {
  component: MediumButton,
};

export default meta;
type Story = StoryObj<typeof MediumButton>;

export const Default: Story = {
  args: {
    label: '확인',
    color: 'primary',
    onClick: () => alert('이동'),
  },
};
