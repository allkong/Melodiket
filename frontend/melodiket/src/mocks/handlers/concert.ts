import { http, HttpResponse } from 'msw';
import { delay } from './index';
import type { ConcertListItem } from '@/types/concert';

const CONCERT_LIST: ConcertListItem[] = [
  {
    concertId: '0',
    posterURL:
      'https://i.pinimg.com/236x/11/d0/14/11d014040583c18f6ba3089dce24b1aa.jpg',
    title: 'wave to earth 1회 공연',
    location: '고척스카이돔',
    ticketingAt: '2024.09.03',
  },
  {
    concertId: '1',
    posterURL:
      'https://cdn2.ppomppu.co.kr/zboard/data3/2021/0421/m_20210421121541_cukpzbvs.jpg',
    title: 'あいみょん 2024 SSAFY ソウルキャンパス',
    location: '싸피서울캠퍼스',
    ticketingAt: '2024.09.03',
  },
  {
    concertId: '2',
    posterURL:
      'https://image.newsis.com/2023/08/13/NISI20230813_0001339579_web.jpg',
    title: '양문학',
    location: '고척스카이돔',
    ticketingAt: '2024.09.03',
  },
  {
    concertId: '3',
    posterURL:
      'https://static.news.zumst.com/images/139/2023/09/25/4b836bda80324ff7b434fda5dc666ef6.jpg',
    title: '아이유에유',
    location: '고척스카이돔',
    ticketingAt: '2024.09.03',
  },
  {
    concertId: '4',
    posterURL:
      'https://i.pinimg.com/236x/11/d0/14/11d014040583c18f6ba3089dce24b1aa.jpg',
    title: 'wave to earth 1회 공연',
    location: '고척스카이돔',
    ticketingAt: '2024.09.03',
  },
  {
    concertId: '5',
    posterURL:
      'https://cdn2.ppomppu.co.kr/zboard/data3/2021/0421/m_20210421121541_cukpzbvs.jpg',
    title: 'あいみょん 2024 SSAFY ソウルキャンパス',
    location: '싸피서울캠퍼스',
    ticketingAt: '2024.09.03',
  },
  {
    concertId: '6',
    posterURL:
      'https://image.newsis.com/2023/08/13/NISI20230813_0001339579_web.jpg',
    title: '양문학',
    location: '고척스카이돔',
    ticketingAt: '2024.09.03',
  },
];

export const concertList = [
  http.get<never, null, ConcertListItem[], '/api/v1/concerts'>(
    '/api/v1/concerts',
    async () => {
      await delay(1500);
      return HttpResponse.json(CONCERT_LIST);
    }
  ),
];
