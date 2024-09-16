import { Note } from '@/public/icons';

interface LoginLabelProps {
  mainLabel?: string;
  subLabel?: string;
}

const LoginLabel = ({ mainLabel, subLabel }: LoginLabelProps) => {
  return (
    <div>
      <Note />
      <p className="whitespace-pre-line font-semibold text-2xl mt-3">
        {mainLabel}
      </p>
      <p className="mt-1 text-sm text-gray-500">{subLabel}</p>
    </div>
  );
};

export default LoginLabel;
