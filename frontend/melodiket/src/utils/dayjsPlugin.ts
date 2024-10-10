import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko'; // 한국어 로케일

// 플러그인 사용 설정
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

// 한국어 로케일 설정
dayjs.locale('ko');

// 날짜 형식 커스텀
export const formatDateToYMD = (dateString: string): string => {
  if (!dateString) {
    return 'no data';
  }
  return dayjs(dateString).format('YYYY.MM.DD');
};

export const formatDateToYMDHM = (dateString: string): string => {
  if (!dateString) {
    return 'no data';
  }
  return dayjs(dateString).format('YYYY.MM.DD HH:mm');
};

export const formatDateWithDayAndTime = (dateString: string): string => {
  if (!dateString) {
    return 'no data';
  }
  return dayjs(dateString).format('YYYY.MM.DD(ddd) HH:mm');
};

export const formatDateCustom = (
  dateString: string,
  customFormat: string
): string => {
  if (!dateString) {
    return '';
  }
  return dayjs(dateString).format(customFormat);
};

export default dayjs;
