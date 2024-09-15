import type { Meta, StoryObj } from '@storybook/react';
import AllCheckbox from './AllCheckbox';
import { useState } from 'react';

const meta: Meta<typeof AllCheckbox> = {
  component: AllCheckbox,
};

export default meta;
type Story = StoryObj<typeof AllCheckbox>;

export const Default: Story = {
  args: {
    label: '전체 동의',
  },
};

export const Controlled: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (value: boolean) => {
      setIsChecked(value);
    };

    return (
      <AllCheckbox
        label="전체 동의"
        isChecked={isChecked}
        onChange={handleChange}
      />
    );
  },
};
