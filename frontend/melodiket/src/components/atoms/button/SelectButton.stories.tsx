import type { Meta, StoryObj } from '@storybook/react';
import SelectButton from './SelectButton';

const meta: Meta<typeof SelectButton> = {
  component: SelectButton,
};

export default meta;
type Story = StoryObj<typeof SelectButton>;

export const Default: Story = {
  args: {
    options: [
      {
        value: 'registration',
        label: '등록순',
      },
      {
        value: 'latest',
        label: '최신순',
      },
    ],
  },
};
