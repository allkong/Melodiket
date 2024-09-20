import type { Meta, StoryObj } from '@storybook/react';
import TextBanner from './TextBanner';

const meta: Meta<typeof TextBanner> = {
  component: TextBanner,
};

export default meta;
type Story = StoryObj<typeof TextBanner>;

export const Default: Story = {
  args: {
    title: '멜로디켓 회원가입을 위해\n약관에 동의해 주세요',
    description: '멜로디켓 서비스는 블록체인을 사용한 서비스에요',
    hasLogo: true,
  },
};
