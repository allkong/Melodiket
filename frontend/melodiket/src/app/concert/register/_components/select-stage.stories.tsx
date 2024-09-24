import type { Meta, StoryObj } from '@storybook/react';
import SelectStage from './stage-information';
const meta: Meta<typeof SelectStage> = {
  component: SelectStage,
};

export default meta;
type Story = StoryObj<typeof SelectStage>;

export const Default: Story = {
  args: {},
};
