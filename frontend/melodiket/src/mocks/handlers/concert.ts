import { http, HttpResponse } from 'msw';

export const concert = [
  http.get('/concerts/tickets/me', async () => {
    return HttpResponse.json({
      result: [
        {
          ticketId: 0,
          poster:
            'https://i.namu.wiki/i/kurz0p1Tm_YMWDDeOzBkBd2P0odt2vWapIJHvcVd1KWEhEoLYP-oDj4ZmZxi2dlVMKsT8NcWsMJOIWtiA5rSaHEm2RqzkfrlhC3HdWg0dNjYwGaom5oOwcHFiSPYexcvRXDtY0dnuJnr9JvWXP0Cng.webp',
          concertTitle: 'The Golden Hour : 오렌지 태양 아래',
          stageName: '서울올림픽주경기장',
          startAt: '2024-10-25T14:30:00',
          createdAt: '2024-09-25T14:30:00',
          refundAt: '',
        },
        {
          ticketId: 1,
          poster:
            'https://i.namu.wiki/i/MRtlBMAomNAnBDQwChjtIbyaCQWSnrN2BU4YDJ542gM9aRxt2qkjnWXlHSnymGY1H-5FTXCWsz0wcTz-Z-vfu_ZIwrjZ3SnCOgs1xthXDANAGZn0UwPaAaw9lGJA48aU5gcSPcSB2D_pXD6cmgXtAg.webp',
          concertTitle: 'FOREVER YOUNG',
          stageName: '인천 인스파이어 아레나',
          startAt: '2024-10-25T14:30:00',
          createdAt: '2024-09-25T14:30:00',
          refundAt: '',
        },
        {
          ticketId: 2,
          poster:
            'https://i.namu.wiki/i/fm746aapERp0g4MB0vpPZJXg35Hpz_VlQaDIGjJ-3bA8wuMEINermQHfz2hMqm3Fz1fnqfdse9sdndpkThZ4xFy8rQn9j8V3lImfvjfylaVmURAUaI5ck-lVOfbJY5xkyMlkuMhxg4FghhVKsEspiw.webp',
          concertTitle: '2024 IVE 2nd FANMEETING MAGAZINE IVE',
          stageName: '올림픽공원 핸드볼 경기장',
          startAt: '2024-10-25T14:30:00',
          createdAt: '2024-09-25T14:30:00',
          refundAt: '',
        },
      ],
    });
  }),
];
