import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Hammer, FlaskConical, Rocket, CheckCircle2, RotateCw } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface Stage {
  id: string;
  label: string;
  icon: typeof Hammer;
  detail: string;
}

const stages: Stage[] = [
  { id: 'commit', label: 'Commit', icon: GitCommit, detail: 'git push → Azure Repos' },
  { id: 'build', label: 'Build', icon: Hammer, detail: 'terraform init & plan' },
  { id: 'test', label: 'Test', icon: FlaskConical, detail: 'validate & policy check' },
  { id: 'deploy', label: 'Deploy', icon: Rocket, detail: 'terraform apply → Azure' },
];

export default function PipelineApp() {
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(reduced ? stages.length : -1);
  const [runs, setRuns] = useState(127);

  useEffect(() => {
    if (reduced) return;
    let i = -1;
    let timer: number;
    const tick = () => {
      i += 1;
      if (i > stages.length) {
        // Loop subtly after a pause.
        setRuns((r) => r + 1);
        i = -1;
        timer = window.setTimeout(tick, 1400);
        return;
      }
      setActiveIndex(i);
      timer = window.setTimeout(tick, 900);
    };
    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const allDone = activeIndex >= stages.length;

  return (
    <div className="flex h-full flex-col p-5 text-sm text-zinc-800 dark:text-zinc-200">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
          azure-landing-zone · main
        </h2>
        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
            allDone
              ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
          }`}
        >
          {allDone ? (
            <>
              <CheckCircle2 size={13} /> Succeeded
            </>
          ) : (
            <>
              <RotateCw size={13} className={reduced ? '' : 'animate-spin'} /> Running
            </>
          )}
        </span>
      </div>
      <p className="mb-5 text-xs text-zinc-500 dark:text-zinc-400">
        Build #{runs} · triggered by push · Azure Pipelines
      </p>

      {/* Pipeline stages */}
      <div className="flex items-center justify-between gap-1">
        {stages.map((stage, i) => {
          const done = i < activeIndex || allDone;
          const active = i === activeIndex && !allDone;
          const Icon = stage.icon;
          return (
            <div key={stage.id} className="flex flex-1 items-center">
              <div className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  className={`flex h-12 w-12 items-center justify-center rounded-winlg border-2 transition-colors duration-500 ${
                    done
                      ? 'border-green-500 bg-green-500 text-white'
                      : active
                        ? 'border-accent bg-accent/15 text-accent-500'
                        : 'border-zinc-300 bg-zinc-100 text-zinc-400 dark:border-zinc-600 dark:bg-zinc-800'
                  }`}
                  animate={active && !reduced ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                  transition={{ duration: 0.8, repeat: active ? Infinity : 0 }}
                >
                  {done ? <CheckCircle2 size={22} /> : <Icon size={20} />}
                </motion.div>
                <span
                  className={`text-xs font-medium ${
                    done || active ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {i < stages.length - 1 && (
                <div className="relative mx-1 h-0.5 flex-1 self-start mt-6 overflow-hidden rounded bg-zinc-200 dark:bg-zinc-700">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-green-500"
                    initial={false}
                    animate={{ width: i < activeIndex || allDone ? '100%' : '0%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Log output */}
      <div className="mt-6 flex-1 overflow-auto rounded-win bg-zinc-900 p-3 font-mono text-[11px] leading-relaxed text-zinc-300">
        {stages.map((stage, i) => {
          const done = i < activeIndex || allDone;
          const active = i === activeIndex && !allDone;
          if (!done && !active) return null;
          return (
            <div key={stage.id} className={done ? 'text-green-400' : 'text-amber-400'}>
              {done ? '✓' : '▶'} [{stage.label}] {stage.detail}
              {done ? ' — ok' : '...'}
            </div>
          );
        })}
        {allDone && <div className="mt-1 text-green-400">✓ Pipeline succeeded — deployments green.</div>}
      </div>
    </div>
  );
}
