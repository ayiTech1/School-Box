// ✅ hooks/useClickOutside.ts

import { useEffect, RefObject } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement | null>, // <-- allow null safely
  handler: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}
