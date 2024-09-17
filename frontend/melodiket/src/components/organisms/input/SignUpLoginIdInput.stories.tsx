import type { StoryObj, Meta } from '@storybook/react';
import SignUpLoginIdInput from './SignUpLoginIdInput';

const meta: Meta<typeof SignUpLoginIdInput> = {
  component: SignUpLoginIdInput,
};

export default meta;

type Story = StoryObj<typeof SignUpLoginIdInput>;

export const UnControlled: Story = {};
