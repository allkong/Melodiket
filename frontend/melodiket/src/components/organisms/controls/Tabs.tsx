import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import TabButton from '@/components/molecules/item/TabButton';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onClick: (tabValue: string) => void;
}

const Tabs = ({ tabs, activeTab, onClick }: TabsProps) => {
  return (
    <div className="flex w-full border-b border-gray-200">
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          label={FAVORITE_TYPES[tab as keyof typeof FAVORITE_TYPES]}
          isSelected={tab === activeTab}
          onClick={() => onClick(tab)}
        />
      ))}
    </div>
  );
};

export default Tabs;
