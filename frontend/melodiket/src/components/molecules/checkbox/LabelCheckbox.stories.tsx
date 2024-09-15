import type { Meta, StoryObj } from '@storybook/react';
import LabelCheckbox from './LabelCheckbox';
import { useState } from 'react';

const meta: Meta<typeof LabelCheckbox> = {
  component: LabelCheckbox,
};

export default meta;
type Story = StoryObj<typeof LabelCheckbox>;

export const Default: Story = {
  args: {
    label: '만 14세 이상입니다.',
  },
};

export const Controlled: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (value: boolean) => {
      setIsChecked(value);
    };

    return (
      <LabelCheckbox
        label="만 14세 이상입니다."
        isChecked={isChecked}
        onChange={handleChange}
      />
    );
  },
};
