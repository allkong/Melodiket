import TabButton from '@/components/molecules/item/TabButton';

interface ScrollTabsProps {
  tabs: string[];
  activeTab: string;
  onClick: (tabValue: string) => void;
  labelMap: Record<string, string>;
  line?: boolean;
}

const ScrollTabs = ({
  tabs,
  activeTab,
  onClick,
  labelMap,
  line = true,
}: ScrollTabsProps) => {
  return (
    <div className="flex w-full overflow-x-auto whitespace-nowrap py-1">
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          label={labelMap[tab]}
          isSelected={tab === activeTab}
          onClick={() => onClick(tab)}
          color={'secondary'}
          line={line}
        />
      ))}
    </div>
  );
};

export default ScrollTabs;
