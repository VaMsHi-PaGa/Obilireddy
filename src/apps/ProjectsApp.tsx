import { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, type Project } from '../data/resume';

export default function ProjectsApp() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="flex h-full flex-col text-sm text-zinc-800 dark:text-zinc-200">
      {/* Explorer breadcrumb / address bar */}
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-700 dark:bg-zinc-800/60">
        <button
          onClick={() => setActive(null)}
          disabled={!active}
          className="rounded p-1 text-zinc-500 hover:bg-zinc-200 disabled:opacity-40 dark:hover:bg-zinc-700"
          aria-label="Back"
        >
          <ArrowLeft size={14} />
        </button>
        <span className="text-zinc-500">This PC</span>
        <ChevronRight size={12} className="text-zinc-400" />
        <span className="text-zinc-500">Projects</span>
        {active && (
          <>
            <ChevronRight size={12} className="text-zinc-400" />
            <span className="font-medium text-zinc-900 dark:text-white">{active.name}</span>
          </>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {!active ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {projects.map((p) => (
              <button
                key={p.id}
                onDoubleClick={() => setActive(p)}
                onClick={(e) => {
                  // Single click selects; double click (or Enter) opens.
                  if (e.detail === 0) setActive(p);
                }}
                onKeyDown={(e) => e.key === 'Enter' && setActive(p)}
                className="group flex flex-col items-center gap-2 rounded-win p-3 text-center transition hover:bg-accent-50 focus:bg-accent-50 focus:outline-none focus:ring-2 focus:ring-accent dark:hover:bg-accent/20 dark:focus:bg-accent/20"
                title="Double-click to open"
              >
                <Folder
                  size={48}
                  className="text-[#E3A018] transition group-hover:scale-105"
                  fill="#F5C453"
                />
                <span className="line-clamp-2 text-xs font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <ProjectDetail project={active} />
        )}
      </div>

      {!active && (
        <p className="border-t border-zinc-200 px-3 py-1.5 text-[11px] text-zinc-400 dark:border-zinc-700">
          {projects.length} folders · double-click to open
        </p>
      )}
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{project.name}</h2>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-medium text-accent-600 dark:bg-accent/20 dark:text-accent-400"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Architecture diagram */}
      <ArchitectureDiagram nodes={project.diagram} />

      <Field label="Problem" value={project.problem} />
      <Field label="Approach" value={project.approach} />
      <Field label="Outcome" value={project.outcome} />
    </motion.div>
  );
}

function ArchitectureDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-win border border-dashed border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-600 dark:bg-zinc-800/40"
      aria-label="Architecture diagram"
    >
      {nodes.map((node, i) => (
        <div key={node} className="flex items-center gap-2">
          <span className="rounded-win border border-accent-100 bg-white px-2.5 py-1 text-xs font-medium text-accent-700 shadow-sm dark:border-accent/40 dark:bg-zinc-900 dark:text-accent-400">
            {node}
          </span>
          {i < nodes.length - 1 && <ArrowRight size={14} className="text-zinc-400" />}
        </div>
      ))}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </h3>
      <p className="leading-relaxed">{value}</p>
    </div>
  );
}
