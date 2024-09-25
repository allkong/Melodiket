import type { Meta, StoryObj } from '@storybook/react';
import CarouselIndicator from './CarouselIndicator';

const meta: Meta<typeof CarouselIndicator> = {
  component: CarouselIndicator,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 50, marginTop: 25 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CarouselIndicator>;

export const Default: Story = {
  args: {
    size: 5,
    currentIndex: 0,
    onClick: () => {},
  },
};
