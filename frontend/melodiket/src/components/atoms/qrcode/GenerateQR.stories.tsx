import type { Meta, StoryObj } from '@storybook/react';
import GenerateQR from './GenerateQR';

const meta: Meta<typeof GenerateQR> = {
  component: GenerateQR,
};

export default meta;
type Story = StoryObj<typeof GenerateQR>;

export const Default: Story = {
  args: {
    value: '123e4567-e89b-12d3-a456-426614174000',
  },
};
