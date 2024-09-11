import type { StoryObj, Meta } from '@storybook/react';
import Input from '@/components/atoms/input/Input';
import { useRef, useState } from 'react';
import { fn } from '@storybook/test';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const UnControlled: Story = {
  name: 'with useRef',
  render: () => {
    const ref = useRef<HTMLInputElement>(null);

    return <Input ref={ref} placeholder="with useRef" />;
  },
};

export const Controlled: Story = {
  name: 'with useState',
  render: () => {
    const [value, setValue] = useState('');
    const handleChange = (value: string) => {
      setValue(value);
    };

    return (
      <Input
        value={value}
        onChange={handleChange}
        placeholder="with useState"
      />
    );
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    onClickEnter: fn(),
    placeholder: 'password',
  },
};
