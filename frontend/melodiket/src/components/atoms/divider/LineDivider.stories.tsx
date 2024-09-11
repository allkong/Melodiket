import type { Meta, StoryObj } from '@storybook/react';
import LineDivider from './LineDivider';

const meta: Meta<typeof LineDivider> = {
    component: LineDivider,
  };

  export default meta;
type Story = StoryObj<typeof LineDivider>;

export const Default: Story = {
  args: {
    onClick: () => alert('구분선'),
  },
};