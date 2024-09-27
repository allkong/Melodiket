import ArrowButton from '@/components/atoms/button/ArrowButton';

interface MyPageItemProps {
  label: string;
  content?: string;
  onClick?: () => void;
}

const MyPageItem = ({ label, content, onClick }: MyPageItemProps) => {
  return (
    <div onClick={onClick} className="w-full px-5 py-3 text-black bg-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{label}</p>
          {content && <p>{content}</p>}
        </div>
        {<ArrowButton direction="right" color="text-gray-400" />}
      </div>
    </div>
  );
};

export default MyPageItem;
