interface TicketFrameProps {
  src: string;
}

const TicketFrame = ({ src }: TicketFrameProps) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 302 604" fill="none">
      <defs>
        <pattern
          id="imagePattern"
          patternUnits="objectBoundingBox" // 패턴의 상대적 크기 설정
          width="1"
          height="1"
          preserveAspectRatio="xMidYMid slice" // 이미지 비율 유지하며 꽉 채움
        >
          {/* 이미지 크기가 패턴에 맞게 조절됨 */}
          <image
            href={src}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice" // 이미지를 중앙에 맞추고 잘릴 수 있게 설정
          />
        </pattern>
      </defs>
      <path
        fill="url(#imagePattern)"
        d="M38.8278 0H21.572V0.000608444C21.572 11.9142 11.9142 21.572 0.000608444 21.572H0V582.429H0.000608444C11.914 582.429 21.5717 592.087 21.572 604H38.8278V603.999C38.8278 599.233 42.691 595.37 47.4564 595.37C52.2218 595.37 56.085 599.233 56.085 603.999V604H73.3427V603.999C73.3427 599.233 77.2059 595.37 81.9713 595.37C86.7367 595.37 90.5999 599.233 90.5999 603.999V604H107.856V603.999C107.856 599.233 111.719 595.37 116.484 595.37C121.25 595.37 125.113 599.233 125.113 603.999V604H142.371V603.999C142.371 599.233 146.234 595.37 150.999 595.37C155.765 595.37 159.628 599.233 159.628 603.999V604H176.884V603.999C176.884 599.233 180.748 595.37 185.513 595.37C190.278 595.37 194.142 599.233 194.142 603.999V604H211.398V603.999C211.398 599.233 215.262 595.37 220.027 595.37C224.792 595.37 228.656 599.233 228.656 603.999V604H245.912V603.999C245.912 599.233 249.775 595.37 254.541 595.37C259.306 595.37 263.169 599.233 263.169 603.999V604H280.429C280.43 592.087 290.087 582.43 302 582.429V21.572C290.087 21.5717 280.429 11.914 280.429 0.000608444V0H263.169C263.169 4.76482 259.306 8.62726 254.541 8.62726C249.776 8.62726 245.913 4.76482 245.912 0H228.656C228.655 4.76482 224.792 8.62726 220.027 8.62726C215.262 8.62726 211.399 4.76482 211.398 0H194.142C194.141 4.76482 190.278 8.62726 185.513 8.62726C180.748 8.62726 176.885 4.76482 176.884 0H159.628C159.627 4.76482 155.764 8.62726 150.999 8.62726C146.234 8.62726 142.371 4.76482 142.371 0H125.113C125.112 4.76482 121.249 8.62726 116.484 8.62726C111.719 8.62726 107.856 4.76482 107.856 0H90.5999C90.5992 4.76482 86.7363 8.62726 81.9713 8.62726C77.2063 8.62726 73.3435 4.76482 73.3427 0H56.085C56.0843 4.76482 52.2214 8.62726 47.4564 8.62726C42.6914 8.62726 38.8285 4.76482 38.8278 0Z"
      />
    </svg>
  );
};

export default TicketFrame;