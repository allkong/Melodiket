interface StageItemProps {
  title: string;
  content?: string;
}

const StageItem = ({ title, content }: StageItemProps) => {
  return (
    <div className="w-full p-4 bg-white">
      <p className="text-black font-semibold ml-2">{title}</p>
      {content && <p className="text-gray-300 ml-2">{content}</p>}
    </div>
  );
};

export default StageItem;
