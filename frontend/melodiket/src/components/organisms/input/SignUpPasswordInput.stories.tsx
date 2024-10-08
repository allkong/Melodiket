import type { StoryObj, Meta } from '@storybook/react';
import SignUpPasswordInput from './SignUpPasswordInput';
import { useState } from 'react';

const meta: Meta<typeof SignUpPasswordInput> = {
  component: SignUpPasswordInput,
};

export default meta;

type Story = StoryObj<typeof SignUpPasswordInput>;

export const Default: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    return (
      <SignUpPasswordInput
        password={password}
        setPassword={setPassword}
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
        setIsPasswordValid={setIsPasswordValid}
      />
    );
  },
};
