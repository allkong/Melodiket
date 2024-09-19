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
    mainLabel: '관객',
    subLabel: '뮤지션이 진행하는 공연을 즐기고 싶어요.',
    value: 'AUDIENCE',
  },
  {
    key: 1,
    mainLabel: '뮤지션',
    subLabel: '제 공연을 관객들에게 선보이고 싶어요.',
    value: 'MUSICIAN',
  },
  {
    key: 2,
    mainLabel: '매니저',
    subLabel: '제 공연장을 제공하고 싶어요.',
    value: 'MANAGER',
  },
] as const;
