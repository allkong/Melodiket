import { accountInfo } from './accountInfo';

export const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const handlers = [...accountInfo];
