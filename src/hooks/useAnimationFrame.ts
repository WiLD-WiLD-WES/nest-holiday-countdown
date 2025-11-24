import { useEffect, useRef } from 'react';

export function useAnimationFrame(callback: () => void) {
  const callbackRef = useRef(callback);
  
  // Keep the ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callbackRef.current();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
}
