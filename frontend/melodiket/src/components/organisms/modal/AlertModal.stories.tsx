import type { Meta, StoryObj } from '@storybook/react';
import AlertModal from './AlertModal';

const meta: Meta<typeof AlertModal> = {
  component: AlertModal,
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

export const Default: Story = {
  args: {
    type: 'warning',
    title: '예매를 취소하시겠습니까?',
    children: <p>예매 취소는 되돌릴 수 없습니다.</p>,
  },
};
