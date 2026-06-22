import { MapPin, Cpu, HardDrive, Wifi, ShieldCheck } from 'lucide-react';
import { contact, summary, story, systemSpec, education } from '../data/resume';

export default function AboutApp() {
  return (
    <div className="h-full overflow-auto p-6 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
      <div className="flex flex-col gap-5">
        {/* Identity header */}
        <header className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-winlg bg-accent text-2xl font-semibold text-white shadow-win">
            SO
          </div>
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">{contact.name}</h1>
            <p className="text-accent-400">{contact.title}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <MapPin size={13} /> {contact.location}
            </p>
          </div>
        </header>

        {/* System spec gag */}
        <section
          aria-label="System specification"
          className="grid grid-cols-2 gap-2 rounded-win border border-zinc-200 bg-zinc-50 p-4 text-xs dark:border-zinc-700 dark:bg-zinc-800/60 sm:grid-cols-4"
        >
          <Spec icon={<Cpu size={15} />} label="OS" value={systemSpec.os} />
          <Spec icon={<HardDrive size={15} />} label="Role" value={systemSpec.role} />
          <Spec icon={<Wifi size={15} />} label="Uptime" value={systemSpec.uptime} />
          <Spec
            icon={<ShieldCheck size={15} className="text-green-500" />}
            label="Deployments"
            value="✅ green"
          />
        </section>

        {/* Summary */}
        <section>
          <h2 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Summary
          </h2>
          <p>{summary}</p>
        </section>

        {/* The journey */}
        <section>
          <h2 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Windows Admin → DevOps
          </h2>
          <p>{story}</p>
        </section>

        {/* Education */}
        <section>
          <h2 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Education
          </h2>
          <p className="font-medium text-zinc-900 dark:text-white">{education.degree}</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            {education.school} · {education.period}
          </p>
        </section>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
        {icon} {label}
      </span>
      <span className="font-semibold text-zinc-900 dark:text-white">{value}</span>
    </div>
  );
}
