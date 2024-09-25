import type { Meta, StoryObj } from '@storybook/react';
import FileInput from './FileInput';

const meta: Meta<typeof FileInput> = {
  component: FileInput,
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {},
};
