import type { Meta, StoryObj } from '@storybook/react';
import RegisterLabel from './RegisterLabel';

const meta: Meta<typeof RegisterLabel> = {
  component: RegisterLabel,
};

export default meta;
type Story = StoryObj<typeof RegisterLabel>;

export const Default: Story = {
  args: {
    mainLabel: '공연 등록을 위해 공연 정보를\n입력해주세요',
    subLabel: '기본 정보를 입력해주세요',
  },
};
