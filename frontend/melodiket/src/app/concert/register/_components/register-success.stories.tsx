import type { Meta, StoryObj } from '@storybook/react';
import RegisterSuccess from './register-success';

const meta: Meta<typeof RegisterSuccess> = {
  component: RegisterSuccess,
};

export default meta;
type Story = StoryObj<typeof RegisterSuccess>;

export const Default: Story = {
  args: {},
};
