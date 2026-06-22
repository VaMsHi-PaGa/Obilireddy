# saiOS — an interactive Windows-desktop DevOps portfolio

A single-page portfolio for **Sairam Reddy Obili** (Senior DevOps / Cloud Engineer),
built as a polished, Windows 11 / Fluent-styled desktop environment called **saiOS**.

The career arc is the hook: from **Windows systems administration** to
**cloud infrastructure automation & DevOps** at Cognizant. The whole UI leans into
that journey — a boot/POST sequence, a lock screen, a wallpaper, desktop icons,
a taskbar with Start menu and system tray, and **draggable, resizable, minimizable**
windows. Each résumé section is an "app".

![saiOS](https://img.shields.io/badge/saiOS-11-0067C0)

## ✨ Features

- **Boot → lock → desktop** intro (under ~2.5s, click-to-skip).
- **Window manager**: open / close / minimize / maximize / focus, drag & resize,
  z-index ordering, taskbar with active-window indicators and tooltips.
- **Start menu** with acrylic blur, pinned apps, and a fake **Restart** that replays boot.
- **System tray**: live clock, network, volume, `deployments: ✅ green`, and a
  light/dark **theme toggle** (defaults to dark).
- **Apps** (each résumé section):
  - **About this PC** — bio, the Windows-admin → DevOps story, system-spec gag.
  - **File Explorer → Projects** — folders that open to problem / approach / tech /
    outcome with a small architecture diagram.
  - **Device Manager → Skills** — categorized skills with proficiency bars.
  - **Task Manager → Experience** — a "Performance"-style rising career timeline.
  - **Credentials → Certifications** — badge files you can open.
  - **Windows Terminal** — a real typed terminal (history, blinking cursor, easter eggs).
  - **CI/CD Pipeline** — an animated build → test → deploy widget.
  - **Mail → Contact** — Outlook-style compose (mailto: or Formspree).
- **Animated CI/CD pipeline** and **terminal** reinforce the DevOps identity.
- **Mobile fallback**: a phone-style home screen with full-screen app sheets — all
  content reachable, no horizontal overflow.
- **Accessibility**: semantic HTML, keyboard navigation, ARIA labels on window controls,
  visible focus states, and `prefers-reduced-motion` support.

## 🧰 Tech stack

React + Vite + TypeScript · Tailwind CSS · Framer Motion · Zustand (window-manager
store) · react-rnd (drag/resize) · lucide-react (icons). No backend — fully static.

## 🚀 Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check + production build into dist/
npm run preview    # preview the production build locally
npm run lint       # eslint
```

## ✏️ Editing content

**All résumé content lives in one typed file: [`src/data/resume.ts`](src/data/resume.ts).**
Edit name, summary, the Windows-admin → DevOps story, experience, skills, projects,
certifications, education, and contact links there — everything else reads from it.

A few `TODO`s to personalize:

- **`src/data/resume.ts`** — set real `linkedin` / `github` URLs, and (optionally) a
  `formspreeEndpoint`. While it's `null`, the Contact app uses a `mailto:` draft.
- **`public/resume.pdf`** — replace the placeholder PDF with the real résumé.

## 📦 Project structure

```
src/
  apps/        # one component per "app" window + registry.tsx (metadata)
  components/  # desktop chrome: Boot, LockScreen, Desktop, Window, Taskbar, StartMenu…
  store/       # windowStore (window manager) + systemStore (phase/theme)
  data/        # resume.ts — single source of truth
  hooks/       # media query, clock, reduced-motion
public/        # resume.pdf
```

## 🌐 Deploying to Netlify

This site is configured for **Netlify**. Build settings live in
[`netlify.toml`](netlify.toml) (build command `npm run build`, publish directory
`dist`, Node 20, and an SPA redirect).

1. In Netlify, **Add new site → Import an existing project** and connect this
   GitHub repo (or drag-and-drop the `dist/` folder for a manual deploy).
2. Netlify reads `netlify.toml` automatically — no manual build settings needed.
3. Every push to the production branch redeploys.

> **Base path:** Vite's `base` is `/` (Netlify serves from the domain root).
> If you ever host under a sub-path instead — e.g. GitHub Pages at `/<repo>/` —
> set `base` to `/<repo>/` in [`vite.config.ts`](vite.config.ts).

## 📄 License

Personal portfolio content © Sairam Reddy Obili. Code is free to learn from and adapt.
