import JSConfetti from 'js-confetti';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useConfetti() {
  const jsConfettiRef = useRef<JSConfetti | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (jsConfettiRef.current === null) {
      jsConfettiRef.current = new JSConfetti();
      setIsReady(true);
    }
  }, [setIsReady]);

  const fire = useCallback(() => {
    if (isReady) {
      jsConfettiRef.current?.addConfetti({
        confettiNumber: 100,
      });
    }
  }, [isReady]);

  return fire;
}
