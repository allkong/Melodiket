import TabButton from '@/components/molecules/item/TabButton';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onClick: (tabValue: string) => void;
  labelMap: Record<string, string>;
}

const Tabs = ({ tabs, activeTab, onClick, labelMap }: TabsProps) => {
  return (
    <div className="flex w-full">
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
