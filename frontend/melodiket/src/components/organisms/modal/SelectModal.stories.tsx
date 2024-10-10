import type { Meta, StoryObj } from '@storybook/react';
import SelectModal from './SelectModal';

const meta: Meta<typeof SelectModal> = {
  component: SelectModal,
};

export default meta;
type Story = StoryObj<typeof SelectModal>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <div className="flex flex-col">
          <p>안녕하세요</p>
          <p>환영합니다</p>
        </div>
      </div>
    ),
  },
};
