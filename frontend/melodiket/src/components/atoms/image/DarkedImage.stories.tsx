import type { Meta, StoryObj } from '@storybook/react';
import DarkedImage from './DarkedImage';

const meta: Meta<typeof DarkedImage> = {
  component: DarkedImage,
  decorators: (Story) => {
    return (
      <div style={{ width: 500, height: 300 }}>
        <Story />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof DarkedImage>;

export const Default: Story = {
  args: {
    src: 'https://sirup.online/wp/wp-content/uploads/2024/09/%E2%98%85%E2%98%85-360x480px%EC%82%AC%EC%9D%B4%EC%A6%88-RGB.jpg',
  },
};
