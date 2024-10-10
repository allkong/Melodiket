import TabButton from '@/components/molecules/item/TabButton';

interface TabsProps {
  tabs: string[];
  activeTab: string | null;
  onClick: (tabValue: string) => void;
  labelMap: Record<string, string>;
  line?: boolean;
}

const Tabs = ({
  tabs,
  activeTab,
  onClick,
  labelMap,
  line = true,
}: TabsProps) => {
  return (
    <div className="flex w-full">
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          label={labelMap[tab]}
          isSelected={tab === activeTab}
          onClick={() => onClick(tab)}
          color="purple"
          line={line}
        />
      ))}
    </div>
  );
};

export default Tabs;
