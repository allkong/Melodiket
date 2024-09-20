interface AlertLabelProps {
  label?: string;
}

const AlertLabel = ({ label }: AlertLabelProps) => {
  return <p className="text-red-400">{label}</p>;
};

export default AlertLabel;
