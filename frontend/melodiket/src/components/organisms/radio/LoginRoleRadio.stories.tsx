import type { Meta, StoryObj } from '@storybook/react';
import LoginRoleRadio from './LoginRoleRadio';
import { useState } from 'react';

const meta: Meta<typeof LoginRoleRadio> = {
  component: LoginRoleRadio,
};

export default meta;
type Story = StoryObj<typeof LoginRoleRadio>;

export const Default: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (value: boolean) => {
      setIsChecked(value);
    };

    return (
      <LoginRoleRadio
        isChecked={isChecked}
        onChange={handleChange}
        mainLabel="역할"
        subLabel="역할 설명"
      />
    );
  },
};

export const Groups: Story = {
  render: () => {
    return (
      <>
        <LoginRoleRadio group="role" mainLabel="1" subLabel="test" />
        <LoginRoleRadio group="role" mainLabel="2" subLabel="test" />
        <LoginRoleRadio group="role" mainLabel="3" subLabel="test" />
      </>
    );
  },
};
