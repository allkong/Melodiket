import type { Meta, StoryObj } from '@storybook/react';
import LabelValutText from './LabelValutText';

const meta: Meta<typeof LabelValutText> = {
  component: LabelValutText,
};

export default meta;
type Story = StoryObj<typeof LabelValutText>;

export const Default: Story = {
  args: {
    label: '라벨',
    value: '2024.10.03',
  },
};
