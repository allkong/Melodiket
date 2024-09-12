import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (value: boolean) => {
      setIsChecked(value);
    };

    return <Checkbox isChecked={isChecked} onChange={handleChange} />;
  },
};

export const Rounded: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (value: boolean) => {
      setIsChecked(value);
    };

    return <Checkbox isChecked={isChecked} onChange={handleChange} rounded />;
  },
};
