import { STICKER_CATEGORIES } from '@/constants/photocard';
import { Sticker } from '@/types/photocard';
import Image from 'next/image';

export const createStickerArray = () => {
  const categories = Object.keys(STICKER_CATEGORIES);
  const stickers: Sticker[] = [];

  // 각 카테고리별로 이미지를 가져오기
  categories.forEach((category) => {
    // 이미지 파일명 리스트를 가져옴
    for (let i = 1; i <= 5; i++) {
      // 예시로 각 카테고리당 5개 이미지라고 가정
      stickers.push({
        name: `${category}-${i}`, // 스티커 이름 생성
        category: category, // 카테고리명
        image: (
          <Image
            src={`/stickers/${category}/${i}.png`}
            alt="sticker"
            fill
            width={80}
            height={80}
          />
        ),
      });
    }
  });

  return stickers;
};

// 스티커 배열 생성
export const stickers: Sticker[] = createStickerArray();
