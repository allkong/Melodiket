import TabButton from '@/components/molecules/item/TabButton';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onClick: (tabValue: string) => void;
  labelMap: Record<string, string>;
  color?: 'purple' | 'secondary';
  line?: boolean;
}

const Tabs = ({
  tabs,
  activeTab,
  onClick,
  labelMap,
  color = 'purple',
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
          color={color}
          line={line}
        />
      ))}
    </div>
  );
};

export default Tabs;
