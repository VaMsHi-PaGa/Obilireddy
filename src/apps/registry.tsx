import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import {
  Monitor,
  FolderOpen,
  SlidersHorizontal,
  Activity,
  Award,
  TerminalSquare,
  GitBranch,
  Mail,
  type LucideIcon,
} from 'lucide-react';
import type { AppId } from '../store/windowStore';

// Window content is lazy-loaded so the initial bundle stays lean.
const AboutApp = lazy(() => import('./AboutApp'));
const ProjectsApp = lazy(() => import('./ProjectsApp'));
const SkillsApp = lazy(() => import('./SkillsApp'));
const ExperienceApp = lazy(() => import('./ExperienceApp'));
const CertificationsApp = lazy(() => import('./CertificationsApp'));
const TerminalApp = lazy(() => import('./TerminalApp'));
const PipelineApp = lazy(() => import('./PipelineApp'));
const ContactApp = lazy(() => import('./ContactApp'));

export interface AppMeta {
  id: AppId;
  /** Title shown in the window title bar. */
  title: string;
  /** Windows-style alias shown on the desktop icon / Start menu. */
  alias: string;
  icon: LucideIcon;
  /** Accent color for the icon tile. */
  color: string;
  component: LazyExoticComponent<ComponentType>;
  /** Show as a desktop icon. */
  onDesktop: boolean;
}

export const apps: AppMeta[] = [
  {
    id: 'about',
    title: 'About this PC',
    alias: 'This PC',
    icon: Monitor,
    color: '#0067C0',
    component: AboutApp,
    onDesktop: true,
  },
  {
    id: 'projects',
    title: 'Projects — File Explorer',
    alias: 'File Explorer',
    icon: FolderOpen,
    color: '#E3A018',
    component: ProjectsApp,
    onDesktop: true,
  },
  {
    id: 'skills',
    title: 'Skills — Device Manager',
    alias: 'Settings',
    icon: SlidersHorizontal,
    color: '#5B5FC7',
    component: SkillsApp,
    onDesktop: true,
  },
  {
    id: 'experience',
    title: 'Experience — Task Manager',
    alias: 'Task Manager',
    icon: Activity,
    color: '#16A34A',
    component: ExperienceApp,
    onDesktop: true,
  },
  {
    id: 'certifications',
    title: 'Credentials',
    alias: 'Credentials',
    icon: Award,
    color: '#D4A017',
    component: CertificationsApp,
    onDesktop: true,
  },
  {
    id: 'terminal',
    title: 'Windows Terminal',
    alias: 'Terminal',
    icon: TerminalSquare,
    color: '#111827',
    component: TerminalApp,
    onDesktop: true,
  },
  {
    id: 'pipeline',
    title: 'CI/CD Pipeline',
    alias: 'Pipeline',
    icon: GitBranch,
    color: '#0EA5E9',
    component: PipelineApp,
    onDesktop: true,
  },
  {
    id: 'contact',
    title: 'Contact — Mail',
    alias: 'Mail',
    icon: Mail,
    color: '#0067C0',
    component: ContactApp,
    onDesktop: true,
  },
];

export const appMap: Record<AppId, AppMeta> = apps.reduce(
  (acc, app) => {
    acc[app.id] = app;
    return acc;
  },
  {} as Record<AppId, AppMeta>,
);
