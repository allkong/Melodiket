import type { Meta, StoryObj } from '@storybook/react';
import KakaoShareButton from './KakaoShareButton';

const meta: Meta<typeof KakaoShareButton> = {
  component: KakaoShareButton,
};

export default meta;
type Story = StoryObj<typeof KakaoShareButton>;

export const Default: Story = {
  args: {},
};
