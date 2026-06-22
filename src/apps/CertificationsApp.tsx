import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';
import { certifications, type Certification } from '../data/resume';

export default function CertificationsApp() {
  const [selected, setSelected] = useState<Certification | null>(null);

  return (
    <div className="relative flex h-full flex-col text-sm text-zinc-800 dark:text-zinc-200">
      <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/60">
        This PC › Credentials · {certifications.length} items
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {certifications.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setSelected(cert)}
              className="group flex flex-col items-center gap-2 rounded-win p-3 text-center transition hover:bg-accent-50 focus:bg-accent-50 focus:outline-none focus:ring-2 focus:ring-accent dark:hover:bg-accent/20 dark:focus:bg-accent/20"
            >
              <span className="relative flex h-14 w-14 items-center justify-center rounded-winlg bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-win transition group-hover:scale-105">
                <Award size={28} />
              </span>
              <span className="line-clamp-2 text-xs font-medium">{cert.name}</span>
              <span className="text-[10px] text-zinc-400">{cert.issuer}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-sm rounded-winlg border border-zinc-200 bg-white p-6 text-center shadow-winfocus dark:border-zinc-700 dark:bg-zinc-900"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 rounded p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-winlg bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-win">
                <Award size={32} />
              </span>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                {selected.name}
              </h3>
              <p className="text-accent-500">{selected.issuer}</p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {selected.short}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
