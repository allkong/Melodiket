import { auth } from './auth';
import { accountInfo } from './accountInfo';

export const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const handlers = [...auth, ...accountInfo];
