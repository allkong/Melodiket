import { LogoImage } from '@/public/icons';

interface SignUpLabelProps {
  mainLabel?: string;
  subLabel?: string;
}

const SignUpLabel = ({ mainLabel, subLabel }: SignUpLabelProps) => {
  return (
    <div>
      <LogoImage width="44" height="44" />
      <p className="whitespace-pre-line font-semibold text-2xl mt-3">
        {mainLabel}
      </p>
      <p className="mt-1 text-sm text-gray-500">{subLabel}</p>
    </div>
  );
};

export default SignUpLabel;
