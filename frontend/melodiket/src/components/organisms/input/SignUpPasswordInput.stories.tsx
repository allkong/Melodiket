import type { StoryObj, Meta } from '@storybook/react';
import SignUpPasswordInput from './SignUpPasswordInput';

const meta: Meta<typeof SignUpPasswordInput> = {
  component: SignUpPasswordInput,
};

export default meta;

type Story = StoryObj<typeof SignUpPasswordInput>;

export const UnControlled: Story = {};
