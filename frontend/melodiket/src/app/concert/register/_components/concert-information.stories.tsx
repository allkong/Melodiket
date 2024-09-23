import type { Meta, StoryObj } from '@storybook/react';
import ConcertInformation from './concert-information';

const meta: Meta<typeof ConcertInformation> = {
  component: ConcertInformation,
};

export default meta;
type Story = StoryObj<typeof ConcertInformation>;

export const Default: Story = {
  args: {},
};
