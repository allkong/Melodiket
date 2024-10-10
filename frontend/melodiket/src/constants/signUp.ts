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
    loginId: '1',
    description: '아이묭입니다',
    role: 'ROLE_MUSICIAN',
    nickname: '아이묭',
    imageUrl:
      'https://i1.sndcdn.com/artworks-Dq5srslWYpDO1H0j-cTCo1w-t500x500.jpg',
    uuid: '',
    registeredAt: '',
    likeCount: 0,
    isLike: false,
  },
  {
    description: 'hi',
    loginId: 'me',
    nickname: 'hitsujibungaku',
    role: 'ROLE_MUSICIAN',
    imageUrl:
      'https://i.pinimg.com/236x/65/3b/f5/653bf5ae181cab407c7cbd5c616672a6.jpg',
    uuid: '',
    registeredAt: '',
    likeCount: 0,
    isLike: false,
  },
  {
    nickname: '빈지노',
    description: 'hi',
    loginId: 'beenzino',
    role: 'ROLE_MUSICIAN',
    imageUrl: 'https://img.hankyung.com/photo/202103/01.25846226.3.jpg',
    uuid: '',
    registeredAt: '',
    likeCount: 0,
    isLike: false,
  },
  {
    nickname: '김장훈',
    role: 'ROLE_MUSICIAN',
    description: '독도킥 보여드리겠습니다.',
    loginId: 'jang',
    imageUrl:
      'https://newsimg-hams.hankookilbo.com/2022/08/13/601df9d2-7c82-4b2d-bdd1-dc0bcc2e81e4.jpg',
    uuid: '',
    registeredAt: '',
    likeCount: 0,
    isLike: false,
  },
] as const;
