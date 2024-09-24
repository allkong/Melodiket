import { LogoImage } from '@/public/icons';

interface TextBannerProps {
  title?: string;
  description?: string;
  hasLogo?: boolean;
}

const TextBanner = ({
  title,
  description,
  hasLogo = false,
}: TextBannerProps) => {
  return (
    <div>
      {hasLogo && <LogoImage width="44" height="44" />}
      <p className="whitespace-pre-line font-semibold text-2xl mt-3">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default TextBanner;
