import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import TabButton from '@/components/molecules/item/TabButton';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onClick: (tabValue: string) => void;
  labelMap: Record<string, string>;
}

const Tabs = ({ tabs, activeTab, onClick, labelMap }: TabsProps) => {
  return (
    <div className="flex w-full border-b border-gray-200">
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          label={labelMap[tab]}
          isSelected={tab === activeTab}
          onClick={() => onClick(tab)}
        />
      ))}
    </div>
  );
};

export default Tabs;
