import { auth } from './auth';
import { accountInfo } from './accountInfo';
import { concertList } from './concert';
import { favorite } from './favorite';
import { ticket } from './ticket';

export const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const handlers = [
  ...auth,
  ...accountInfo,
  ...ticket,
  ...concertList,
  ...favorite,
];
