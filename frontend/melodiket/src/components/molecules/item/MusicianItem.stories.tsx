import type { Meta, StoryObj } from '@storybook/react';
import MusicianItem from './MusicianItem';

const meta: Meta<typeof MusicianItem> = {
  component: MusicianItem,
};

export default meta;
type Story = StoryObj<typeof MusicianItem>;

export const Default: Story = {
  args: {
    href: '/',
    src: 'https://i.namu.wiki/i/PcRFH2yIjsqHjXPF3_MUtPT_KotbREADRzGZh9_XXktYOjHQxUm4fRR1xMz-_HsztNH78nTSUJ2ROzFNgYUkXUWXV-mJf-G1Ew4pGyu5ZXw_Of_wxUtEJwtbygJ5F_0pDSBTldSu6Zwd1D_-5SJLPQ.webp',
    musicianName: '장원영',
    favoriteCount: 20,
  },
};
