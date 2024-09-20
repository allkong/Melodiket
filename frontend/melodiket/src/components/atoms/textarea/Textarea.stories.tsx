import type { StoryObj, Meta } from '@storybook/react';
import Textarea from '@/components/atoms/textarea/Textarea';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return <Textarea value={value} onChange={handleChange} limit={100} />;
  },
};

export const Size: Story = {
  args: {
    value: '',
    limit: 100,
    rows: 3,
  },
};
