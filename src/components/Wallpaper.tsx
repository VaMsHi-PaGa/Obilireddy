import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Abstract cloud / infrastructure-themed gradient wallpaper with cheap,
 * GPU-friendly parallax blobs. Honours prefers-reduced-motion.
 */
export default function Wallpaper() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0067C0] to-[#0a1a2f] dark:from-[#050d1a] dark:via-[#06325f] dark:to-[#03070f]">
      {/* Soft blobs */}
      <div
        className={`absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent-400/30 blur-3xl ${
          reduced ? '' : 'animate-floaty'
        }`}
      />
      <div
        className={`absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl ${
          reduced ? '' : 'animate-floaty'
        }`}
        style={{ animationDelay: '-4s' }}
      />
      <div
        className={`absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl ${
          reduced ? '' : 'animate-floaty'
        }`}
        style={{ animationDelay: '-8s' }}
      />

      {/* Faint infra grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
