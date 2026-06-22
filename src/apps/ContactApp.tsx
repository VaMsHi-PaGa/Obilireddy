import { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, Check } from 'lucide-react';
import { contact } from '../data/resume';

export default function ContactApp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (contact.formspreeEndpoint) {
      try {
        const res = await fetch(contact.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        if (!res.ok) throw new Error('Request failed');
        setSent(true);
      } catch {
        setError('Could not send via the form. Opening your mail client instead…');
        openMailto();
      }
    } else {
      // No Formspree endpoint configured → fall back to a mailto: draft.
      openMailto();
      setSent(true);
    }
  };

  const openMailto = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex h-full flex-col text-sm text-zinc-800 dark:text-zinc-200 md:flex-row">
      {/* Sidebar — Outlook-style account rail */}
      <aside className="border-b border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60 md:w-52 md:border-b-0 md:border-r">
        <h2 className="mb-3 font-semibold text-zinc-900 dark:text-white">Contact</h2>
        <ul className="flex flex-col gap-2 text-xs">
          <li>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 rounded-win p-2 text-zinc-600 transition hover:bg-accent-50 hover:text-accent-600 dark:text-zinc-300 dark:hover:bg-accent/20"
            >
              <Mail size={15} /> {contact.email}
            </a>
          </li>
          <li>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-win p-2 text-zinc-600 transition hover:bg-accent-50 hover:text-accent-600 dark:text-zinc-300 dark:hover:bg-accent/20"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </li>
          <li>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-win p-2 text-zinc-600 transition hover:bg-accent-50 hover:text-accent-600 dark:text-zinc-300 dark:hover:bg-accent/20"
            >
              <Github size={15} /> GitHub
            </a>
          </li>
          <li className="flex items-center gap-2 p-2 text-zinc-500 dark:text-zinc-400">
            <MapPin size={15} /> {contact.location}
          </li>
        </ul>
      </aside>

      {/* Compose pane */}
      <div className="flex-1 overflow-auto p-5">
        {sent ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
              <Check size={28} />
            </span>
            <p className="font-semibold text-zinc-900 dark:text-white">Message ready to send!</p>
            <p className="max-w-xs text-xs text-zinc-500 dark:text-zinc-400">
              {contact.formspreeEndpoint
                ? 'Thanks for reaching out — I’ll get back to you soon.'
                : 'Your email client should have opened with the draft. If not, email me directly.'}
            </p>
            <button
              onClick={() => {
                setSent(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
              className="mt-2 rounded-win border border-zinc-300 px-3 py-1.5 text-xs font-medium transition hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              Compose another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex h-full flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="c-name" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                From
              </label>
              <input
                id="c-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-win border border-zinc-300 bg-white px-3 py-2 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-zinc-600 dark:bg-zinc-800"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="c-email" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Email
              </label>
              <input
                id="c-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-win border border-zinc-300 bg-white px-3 py-2 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-zinc-600 dark:bg-zinc-800"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="c-msg" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Message
              </label>
              <textarea
                id="c-msg"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message…"
                className="min-h-[120px] flex-1 resize-none rounded-win border border-zinc-300 bg-white px-3 py-2 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-zinc-600 dark:bg-zinc-800"
              />
            </div>
            {error && <p className="text-xs text-amber-600 dark:text-amber-400">{error}</p>}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 self-end rounded-win bg-accent px-4 py-2 font-medium text-white shadow-win transition hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <Send size={15} /> Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
