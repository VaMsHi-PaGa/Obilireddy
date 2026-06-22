import { useEffect, useRef, useState } from 'react';
import { useWindowStore, type AppId } from '../store/windowStore';
import {
  contact,
  summary,
  skillGroups,
  projects,
  experience,
  certifications,
  company,
} from '../data/resume';

interface Line {
  type: 'cmd' | 'out';
  text: string;
}

const PROMPT = 'sai@saiOS:~$';

const BANNER = [
  '   ___       _  ___  ___ ',
  '  / __| __ _(_)/ _ \\/ __|',
  "  \\__ \\/ _` | | (_) \\__ \\",
  '  |___/\\__,_|_|\\___/|___/',
  '',
  `  saiOS Terminal · ${contact.name}`,
  "  Type 'help' to list commands.",
  '',
];

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>(() => BANNER.map((text) => ({ type: 'out', text })));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openWindow = useWindowStore((s) => s.openWindow);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (text: string | string[]) => {
    const arr = Array.isArray(text) ? text : [text];
    setLines((prev) => [...prev, ...arr.map((t) => ({ type: 'out' as const, text: t }))]);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    setLines((prev) => [...prev, { type: 'cmd', text: `${PROMPT} ${cmd}` }]);
    if (!cmd) return;

    setHistory((prev) => [...prev, cmd]);
    setHistIdx(-1);

    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(' ');

    switch (name.toLowerCase()) {
      case 'help':
        print([
          'Available commands:',
          '  help        Show this help',
          '  whoami      Who is Sairam?',
          '  about       Professional summary',
          '  skills      Technical skills',
          '  projects    Featured projects',
          '  experience  Career timeline',
          '  certs       Certifications',
          '  contact     Get in touch',
          '  resume      Open / download résumé',
          '  open <app>  Open an app window (about, projects, skills...)',
          '  clear       Clear the screen',
          '  sudo        Try it and see',
          '',
          "  Easter eggs: neofetch, ls, terraform, coffee, motd, date",
        ]);
        break;

      case 'whoami':
        print([
          contact.name,
          `${contact.title} · ${contact.location}`,
          'Windows sysadmin turned cloud/DevOps automation engineer.',
        ]);
        break;

      case 'about':
        print(wrap(summary));
        break;

      case 'skills':
        skillGroups.forEach((g) => {
          print(`${g.category}: ${g.skills.map((s) => s.name).join(', ')}`);
        });
        break;

      case 'projects':
        projects.forEach((p, i) => {
          print([`${i + 1}. ${p.name}  [${p.tech.join(', ')}]`, `   ${p.outcome}`]);
        });
        print(["", "Tip: run 'open projects' to browse them in File Explorer."]);
        break;

      case 'experience':
        print(company);
        [...experience].reverse().forEach((r) => {
          print(`  ${r.start} — ${r.end}  ·  ${r.title}`);
        });
        break;

      case 'certs':
      case 'certifications':
        certifications.forEach((c) => print(`  ✔ ${c.name} — ${c.issuer}`));
        break;

      case 'contact':
        print([
          `Email:    ${contact.email}`,
          `LinkedIn: ${contact.linkedin}`,
          `GitHub:   ${contact.github}`,
          `Location: ${contact.location}`,
          '',
          "Run 'open contact' to compose a message.",
        ]);
        break;

      case 'resume': {
        print('Opening résumé (resume.pdf)...');
        const base = import.meta.env.BASE_URL;
        window.open(`${base}resume.pdf`, '_blank', 'noopener');
        break;
      }

      case 'open': {
        const valid: AppId[] = [
          'about',
          'projects',
          'skills',
          'experience',
          'certifications',
          'terminal',
          'pipeline',
          'contact',
        ];
        const target = arg.toLowerCase() as AppId;
        if (valid.includes(target)) {
          print(`Launching ${target}...`);
          openWindow(target);
        } else {
          print(`open: unknown app '${arg || ''}'. Try: ${valid.join(', ')}`);
        }
        break;
      }

      case 'clear':
      case 'cls':
        setLines([]);
        return;

      case 'sudo':
        print([
          'sai is not in the sudoers file. This incident will be reported. 👮',
          "(Relax — it's a portfolio. You already have root over the hiring decision.)",
        ]);
        break;

      // ── Easter eggs ──────────────────────────────────────────────
      case 'neofetch':
        print([
          `${contact.name}@saiOS`,
          '-----------------',
          'OS:        saiOS 11 (Fluent build)',
          'Kernel:    cloud-native 6.x',
          'Uptime:    6 years in IT infrastructure',
          'Shell:     bash + pwsh',
          'IaC:       Terraform, Ansible',
          'CI/CD:     Azure DevOps',
          'Cloud:     Azure',
          'Status:    Deployments ✅ green',
        ]);
        break;

      case 'ls':
        print('about/  projects/  skills/  experience/  credentials/  resume.pdf  contact');
        break;

      case 'terraform':
        if (arg.startsWith('apply')) {
          print([
            'Terraform will perform the following actions:',
            '  + azurerm_resource_group.career      will be created',
            '  + azurerm_role.senior_devops         will be created',
            '',
            'Plan: 1 to hire, 0 to change, 0 to destroy.',
            "Apply complete! Resources: 1 added. 🎉",
          ]);
        } else {
          print("Usage: terraform apply   (the only plan that matters)");
        }
        break;

      case 'coffee':
        print('☕  Brewing... HTTP 418: I’m a teapot. Deploy anyway.');
        break;

      case 'motd':
        print('“Automate the boring, risky parts of ops — and keep the build green.”');
        break;

      case 'date':
        print(new Date().toString());
        break;

      case 'echo':
        print(arg);
        break;

      case 'exit':
        print("There's no escape — but you can close the window. 🙂");
        break;

      default:
        print(`Command not found: ${name}. Type 'help' for a list.`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="flex h-full cursor-text flex-col bg-[#0c0c0c] font-mono text-[13px] leading-relaxed text-zinc-200"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-auto p-3">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap break-words ${
              line.type === 'cmd' ? 'text-green-400' : 'text-zinc-300'
            }`}
          >
            {line.text}
          </div>
        ))}

        {/* Active input line */}
        <div className="flex items-center text-green-400">
          <span className="shrink-0">{PROMPT}&nbsp;</span>
          <span className="whitespace-pre text-zinc-100">{input}</span>
          <span className="ml-px inline-block h-[15px] w-[7px] animate-blink bg-zinc-200" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="absolute h-0 w-0 opacity-0"
            aria-label="Terminal input"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

// Wrap long text to ~78 cols for terminal readability.
function wrap(text: string, width = 78): string[] {
  const words = text.split(' ');
  const out: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + w).length > width) {
      out.push(line.trimEnd());
      line = '';
    }
    line += w + ' ';
  }
  if (line.trim()) out.push(line.trimEnd());
  return out;
}
