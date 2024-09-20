import { LogoImage } from '@/public/icons';

interface TextBannerProps {
  mainLabel?: string;
  subLabel?: string;
}

const TextBanner = ({ mainLabel, subLabel }: TextBannerProps) => {
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

export default TextBanner;
