import type { Meta, StoryObj } from '@storybook/react';
import ScrollTabs from './ScrollTabs';
import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import { useState } from 'react';

const meta: Meta<typeof ScrollTabs> = {
  component: ScrollTabs,
};

export default meta;
type Story = StoryObj<typeof ScrollTabs>;

export const Default: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState(Object.keys(FAVORITE_TYPES)[0]);

    const handleTabClick = (tabValue: string) => {
      setActiveTab(tabValue);
    };

    return (
      <ScrollTabs
        {...args}
        tabs={Object.keys(FAVORITE_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={FAVORITE_TYPES}
      />
    );
  },
};
