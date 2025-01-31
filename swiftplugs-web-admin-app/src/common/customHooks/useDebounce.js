import { useCallback, useEffect, useRef } from "react";

/**
 * Delay execution of a callback to a run after a specified delay
 * @param {string} argument
 * @param {Function} callback
 * @param {number} delay
 * @returns {void}
 */
export default function useDebounce(argument, callback, delay) {
  // To remove the TS lint warning about setting type Timeout to type undefined
  const defaultTimeout = setTimeout(() => {}, 0);
  const timeoutRef = useRef(defaultTimeout);

  
  const debouncedCallback = useCallback(
    (arg) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => arg?.trim() && callback?.(arg), delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    debouncedCallback(argument);
    return () => clearTimeout(timeoutRef.current);
  }, [argument, debouncedCallback]);

  return debouncedCallback;
}

