import type { ConcertDetail, FetchConcertResponse } from '@/types/concert';
import { TicketBookRequest, TicketBookResponse } from '@/types/ticket';
import { delay, http, HttpResponse } from 'msw';

const CONCERT_LIST: FetchConcertResponse = {
  pageInfo: {
    hasNextPage: false,
    requestedSize: 10,
    responsedSize: 7,
    lastUuid: 'test',
  },
  result: [
    {
      concertUuid: '0',
      posterCid:
        'https://i.pinimg.com/236x/11/d0/14/11d014040583c18f6ba3089dce24b1aa.jpg',
      title: 'wave to earth 1회 공연',
      stageName: '고척스카이돔',
      ticketingAt: '2024.09.03',
      startAt: '2024.09.03',
      isLike: false,
    },
    {
      concertUuid: '1',
      posterCid:
        'https://cdn2.ppomppu.co.kr/zboard/data3/2021/0421/m_20210421121541_cukpzbvs.jpg',
      title: 'あいみょん 2024 SSAFY ソウルキャンパス',
      stageName: '싸피서울캠퍼스',
      ticketingAt: '2024.09.03',
      startAt: '2024.09.03',
      isLike: true,
    },
    {
      concertUuid: '2',
      posterCid:
        'https://image.newsis.com/2023/08/13/NISI20230813_0001339579_web.jpg',
      title: '양문학',
      stageName: '고척스카이돔',
      ticketingAt: '2024.09.03',
      startAt: '2024.09.03',
      isLike: false,
    },
    {
      concertUuid: '3',
      posterCid:
        'https://static.news.zumst.com/images/139/2023/09/25/4b836bda80324ff7b434fda5dc666ef6.jpg',
      title: '아이유에유',
      stageName: '고척스카이돔',
      ticketingAt: '2024.09.03',
      startAt: '2024.09.03',
      isLike: true,
    },
    {
      concertUuid: '4',
      posterCid:
        'https://i.pinimg.com/236x/11/d0/14/11d014040583c18f6ba3089dce24b1aa.jpg',
      title: 'wave to earth 1회 공연',
      stageName: '고척스카이돔',
      ticketingAt: '2024.09.03',
      startAt: '2024.09.03',
      isLike: true,
    },
    {
      concertUuid: '5',
      posterCid:
        'https://cdn2.ppomppu.co.kr/zboard/data3/2021/0421/m_20210421121541_cukpzbvs.jpg',
      title: 'あいみょん 2024 SSAFY ソウルキャンパス',
      stageName: '싸피서울캠퍼스',
      ticketingAt: '2024.09.03',
      startAt: '2024.09.03',
      isLike: false,
    },
    {
      concertUuid: '6',
      posterCid:
        'https://image.newsis.com/2023/08/13/NISI20230813_0001339579_web.jpg',
      title: '양문학',
      stageName: '고척스카이돔',
      ticketingAt: '2024.09.03',
      startAt: '2024.09.03',
      isLike: true,
    },
  ],
};

const CONCERT_DETAIL: ConcertDetail = {
  concertUuid: 'test',
  title: 'SIRUP Live in Seoul',
  description:
    '무신사 게러지에서 열리는 콘서트는 음악 팬들에게 잊지 못할 경험을 선사합니다. 이 특별한 공연은 다양한 아티스트들의 열정적인 무대와 함께 음악의 매력을 만끽할 수 있는 기회를 제공합니다. 무신사 게러지는 독창적인 분위기와 함께 모던한 인테리어가 어우러져 있어, 관객들이 음악에 깊이 몰입할 수 있는 최적의 장소입니다. 공연에는 신진 아티스트부터 유명 밴드까지 다양한 장르의 음악이 포함되어 있어, 모든 관객들이 자신이 좋아하는 스타일의 음악을 찾을 수 있습니다. 관객들은 아티스트와의 소통을 통해 더욱 가까운 거리에서 그들의 열정과 감정을 느낄 수 있습니다. 특히, 이번 콘서트에서는 팬들과의 교감을 더욱 중요시하여, 관객 참여를 유도하는 특별한 프로그램도 마련되어 있습니다. 공연이 끝난 후에는 아티스트와의 만남이나 사인회도 진행될 예정으로, 팬들에게 소중한 추억을 선사할 것입니다. 무신사 게러지에서 열리는 이 콘서트는 단순한 음악 공연을 넘어, 아티스트와 팬이 함께하는 특별한 경험이 될 것입니다. 음악을 사랑하는 모든 이들에게 이 자리를 강력히 추천합니다. 놓치지 마세요!',
  stageName: '무신사 게러지',
  musicians: [
    {
      musicianUuid: '0',
      name: '한로로',
      imageUrl:
        'https://i.namu.wiki/i/DiRZTq4yBGq81-IgMuSglVAC_1pOoJG1EkJFwknd-DxFEBWo_XAHU4cIx-rPa_t82wnGgxkrVoQ_WeGRStW_cQ.webp',
    },
    {
      musicianUuid: '1',
      name: '빈지노',
      imageUrl:
        'https://i1.sndcdn.com/artworks-S0GeUXNsiAmWpsE6-55G5vg-t500x500.jpg',
    },
    {
      musicianUuid: '2',
      name: '아이묭',
      imageUrl:
        'https://i.namu.wiki/i/TY6C7IX49vy2Ed6P9zlbfYMra3A7vSCSbIDql-xQ3IksVdPU5N6CaCW0zeWSvKmuQWipMyPAQyTHQwPXJmm_BA.webp',
    },
  ],
  posterCid:
    'https://sirup.online/wp/wp-content/uploads/2024/09/%E2%98%85%E2%98%85-360x480px%EC%82%AC%EC%9D%B4%EC%A6%88-RGB.jpg',
  startAt: '2024.10.20',
  ticketingAt: '2024.10.1',
  isStanding: false,
  isLike: true,
  likeCount: 832,
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
  availableTickets: 32,
  favoriteMusicianStake: 0,
  ownerStake: 0,
  stageUuid: '',
  ticketPrice: 35000,
  capacity: 1000,
  createdAt: '',
  musicianStake: 0,
  status: '',
};

export const concertList = [
  http.get<never, null, FetchConcertResponse, '/concerts'>(
    '/concerts',
    async () => {
      await delay(1500);
      return HttpResponse.json(CONCERT_LIST);
    }
  ),
  http.get<{ uuid: string }, null, ConcertDetail, '/concerts/:uuid'>(
    '/concerts/:uuid',
    async () => {
      return HttpResponse.json(CONCERT_DETAIL);
    }
  ),
  http.post<{ concertUuid: string }, null, { isFavorite: boolean }>(
    '/concerts/:concertUuid/favorite',
    async () => {
      return HttpResponse.json({
        isFavorite: Math.random() < 0.5 ? true : false,
      });
    }
  ),
  http.post<never, TicketBookRequest, TicketBookResponse>(
    '/tickets',
    async () => {
      delay(1500);
      return HttpResponse.json({
        userName: 'username',
        ticketUuid: '123e4567-e89b-12d3-a456-426614174000',
        concertTitle: 'The Golden Hour : 오렌지 태양 아래',
        posterCid:
          'https://i.namu.wiki/i/6954AWgOwNRZw-HzI4AhrWvXzGeHvHiQzUIS4clHj2C0-EW5joO7ojEOHF0W1_ub9SeZajsIj2tBD0m5VFehVRjwFse59QjWyXwjfNi_5IRD2H-9xjgzAf8_bzJbwrJHg21lSvuLqD9Gdq4HMj628w.webp',
        stageName: '서울올림픽주경기장',
        stageAddress: '서울올림픽주경기장',
        ticketPrice: 120000,
        status: 'NOT_USED',
        seatRow: 1,
        seatCol: 1,
        refundAt: '',
        usedAt: '',
        createdAt: '2024-09-26T10:44:48.330372',
        startAt: '2024-09-26T10:44:48.330372',
        myFavoriteMusician: {
          musicianName: '아이유',
          musicainImageUrl:
            'https://i.namu.wiki/i/LfH7oUFrOa_2P4QIgyGlGX0UREjOLpOoeYy-EXbEn2ZCrZ3b4z_Rd34MbCZlkLvGIFtFmA2G9DERjw_SY8kgqWKSTnJE6HRLQS2of4PYI2d14CxUGmpXWpCuelUKgN5BKNEZcLtsmXm186oSMI6mcg.webp',
        },
      });
    }
  ),
];
