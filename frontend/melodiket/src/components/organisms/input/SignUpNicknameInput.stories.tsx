import type { StoryObj, Meta } from '@storybook/react';
import SignUpNicknameInput from './SignUpNicknameInput';
import { useState } from 'react';

const meta: Meta<typeof SignUpNicknameInput> = {
  component: SignUpNicknameInput,
};

export default meta;

type Story = StoryObj<typeof SignUpNicknameInput>;

export const Default: Story = {
  render: () => {
    const [nickname, setNickname] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isNicknameValid, setIsNicknameValid] = useState(true);
    return (
      <SignUpNicknameInput
        nickname={nickname}
        setNickname={setNickname}
        setIsNicknameValid={setIsNicknameValid}
      />
    );
  },
};
