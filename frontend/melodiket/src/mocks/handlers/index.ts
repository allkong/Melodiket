import { auth } from './auth';
import { accountInfo } from './accountInfo';
import { concert } from './concert';

export const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const handlers = [...auth, ...accountInfo, ...concert];
