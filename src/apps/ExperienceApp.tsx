import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { company, experience, experienceFocus } from '../data/resume';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function ExperienceApp() {
  const reduced = usePrefersReducedMotion();

  // Build a rising polyline across the role ladder.
  const maxLevel = Math.max(...experience.map((r) => r.level));
  const W = 100;
  const H = 100;
  const points = experience.map((role, i) => {
    const x = experience.length === 1 ? W / 2 : (i / (experience.length - 1)) * (W - 10) + 5;
    const y = H - 12 - (role.level / maxLevel) * (H - 26);
    return { x, y, role };
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${H - 8} L ${points[0].x} ${H - 8} Z`;

  return (
    <div className="flex h-full flex-col overflow-auto p-5 text-sm text-zinc-800 dark:text-zinc-200">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Career performance
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{company}</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
          <TrendingUp size={13} /> Trend: rising
        </span>
      </div>

      {/* Performance graph */}
      <div className="relative rounded-win border border-zinc-200 bg-gradient-to-b from-accent-50/60 to-transparent p-3 dark:border-zinc-700 dark:from-accent/10">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full" preserveAspectRatio="none" role="img" aria-label="Career progression chart, rising over time">
          {/* grid lines */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1="0"
              x2={W}
              y1={H * g}
              y2={H * g}
              className="stroke-zinc-200 dark:stroke-zinc-700"
              strokeWidth="0.3"
            />
          ))}
          <defs>
            <linearGradient id="careerFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0067C0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0067C0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPath}
            fill="url(#careerFill)"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="#0067C0"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
          {points.map((p, i) => (
            <motion.circle
              key={p.role.title}
              cx={p.x}
              cy={p.y}
              r="1.8"
              fill="#fff"
              stroke="#0067C0"
              strokeWidth="1.2"
              initial={reduced ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.25 }}
            />
          ))}
        </svg>
      </div>

      {/* Role ladder */}
      <ol className="mt-4 flex flex-col gap-3">
        {[...experience].reverse().map((role) => (
          <li
            key={role.title}
            className="flex items-center gap-3 rounded-win border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800/60"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent-600 dark:text-accent-400">
              L{role.level}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-zinc-900 dark:text-white">{role.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.start} — {role.end}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Focus areas = "processes" */}
      <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Processes (focus areas)
      </h3>
      <div className="flex flex-col gap-2">
        {experienceFocus.map((f) => (
          <details
            key={f.area}
            className="group rounded-win border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800/60"
          >
            <summary className="cursor-pointer list-none font-medium text-zinc-900 marker:content-none dark:text-white">
              <span className="text-accent-500 transition group-open:rotate-90">▸</span> {f.area}
            </summary>
            <p className="mt-2 pl-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {f.detail}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
