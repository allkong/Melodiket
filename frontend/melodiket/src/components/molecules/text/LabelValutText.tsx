interface LabelValueTextProps {
  label?: string;
  value?: string;
}

const LabelValueText = ({ label, value }: LabelValueTextProps) => {
  return (
    <div className="flex gap-3 w-full text-xs font-medium">
      <p className="min-w-16">{label}</p>
      <p className="flex-grow w-0">{value}</p>
    </div>
  );
};

export default LabelValueText;
