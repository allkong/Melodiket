import { auth } from './auth';
import { accountInfo } from './accountInfo';
import { concertList } from './concert';
import { favorite } from './favorite';

export const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const handlers = [...auth, ...accountInfo, ...concertList, ...favorite];
