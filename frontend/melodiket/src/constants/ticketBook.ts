import type { TicketBookPolicy } from '@/types/ticket';

// 티켓 예매 약관
export const TICKET_BOOK_POLICY_DATAS: TicketBookPolicy[] = [
  { key: 0, label: '[필수] 만 14세 이상입니다.', isEssential: true },
  { key: 1, label: '[필수] 이용약관, 개인정보 수집/이용', isEssential: true },
  { key: 2, label: '[필수] 뮤지션 정산', isEssential: true },
  { key: 3, label: '[필수] 티켓 환불 정책', isEssential: true },
] as const;
