import type { Meta, StoryObj } from '@storybook/react';
import BackgroundImage from './BackgroundImage';

const meta: Meta<typeof BackgroundImage> = {
  component: BackgroundImage,
};

export default meta;
type Story = StoryObj<typeof BackgroundImage>;

export const Default: Story = {
  args: {
    src: 'https://i.namu.wiki/i/PcRFH2yIjsqHjXPF3_MUtPT_KotbREADRzGZh9_XXktYOjHQxUm4fRR1xMz-_HsztNH78nTSUJ2ROzFNgYUkXUWXV-mJf-G1Ew4pGyu5ZXw_Of_wxUtEJwtbygJ5F_0pDSBTldSu6Zwd1D_-5SJLPQ.webp',
  },
};