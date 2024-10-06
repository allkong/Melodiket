import { auth } from './auth';
import { accountInfo } from './accountInfo';
import { concertList } from './concert';
import { favorite } from './favorite';
import { ticket } from './ticket';
import { photocard } from './photocard';

export const handlers = [
  ...auth,
  ...accountInfo,
  ...concertList,
  ...favorite,
  ...photocard,
  ...ticket,
];
