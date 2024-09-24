import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

/**
 * ms 시간이 지날 때마다 자동으로 증가한 인덱스를 반환하는 커스텀 훅
 * @param index autoIndex 초기값
 * @param min autoIndex가 가질 수 있는 최소값
 * @param max autoIndex가 가질 수 있는 최대값
 * @param ms autoIndex가 증가하는 시간 간격
 * @returns autoIndex, setAutoIndex
 */
export default function useAutoIndex(
  index: number,
  min: number,
  max: number,
  ms: number = 4000
): [autoIndex: number, setAutoIndex: Dispatch<SetStateAction<number>>] {
  const [autoIndex, setAutoIndex] = useState(index);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev === max ? min : prev + 1));
    }, ms);

    return () => {
      clearInterval(interval);
    };
  }, [autoIndex, max]);

  return [autoIndex, setAutoIndex];
}
