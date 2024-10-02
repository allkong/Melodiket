import { http, HttpResponse } from 'msw';
import { delay } from './index';
import type {
  CarouselConcert,
  Concert,
  ConcertListItem,
} from '@/types/concert';

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

const CAROUSEL_DATAS: CarouselConcert[] = [
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

const CONCERT_DETAIL: Concert = {
  index: 0,
  concertId: 'test',
  title: 'SIRUP Live in Seoul',
  description:
    '무신사 게러지에서 열리는 콘서트는 음악 팬들에게 잊지 못할 경험을 선사합니다. 이 특별한 공연은 다양한 아티스트들의 열정적인 무대와 함께 음악의 매력을 만끽할 수 있는 기회를 제공합니다. 무신사 게러지는 독창적인 분위기와 함께 모던한 인테리어가 어우러져 있어, 관객들이 음악에 깊이 몰입할 수 있는 최적의 장소입니다. 공연에는 신진 아티스트부터 유명 밴드까지 다양한 장르의 음악이 포함되어 있어, 모든 관객들이 자신이 좋아하는 스타일의 음악을 찾을 수 있습니다. 관객들은 아티스트와의 소통을 통해 더욱 가까운 거리에서 그들의 열정과 감정을 느낄 수 있습니다. 특히, 이번 콘서트에서는 팬들과의 교감을 더욱 중요시하여, 관객 참여를 유도하는 특별한 프로그램도 마련되어 있습니다. 공연이 끝난 후에는 아티스트와의 만남이나 사인회도 진행될 예정으로, 팬들에게 소중한 추억을 선사할 것입니다. 무신사 게러지에서 열리는 이 콘서트는 단순한 음악 공연을 넘어, 아티스트와 팬이 함께하는 특별한 경험이 될 것입니다. 음악을 사랑하는 모든 이들에게 이 자리를 강력히 추천합니다. 놓치지 마세요!',
  location: '무신사 게러지',
  musicians: [
    {
      musicianId: '0',
      imageURL:
        'https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/080/644/831/80644831_1_600x600.JPG',
      musicianName: '퍼지퍼그',
    },
    {
      musicianId: '1',
      imageURL:
        'https://pbs.twimg.com/media/GCv3Qg3bMAAjaz_?format=jpg&name=large',
      musicianName: '주나주나',
    },
    {
      musicianId: '2',
      imageURL:
        'https://admin.idiots.band/uploads/large_2023_10_02_302325_1_80a5de9943.jpg',
      musicianName: '이디어츠',
    },
  ],
  posterURL:
    'https://sirup.online/wp/wp-content/uploads/2024/09/%E2%98%85%E2%98%85-360x480px%EC%82%AC%EC%9D%B4%EC%A6%88-RGB.jpg',
  startedAt: '2024.10.20',
  ticketingAt: '2024.10.1',
  favorite: 712,
  capability: 30,
  price: 35000,
  isSeat: true,
  // prettier-ignore
  isAvailableSeat: [
    [true, false, true, false, true, false, true, true, false, true, false, true, true, false, true, true, false, true, false],
    [false, true, false, true, true, false, true, false, false, true, true, false, true, true, false, true, false, false, true],
    [true, false, true, true, false, true, false, false, true, true, false, true, false, true, true, false, true, true, false],
    [false, true, false, false, true, true, false, true, true, false, true, false, true, false, true, false, false, true, true],
    [true, true, false, true, false, true, false, true, false, true, false, true, true, false, true, true, false, false, true],
    [false, false, true, false, true, false, true, false, true, true, false, true, false, true, false, true, true, true, false],
    [true, true, false, true, false, true, false, false, true, true, false, false, true, false, true, false, true, true, false],
    [false, false, true, false, true, false, true, true, false, true, true, false, true, false, true, true, false, false, true],
    [true, false, true, false, true, true, false, true, false, true, true, false, true, true, false, true, true, false, false],
    [false, true, false, true, true, false, true, true, false, true, false, true, true, false, false, true, false, true, true],
    [true, false, true, false, false, true, false, true, false, true, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, true, false, true, false, true, false, true, true, false, true, true, false, true, false, false],
    [true, false, true, false, true, true, false, false, true, true, false, true, false, true, false, true, true, false, true],
    [false, true, false, true, false, true, true, false, true, false, true, false, true, true, false, true, false, true, true],
    [true, false, true, true, false, true, false, true, true, false, true, true, false, true, false, true, false, false, true],
    [false, true, false, true, true, false, true, true, false, true, false, true, true, false, true, false, true, true, false]
  ],
};

export const concertList = [
  http.get<never, null, ConcertListItem[], '/concerts'>(
    '/concerts',
    async () => {
      await delay(1500);
      return HttpResponse.json(CONCERT_LIST);
    }
  ),
  http.get<never, null, CarouselConcert[], '/concerts/carousel'>(
    '/concerts/carousel',
    async () => {
      await delay(1500);
      return HttpResponse.json(CAROUSEL_DATAS);
    }
  ),
  http.get<{ uuid: string }, null, Concert, '/concerts/:uuid'>(
    '/concerts/:uuid',
    async () => {
      return HttpResponse.json(CONCERT_DETAIL);
    }
  ),
];
