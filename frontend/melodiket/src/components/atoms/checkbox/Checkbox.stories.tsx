import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { useRef, useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Rounded: Story = {
  args: {
    rounded: true,
  },
};

export const Controlled: Story = {
  name: 'with useState',
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (value: boolean) => {
      setIsChecked(value);
    };

    return <Checkbox isChecked={isChecked} onChange={handleChange} />;
  },
};

export const UnControlled: Story = {
  name: 'with useRef',
  render: () => {
    const ref = useRef<HTMLInputElement>(null);

    return <Checkbox ref={ref} />;
  },
};
