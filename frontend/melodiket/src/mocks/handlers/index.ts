import { auth } from './auth';
import { accountInfo } from './accountInfo';
import { ticket } from './ticket';

export const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const handlers = [...auth, ...accountInfo, ...ticket];
