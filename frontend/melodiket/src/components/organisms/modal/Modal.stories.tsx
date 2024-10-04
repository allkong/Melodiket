import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    type: 'warning',
    title: '예매를 취소하시겠습니까?',
    children: <p>예매 취소는 되돌릴 수 없습니다.</p>,
  },
};
