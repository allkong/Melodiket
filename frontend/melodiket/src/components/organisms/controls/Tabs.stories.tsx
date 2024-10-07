import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';
import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState(Object.keys(FAVORITE_TYPES)[0]);

    const handleTabClick = (tabValue: string) => {
      setActiveTab(tabValue);
    };

    return (
      <Tabs
        {...args}
        tabs={Object.keys(FAVORITE_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={FAVORITE_TYPES}
      />
    );
  },
};
