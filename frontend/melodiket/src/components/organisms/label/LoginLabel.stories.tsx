import type { Meta, StoryObj } from '@storybook/react';
import LoginLabel from './LoginLabel';

const meta: Meta<typeof LoginLabel> = {
  component: LoginLabel,
};

export default meta;
type Story = StoryObj<typeof LoginLabel>;

export const Default: Story = {
  args: {
    mainLabel: '멜로디켓 회원가입을 위해\n약관에 동의해 주세요',
    subLabel: '멜로디켓 서비스는 블록체인을 사용한 서비스에요',
  },
};
