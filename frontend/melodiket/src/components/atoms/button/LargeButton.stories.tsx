import type { Meta, StoryObj } from '@storybook/react';
import LargeButton from './LargeButton';
import { fn } from '@storybook/test';

const meta: Meta<typeof LargeButton> = {
  component: LargeButton,
  argTypes: {
    label: {
      description: '버튼에 보여줄 라벨',
      type: 'string',
    },
    icon: {
      options: ['default', 'qrCode', 'ticket'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LargeButton>;

export const Default: Story = {
  args: {
    label: '다음',
    onClick: fn(),
    disabled: true,
  },
};

export const Icon: Story = {
  argTypes: {
    label: {
      description: '버튼에 보여줄 라벨',
      type: 'string',
    },
    icon: {
      options: ['default', 'qrCode', 'ticket'],
    },
  },
  args: {
    label: 'QR코드 확인',
    disabled: true,
    icon: 'qrCode',
  },
};
