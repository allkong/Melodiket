import type { SignUpPolicy, SignUpRole } from '@/types/signUp';

// 회원가입 약관
export const SIGN_UP_POLICY_DATAS: SignUpPolicy[] = [
  { key: 0, label: '[필수] 만 14세 이상입니다.', isEssential: true },
  { key: 1, label: '[필수] 이용약관, 개인정보 수집/이용', isEssential: true },
  { key: 2, label: '[선택] 위치 기반 서비스 이용', isEssential: false },
  { key: 3, label: '[선택] 홍보성 정보 수신', isEssential: false },
] as const;

// 회원가입 역할
export const SIGN_UP_ROLE_DATAS: SignUpRole[] = [
  {
    key: 0,
    title: '관객',
    description: '뮤지션이 진행하는 공연을 즐기고 싶어요.',
    value: 'audience',
  },
  {
    key: 1,
    title: '뮤지션',
    description: '제 공연을 관객들에게 선보이고 싶어요.',
    value: 'musician',
  },
  {
    key: 2,
    title: '매니저',
    description: '제 공연장을 제공하고 싶어요.',
    value: 'stage-manager',
  },
] as const;

// 회원가입 글자수 제한
export const SIGN_UP_DATA_LENGTH_LIMITS = {
  MIN_NICKNAME_LENGTH: 2,
  MAX_NICKNAME_LENGTH: 20,
  MIN_LOGIN_ID_LENGTH: 5,
  MAX_LOGIN_ID_LENGTH: 20,
  MIN_PASSWORD_LENGTH: 5,
  MAX_PASSWORD_LENGTH: 20,
} as const;

export const BEFORE_LOGIN_FAVORITE_MUSICIANS = [
  {
    uuid: '350930b9-efbc-4e8c-b08d-b8d990e38c32',
    loginId: 'hyukohofficial',
    role: 'ROLE_MUSICIAN',
    nickname: '혁오',
    description: '안녕하세요 저희는 혁오입니다, 감사합니다.',
    registeredAt: '2024-10-11T00:54:53.204554',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/75a93522eecd4d2d8354bb3e21053dbe.jfif',
    likeCount: 1,
    isLike: true,
  },
  {
    uuid: '8593ae9b-3a8c-463b-be3b-fbaad1c2e70a',
    loginId: 'auschool_lunch',
    role: 'ROLE_MUSICIAN',
    nickname: '급식',
    description: '코딩보다 음악이 좋아요.',
    registeredAt: '2024-10-11T00:51:00.00261',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/5d8add21ede447149c02cb6571591761.png',
    likeCount: 1,
    isLike: true,
  },
  {
    uuid: '950bf36f-3b29-4fc0-b275-95995b3b86b1',
    loginId: 'se_so_neon',
    role: 'ROLE_MUSICIAN',
    nickname: '새소년',
    description: '"지금 우리 앞의 가장 새로운 물결"',
    registeredAt: '2024-10-11T00:44:40.539448',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/6ca5ae6cf85b46659cda73d1c571f854.webp',
    likeCount: 2,
    isLike: true,
  },
  {
    uuid: 'b5e67ec3-6a74-48f3-9b9a-a33220e3f6c0',
    loginId: 'silicagel',
    role: 'ROLE_MUSICIAN',
    nickname: '실리카겔',
    description:
      '새롭고 용감한 사운드, 밴드 실리카겔 (Brave New Sound, Silica Gel)',
    registeredAt: '2024-10-11T00:41:49.071324',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/d67857e967fb44de9be929524ef9d2c9.webp',
    likeCount: 3,
    isLike: true,
  },
  {
    uuid: 'd2754d88-abfe-4d97-9e90-6def3c7d7af2',
    loginId: 'ydbband',
    role: 'ROLE_MUSICIAN',
    nickname: '유다빈밴드',
    description:
      '안녕하세요! 저희는 가장 가까운 마음의 목소리를 전하는 유다빈밴드입니다.',
    registeredAt: '2024-10-11T00:50:39.357163',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/5d07cde965a14b398fe79f36f6747656.jfif',
    likeCount: 1,
    isLike: true,
  },
  {
    uuid: 'eba9f0fb-7689-4600-9763-5a6962d73088',
    loginId: 'band_lucy',
    role: 'ROLE_MUSICIAN',
    nickname: 'LUCY',
    description: '안녕하세요, 저희는 LUCY입니다!',
    registeredAt: '2024-10-11T00:48:25.842377',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/ed61db90db00442cbfcaf84f2facc2a8.webp',
    likeCount: 2,
    isLike: true,
  },
  {
    uuid: '350930b9-efbc-4e8c-b08d-b8d990e38c32',
    loginId: 'hyukohofficial',
    role: 'ROLE_MUSICIAN',
    nickname: '혁오',
    description: '안녕하세요 저희는 혁오입니다, 감사합니다.',
    registeredAt: '2024-10-11T00:54:53.204554',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/75a93522eecd4d2d8354bb3e21053dbe.jfif',
    likeCount: 1,
    isLike: true,
  },
  {
    uuid: '8593ae9b-3a8c-463b-be3b-fbaad1c2e70a',
    loginId: 'auschool_lunch',
    role: 'ROLE_MUSICIAN',
    nickname: '급식',
    description: '코딩보다 음악이 좋아요.',
    registeredAt: '2024-10-11T00:51:00.00261',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/5d8add21ede447149c02cb6571591761.png',
    likeCount: 1,
    isLike: true,
  },
  {
    uuid: '950bf36f-3b29-4fc0-b275-95995b3b86b1',
    loginId: 'se_so_neon',
    role: 'ROLE_MUSICIAN',
    nickname: '새소년',
    description: '"지금 우리 앞의 가장 새로운 물결"',
    registeredAt: '2024-10-11T00:44:40.539448',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/6ca5ae6cf85b46659cda73d1c571f854.webp',
    likeCount: 2,
    isLike: true,
  },
  {
    uuid: 'b5e67ec3-6a74-48f3-9b9a-a33220e3f6c0',
    loginId: 'silicagel',
    role: 'ROLE_MUSICIAN',
    nickname: '실리카겔',
    description:
      '새롭고 용감한 사운드, 밴드 실리카겔 (Brave New Sound, Silica Gel)',
    registeredAt: '2024-10-11T00:41:49.071324',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/d67857e967fb44de9be929524ef9d2c9.webp',
    likeCount: 3,
    isLike: true,
  },
  {
    uuid: 'd2754d88-abfe-4d97-9e90-6def3c7d7af2',
    loginId: 'ydbband',
    role: 'ROLE_MUSICIAN',
    nickname: '유다빈밴드',
    description:
      '안녕하세요! 저희는 가장 가까운 마음의 목소리를 전하는 유다빈밴드입니다.',
    registeredAt: '2024-10-11T00:50:39.357163',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/5d07cde965a14b398fe79f36f6747656.jfif',
    likeCount: 1,
    isLike: true,
  },
  {
    uuid: 'eba9f0fb-7689-4600-9763-5a6962d73088',
    loginId: 'band_lucy',
    role: 'ROLE_MUSICIAN',
    nickname: 'LUCY',
    description: '안녕하세요, 저희는 LUCY입니다!',
    registeredAt: '2024-10-11T00:48:25.842377',
    imageUrl:
      'd2zj12sxzh0609.cloudfront.net/upload/musician/2024/10/11/ed61db90db00442cbfcaf84f2facc2a8.webp',
    likeCount: 2,
    isLike: true,
  },
] as const;
