import type { Meta, StoryObj } from '@storybook/react';
import MusicianInformation from './MusicianInformation';

const meta: Meta<typeof MusicianInformation> = {
  component: MusicianInformation,
};

export default meta;
type Story = StoryObj<typeof MusicianInformation>;

export const Default: Story = {
  args: {},
};
