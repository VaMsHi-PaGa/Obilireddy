import { motion } from 'framer-motion';
import { skillGroups } from '../data/resume';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function SkillsApp() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="h-full overflow-auto p-5 text-sm text-zinc-800 dark:text-zinc-200">
      <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
        Device Manager · {skillGroups.reduce((n, g) => n + g.skills.length, 0)} components detected,
        all drivers up to date.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.category}>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-600 dark:text-accent-400">
              {group.category}
            </h2>
            <div className="flex flex-col gap-2.5">
              {group.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-[11px] text-zinc-400">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={reduced ? false : { width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
