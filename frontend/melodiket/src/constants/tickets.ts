import { TicketStatus } from '@/types/ticket';

export const HISTORY_TYPES = {
  reserved: '예매내역',
  cancelled: '취소내역',
} as const;

export const TICKET_STATUS = {
  reserved: 'NOT_USED',
  used: 'USED',
  cancelled: 'REFUNDED',
} as const;

export const TicketStatusLabels: Record<TicketStatus, string> = {
  [TICKET_STATUS.reserved]: '예매 완료',
  [TICKET_STATUS.used]: '사용 완료',
  [TICKET_STATUS.cancelled]: '예매 취소',
} as const;
