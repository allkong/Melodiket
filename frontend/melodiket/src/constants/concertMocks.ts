import type { CarouselConcert, ConcertListItem } from '@/types/concert';

export const CAROUSEL_DATAS: CarouselConcert[] = [
  {
    description: '누구일까?\n비밀의 콘서트',
    index: 0,
    location: '고척스카이돔',
    title: '콘서트 제목',
    ticketingAt: '2024.09.03',
    posterURL:
      'https://an2-img.amz.wtchn.net/image/v2/zhP6BveaBByYE74o9uUFYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1USTRNSGczTWpCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qZ3dOVEUxTmprM01EZzRNVFEyTVRBM0luMC5rRnByMkxWT2hNajZjclBXY1YwOXhWNXpVNGdMbW9pSnMwSm5XQWZVNHpR',
  },
  {
    description: '눈이 반짝',
    index: 1,
    location: '양재',
    title: '콘서트 제목',
    ticketingAt: '2024.09.03',
    posterURL:
      'https://www.harpersbazaar.co.kr/resources_old/online/org_online_image/3574a333-f251-4e64-8141-8861b11a1e17.jpg',
  },
  {
    description: '눈 찌릿',
    index: 2,
    location: '싸피 서울캠퍼스',
    title: '콘서트 제목',
    ticketingAt: '2024.09.03',
    posterURL:
      'https://i.namu.wiki/i/3KxPCWTEPGKYT-jBZ8AcQY2AaTOEXlgBkxr-oSAzdfXrsassqyff6qYjHZqNODbB5p8PWKk_kmjfNC62z8OTww.webp',
  },
  {
    description: '내가 최고',
    index: 3,
    location: '싸피 식당',
    title: '콘서트 제목',
    ticketingAt: '2024.09.03',
    posterURL:
      'https://blog.kakaocdn.net/dn/bBn3p7/btsEWg4ENQw/nx4lRKblsQ2gATzK8temw0/img.jpg',
  },
  {
    description: '하트',
    index: 4,
    location: '텐퍼센트 커피',
    title: '콘서트 제목',
    ticketingAt: '2024.09.03',
    posterURL:
      'https://thumbnail.laftel.net/items/home/acc5935b-2657-423c-bdbc-39a461b6fb4e.jpg?webp=0&w=760&c=0%2C0%2C640%2C360',
  },
];

export const CONCERT_LIST: ConcertListItem[] = [
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

export const FAVORITE_MUSICIAN_LIST: {
  index: number;
  musicianName: string;
  src: string;
}[] = [
  {
    index: 0,
    musicianName: '아이묭',
    src: 'https://i1.sndcdn.com/artworks-Dq5srslWYpDO1H0j-cTCo1w-t500x500.jpg',
  },
  {
    index: 1,
    musicianName: 'hitsujibungaku',
    src: 'https://i.pinimg.com/236x/65/3b/f5/653bf5ae181cab407c7cbd5c616672a6.jpg',
  },
  {
    index: 2,
    musicianName: '빈지노',
    src: 'https://img.hankyung.com/photo/202103/01.25846226.3.jpg',
  },
  {
    index: 3,
    musicianName: '김장훈',
    src: 'https://newsimg-hams.hankookilbo.com/2022/08/13/601df9d2-7c82-4b2d-bdd1-dc0bcc2e81e4.jpg',
  },
];