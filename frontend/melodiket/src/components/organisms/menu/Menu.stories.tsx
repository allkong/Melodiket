import type { Meta, StoryObj } from '@storybook/react';
import useMenuStore from '@/store/menuStore';
import Menu from './Menu';
import React from 'react';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';
import MenuProfile from './MenuProfile';
import MenuHeader from './MenuHeader';

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => {
    const { isOpen, setIsOpen } = useMenuStore();

    return (
      <div id="menu-portal">
        <Menu>
          <MenuHeader />
          <MenuProfile />
          <MenuDivider />
          <MenuItem />
          <MenuItem />
          <MenuDivider />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuDivider />
          <MenuItem />
          <MenuItem />
        </Menu>
        <button onClick={() => setIsOpen(!isOpen)}>+</button>
      </div>
    );
  },
};
