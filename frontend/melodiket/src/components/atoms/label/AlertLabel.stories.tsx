import type { StoryObj, Meta } from '@storybook/react';
import AlertLabel from './AlertLabel';

const meta: Meta<typeof AlertLabel> = {
  component: AlertLabel,
};

export default meta;

type Story = StoryObj<typeof AlertLabel>;

export const Default: Story = {};
