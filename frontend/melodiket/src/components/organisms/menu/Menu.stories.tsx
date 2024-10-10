import type { Meta, StoryObj } from '@storybook/react';
import useMenuStore from '@/store/menuStore';
import Menu from './Menu';
import React from 'react';

const meta: Meta<typeof Menu> = {
  component: Menu,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => {
    const { isOpen, setIsOpen } = useMenuStore();

    return (
      <div id="menu-portal">
        <Menu />
        <button onClick={() => setIsOpen(!isOpen)}>+</button>
      </div>
    );
  },
};
