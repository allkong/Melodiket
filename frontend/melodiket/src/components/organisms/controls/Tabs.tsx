import TabButton from '@/components/molecules/item/TabButton';
import { FAVORITE_TYPE } from '@/constants/favoriteType';

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
          label={FAVORITE_TYPE[tab as keyof typeof FAVORITE_TYPE]}
          isSelected={tab === activeTab}
          onClick={() => onClick(tab)}
        />
      ))}
    </div>
  );
};

export default Tabs;
