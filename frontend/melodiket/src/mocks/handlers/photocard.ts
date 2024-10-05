import { PhotocardList } from '@/types/photocard';
import { delay, http, HttpResponse } from 'msw';

export const photocard = [
  http.get('/photo-cards/me', async () => {
    await delay(3000);

    return HttpResponse.json({
      result: [
        {
          photocardUuid: '6c43b644-6d22-4ebb-9243-432d507101ec',
          concertName: 'The Golden Hour : 오렌지 태양 아래',
          imageCid:
            'https://i.namu.wiki/i/YvAZ1b6CTz7pLtifAW_EKOF2tBiGlFAXPVXxxmC7JNlSEhNaFi0wZjg99owuxGFXqZfdneMziIyBC1JIcNwQ_R8RXQP1OfuU-EpswEGFbhSfMKdUAnH0vPoaIaTJYs-vPJnj3gyz5-uvLAGUfpfNTQ.webp',
          createdAt: '2024-10-05T10:44:48.330372',
        },
        {
          photocardUuid: 'a146decf-2eca-4583-969b-f2aee4f7a724',
          concertName: '2024 IVE 2nd FANMEETING MAGAZINE IVE',
          imageCid:
            'https://i.namu.wiki/i/mbffeEeM6_v428XEXyO0NvEmROo-xxlnqNkGffaBJ0OiLnxM_mZ1-EOJLhQm1u3QsHYQg7vwkVSbg7T-UJahBPnHgijjWh63H3cBMCSQeUkP5eMbeU1Y_FpARTnKm97KSjxjiC_dWypci4QRbNukCg.webp',
          createdAt: '2024-10-05T10:44:48.330372',
        },
      ],
    } as PhotocardList);
  }),
];
