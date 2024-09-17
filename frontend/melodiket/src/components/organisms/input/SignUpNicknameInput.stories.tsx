import type { StoryObj, Meta } from '@storybook/react';
import SignUpNicknameInput from './SignUpNicknameInput';

const meta: Meta<typeof SignUpNicknameInput> = {
  component: SignUpNicknameInput,
};

export default meta;

type Story = StoryObj<typeof SignUpNicknameInput>;

export const UnControlled: Story = {};
