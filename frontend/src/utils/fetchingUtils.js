import { useEffect, useRef } from 'react';

export const useDebouncedEffect = (callback, parameters, delay) => {
  const currentTimeout = useRef(null);

  useEffect(() => {
    if (currentTimeout.current !== null) {
      clearTimeout(currentTimeout.current);
    }
    currentTimeout.current = setTimeout(callback, delay);
  }, parameters);
};