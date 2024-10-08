interface SmallButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SmallButton = ({ label, onClick }: SmallButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 text-xs bg-purple-100 border text-primary rounded-xl border-primary w-fit"
    >
      {label}
    </button>
  );
};

export default SmallButton;
