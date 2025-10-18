import { useState, useEffect, useRef, useCallback } from 'react';

export function useAnimation(duration: number) {
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      if (elapsed < duration) {
        requestRef.current = requestAnimationFrame(animate);
      }
    },
    [duration]
  );

  const start = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    startTimeRef.current = null;
    setProgress(0);
    requestRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return { progress, start };
}
