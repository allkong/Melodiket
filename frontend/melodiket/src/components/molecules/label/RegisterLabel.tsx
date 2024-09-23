import { LogoImage } from '@/public/icons';

interface RegisterLabelProps {
  mainLabel?: string;
  subLabel?: string;
}

const RegisterLabel = ({ mainLabel, subLabel }: RegisterLabelProps) => {
  return (
    <div>
      <p className="whitespace-pre-line font-semibold text-2xl mt-3">
        {mainLabel}
      </p>
      <p className="mt-1 text-sm text-gray-500">{subLabel}</p>
    </div>
  );
};

export default RegisterLabel;
