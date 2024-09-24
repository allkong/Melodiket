import type { Meta, StoryObj } from '@storybook/react';
import ApprovalButton from './ApprovalButton';

const meta: Meta<typeof ApprovalButton> = {
  component: ApprovalButton,
};

export default meta;
type Story = StoryObj<typeof ApprovalButton>;

export const Default: Story = {
  args: {
    label: '승인',
  },
};
