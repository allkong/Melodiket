import type { StoryObj, Meta } from '@storybook/react';
import SignUpNameInput from './SignUpNameInput';
import { useState } from 'react';

const meta: Meta<typeof SignUpNameInput> = {
  component: SignUpNameInput,
};

export default meta;

type Story = StoryObj<typeof SignUpNameInput>;

export const Default: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [_, setIsNameValid] = useState(false);
    return (
      <SignUpNameInput
        name={name}
        setName={setName}
        setIsNameValid={setIsNameValid}
      />
    );
  },
};
