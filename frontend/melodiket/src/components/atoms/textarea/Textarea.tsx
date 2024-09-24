import { ChangeEvent } from 'react';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  limit?: number;
}

const Textarea = ({
  value,
  onChange,
  placeholder,
  rows = 8,
  limit,
}: TextareaProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (limit && value.length > limit) {
      return;
    }
    onChange(value);
  };

  return (
    <div className="w-full flex flex-col items-end">
      <textarea
        className="overflow-hidde w-full resize-none px-5 py-3 outline-none rounded-2xl border"
        value={value}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
      ></textarea>
      {limit && (
        <p className="text-gray-400 text-xs">
          {value.length ?? 0} / {limit}
        </p>
      )}
    </div>
  );
};

export default Textarea;
