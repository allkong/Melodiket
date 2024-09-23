import type { Meta, StoryObj } from '@storybook/react';
import SignUpRoleRadio from './SignUpRoleRadio';
import { useState } from 'react';

const meta: Meta<typeof SignUpRoleRadio> = {
  component: SignUpRoleRadio,
};

export default meta;
type Story = StoryObj<typeof SignUpRoleRadio>;

export const Default: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string>();

    const handleChange = (value: string) => {
      setSelectedValue(value);
    };

    return (
      <div>
        <SignUpRoleRadio
          title="관객"
          description="뮤지션이 진행하는 공연을 즐기고 싶어요."
          name="group"
          checked={selectedValue === 'AUDIENCE'}
          onChange={handleChange}
          value="AUDIENCE"
        />
        <SignUpRoleRadio
          title="뮤지션"
          description="제 공연을 관객들에게 선보이고 싶어요."
          name="group"
          checked={selectedValue === 'MUSICIAN'}
          onChange={handleChange}
          value="MUSICIAN"
        />
        <SignUpRoleRadio
          title="매니저"
          description="제 공연장을 제공하고 싶어요."
          name="group"
          checked={selectedValue === 'MANAGER'}
          onChange={handleChange}
          value="MANAGER"
        />
      </div>
    );
  },
};
