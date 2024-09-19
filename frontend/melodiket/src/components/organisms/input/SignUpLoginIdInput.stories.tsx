import type { StoryObj, Meta } from '@storybook/react';
import { useState } from 'react';
import SignUpLoginIdInput from './SignUpLoginIdInput';

const meta: Meta<typeof SignUpLoginIdInput> = {
  component: SignUpLoginIdInput,
};

export default meta;

type Story = StoryObj<typeof SignUpLoginIdInput>;

export const Default: Story = {
  render: () => {
    const [loginId, setLoginId] = useState('');
    const [isLoginIdValid, setIsLoginIdValid] = useState(false);
    return (
      <SignUpLoginIdInput
        loginId={loginId}
        setLoginId={setLoginId}
        setIsLoginIdValid={setIsLoginIdValid}
      />
    );
  },
};
