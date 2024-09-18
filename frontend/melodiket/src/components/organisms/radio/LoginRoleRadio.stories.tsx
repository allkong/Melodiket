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
    const [selectedValue, setSelectedValue] = useState<string>();

    const handleChange = (value: string) => {
      setSelectedValue(value);
    };

    return (
      <div>
        <LoginRoleRadio
          mainLabel="관객"
          subLabel="뮤지션이 진행하는 공연을 즐기고 싶어요."
          name="group"
          checked={selectedValue === 'AUDIENCE'}
          onChange={handleChange}
          value="AUDIENCE"
        />
        <LoginRoleRadio
          mainLabel="뮤지션"
          subLabel="제 공연을 관객들에게 선보이고 싶어요."
          name="group"
          checked={selectedValue === 'MUSICIAN'}
          onChange={handleChange}
          value="MUSICIAN"
        />
        <LoginRoleRadio
          mainLabel="매니저"
          subLabel="제 공연장을 제공하고 싶어요."
          name="group"
          checked={selectedValue === 'MANAGER'}
          onChange={handleChange}
          value="MANAGER"
        />
      </div>
    );
  },
};
