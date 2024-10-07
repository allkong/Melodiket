import { http, HttpResponse } from 'msw';

import { TicketDetail, TicketList } from '@/types/ticket';

export const ticket = [
  http.get('/tickets/me', async () => {
    return HttpResponse.json({
      result: [
        {
          ticketUuid: '123e4567-e89b-12d3-a456-426614174000',
          concertTitle: 'The Golden Hour : 오렌지 태양 아래',
          posterCid:
            'https://i.namu.wiki/i/LYcZkJu_S2Qgv-KTEyNbRMh0kKo2x41CXt0vDnMv9Blctztq47dQAlp9SJe3yBNCXTPHJAAf8VkV4gZufZl6kMoJd2k4zfN-mWRaoeuok6t6BMCyUVXmg8vuCvCVLUbyQ2tfBsm6JJH2MMZs7tm2Mg.webp',
          stageName: '서울올림픽주경기장',
          stageAddress: '',
          status: 'NOT_USED',
          startAt: '2024-09-26T10:44:48.330372',
          createdAt: '2024-09-26T10:44:48.330372',
          refundAt: '',
        },
        {
          ticketUuid: 'd0a1f020-8f47-403b-834d-33de0b1f29a4',
          concertTitle: 'FOREVER YOUNG',
          posterCid:
            'https://i.namu.wiki/i/MRtlBMAomNAnBDQwChjtIbyaCQWSnrN2BU4YDJ542gM9aRxt2qkjnWXlHSnymGY1H-5FTXCWsz0wcTz-Z-vfu_ZIwrjZ3SnCOgs1xthXDANAGZn0UwPaAaw9lGJA48aU5gcSPcSB2D_pXD6cmgXtAg.webp',

          stageName: '인천 인스파이어 아레나',
          stageAddress: '',
          status: 'USED',
          startAt: '2024-09-26T10:44:48.330372',
          createdAt: '2024-09-26T10:44:48.330372',
          refundAt: '',
        },
        {
          ticketUuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          concertTitle: '2024 IVE 2nd FANMEETING MAGAZINE IVE',
          posterCid:
            'https://i.namu.wiki/i/fm746aapERp0g4MB0vpPZJXg35Hpz_VlQaDIGjJ-3bA8wuMEINermQHfz2hMqm3Fz1fnqfdse9sdndpkThZ4xFy8rQn9j8V3lImfvjfylaVmURAUaI5ck-lVOfbJY5xkyMlkuMhxg4FghhVKsEspiw.webp',

          stageName: '올림픽공원 핸드볼 경기장',
          stageAddress: '',
          status: 'REFUNDED',
          startAt: '2024-09-26T10:44:48.330372',
          createdAt: '2024-09-26T10:44:48.330372',
          refundAt: '2024-09-26T10:44:48.330372',
        },
      ],
    } as TicketList);
  }),
  http.get('tickets/:uuid', async () => {
    return HttpResponse.json({
      ticketUuid: '123e4567-e89b-12d3-a456-426614174000',
      concertUuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      concertTitle: 'The Golden Hour : 오렌지 태양 아래',
      posterCid:
        'https://i.namu.wiki/i/LYcZkJu_S2Qgv-KTEyNbRMh0kKo2x41CXt0vDnMv9Blctztq47dQAlp9SJe3yBNCXTPHJAAf8VkV4gZufZl6kMoJd2k4zfN-mWRaoeuok6t6BMCyUVXmg8vuCvCVLUbyQ2tfBsm6JJH2MMZs7tm2Mg.webp',
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
        musicianImageUrl:
          'https://i.namu.wiki/i/LfH7oUFrOa_2P4QIgyGlGX0UREjOLpOoeYy-EXbEn2ZCrZ3b4z_Rd34MbCZlkLvGIFtFmA2G9DERjw_SY8kgqWKSTnJE6HRLQS2of4PYI2d14CxUGmpXWpCuelUKgN5BKNEZcLtsmXm186oSMI6mcg.webp',
      },
    } as TicketDetail);
  }),
];
