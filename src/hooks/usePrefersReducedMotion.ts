import { useMediaQuery } from './useMediaQuery';

/** True when the user has requested reduced motion; gate heavy animations on this. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
