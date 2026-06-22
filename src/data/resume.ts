// ─────────────────────────────────────────────────────────────────────────────
// saiOS — single source of truth for all résumé content.
// Edit this file to update the portfolio. Everything else reads from here.
// ─────────────────────────────────────────────────────────────────────────────

export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  /** Phone is sensitive (spam). Kept here but NOT rendered publicly by default. */
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  /** Formspree endpoint for the Contact app. TODO: replace with a real endpoint. */
  formspreeEndpoint: string | null;
}

export interface ExperienceRole {
  title: string;
  start: string; // e.g. "Apr 2024"
  end: string; // e.g. "Present"
  /** Numeric position used to plot the rising career line (higher = more senior). */
  level: number;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[]; // level 0–100
}

export interface Project {
  id: string;
  name: string;
  tech: string[];
  problem: string;
  approach: string;
  outcome: string;
  /** Lightweight architecture diagram: ordered nodes rendered as a flow. */
  diagram: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  short: string;
}

export const contact: ContactInfo = {
  name: 'Sairam Reddy Obili',
  title: 'Senior DevOps / Cloud Engineer',
  email: 'work@saiobili.com',
  phone: '+32 465428540',
  location: 'Belgium',
  linkedin: 'https://www.linkedin.com/in/saiobili',
  github: 'https://github.com/saiobili',
  // TODO: create a form at https://formspree.io and paste the endpoint here,
  // e.g. 'https://formspree.io/f/xxxxxxxx'. While null, the Contact app uses mailto:.
  formspreeEndpoint: null,
};

export const summary =
  'Results-driven IT professional with 6 years of experience in IT infrastructure ' +
  'services, specializing in infrastructure automation with Terraform and Ansible. ' +
  'Designs CI/CD pipelines, automates cloud resource management, and scripts in ' +
  'PowerShell and Bash. Experienced with Docker, Git, and Agile to drive operational ' +
  'efficiency and streamline deployments.';

// The narrative hook: Windows sysadmin → cloud/DevOps automation.
export const story =
  'My career started deep in Windows systems administration — Active Directory, ' +
  'Group Policy, DNS, and keeping fleets of servers healthy. That hands-on ops ' +
  'foundation became the launchpad for everything since: I moved into cloud ' +
  'infrastructure automation, replacing manual toil with Terraform modules, ' +
  'Ansible playbooks, and Azure DevOps pipelines. Today I design Azure Landing ' +
  'Zones and self-service automation that lets teams ship safely and repeatably. ' +
  'Same instinct, bigger blast radius: make the boring, risky parts of ops ' +
  'automated, version-controlled, and green.';

export const company = 'Cognizant Technology Solutions';

export const experience: ExperienceRole[] = [
  { title: 'Program Analyst', start: 'Jun 2019', end: 'Dec 2021', level: 1 },
  { title: 'Associate', start: 'Jan 2022', end: 'Mar 2024', level: 2 },
  { title: 'Senior Associate', start: 'Apr 2024', end: 'Present', level: 3 },
];

export const experienceFocus: { area: string; detail: string }[] = [
  {
    area: 'Azure administration & resource management',
    detail:
      'Resource Groups, VNets, VMs, NSGs, Storage Accounts, Application Gateways; ' +
      'Azure Policy compliance and resource tagging; Azure Dashboards, Checkmk and ' +
      'Azure Monitor for monitoring and alerting.',
  },
  {
    area: 'Infrastructure as Code (Terraform)',
    detail:
      'Custom Terraform modules for Azure Landing Zone deployments, version-controlled ' +
      'in Azure Repos and deployed via Azure DevOps Pipelines.',
  },
  {
    area: 'Configuration management (Ansible)',
    detail:
      'Migrated DNS management to Ansible; automated Active Directory onboarding and ' +
      'management; OS hardening for Windows and Linux.',
  },
  {
    area: 'Identity & access management',
    detail: 'Entra ID, LDAP, OpenID Connect, SAML; Active Directory and Group Policies.',
  },
  {
    area: 'Scripting (PowerShell)',
    detail: 'Automated health checks and recurring tasks; Azure resource support scripts.',
  },
  {
    area: 'CI/CD & DevOps',
    detail:
      'Classic and YAML pipelines in Azure DevOps; Semaphore; Docker and Kubernetes ' +
      'for containerized apps.',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Cloud',
    skills: [{ name: 'Microsoft Azure', level: 92 }],
  },
  {
    category: 'CI/CD',
    skills: [
      { name: 'Azure DevOps', level: 90 },
      { name: 'Semaphore', level: 75 },
    ],
  },
  {
    category: 'Infrastructure as Code',
    skills: [
      { name: 'Terraform', level: 92 },
      { name: 'Ansible', level: 85 },
      { name: 'ARM Templates', level: 78 },
    ],
  },
  {
    category: 'Version Control & Scripting',
    skills: [
      { name: 'Git', level: 88 },
      { name: 'Azure Repos', level: 85 },
      { name: 'PowerShell', level: 88 },
      { name: 'Bash', level: 80 },
    ],
  },
  {
    category: 'Containers',
    skills: [
      { name: 'Docker', level: 84 },
      { name: 'Kubernetes', level: 76 },
    ],
  },
  {
    category: 'Monitoring',
    skills: [
      { name: 'Azure Monitor', level: 85 },
      { name: 'Checkmk', level: 78 },
      { name: 'Azure Dashboards', level: 82 },
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: 'terraform-associate',
    name: 'Terraform Associate',
    issuer: 'HashiCorp Certified',
    short: 'Infrastructure as Code with Terraform — provisioning, state, and modules.',
  },
  {
    id: 'azure-admin',
    name: 'Azure Administrator Associate',
    issuer: 'Microsoft Certified',
    short: 'Implement, manage and monitor Azure identity, storage, compute and networking.',
  },
  {
    id: 'devops-expert',
    name: 'DevOps Engineer Expert',
    issuer: 'Microsoft Certified',
    short: 'Design and implement DevOps practices: CI/CD, IaC, and release strategies.',
  },
];

export const projects: Project[] = [
  {
    id: 'azure-landing-zone',
    name: 'Azure Landing Zone Deployment',
    tech: ['Terraform', 'Azure Repos', 'Azure Pipelines'],
    problem:
      'Onboarding new customers into Azure was slow, manual, and inconsistent — every ' +
      'environment was hand-built, and engineers needed deep Terraform knowledge to help.',
    approach:
      'Built custom Azure Landing Zone (ALZ) modules and a CSV-driven deployment model so ' +
      'users supply configuration without writing Terraform. Provisioning is fully automated ' +
      'and version-controlled, with CI/CD via Azure Repos and Azure Pipelines.',
    outcome:
      'Consistent, repeatable environment onboarding with guardrails baked in — faster ' +
      'customer ramp-up and far less manual setup risk.',
    diagram: ['CSV config', 'Terraform ALZ modules', 'Azure Pipelines', 'Azure Landing Zone'],
  },
  {
    id: 'azure-virtual-desktop',
    name: 'Azure Virtual Desktop Deployment',
    tech: ['Terraform', 'Azure Repos', 'Azure Pipelines'],
    problem:
      'Customer AVD environments depended on Nerdio, adding cost and a third-party ' +
      'dependency to the desktop delivery stack.',
    approach:
      'Built custom Terraform modules to automate AVD deployments end to end, fully ' +
      'replacing Nerdio. A YAML-driven configuration model keeps inputs simple, and CI/CD ' +
      'integration makes rollouts repeatable and scalable.',
    outcome:
      'Removed the Nerdio dependency, simplified configuration, and made AVD rollouts ' +
      'repeatable across customer environments.',
    diagram: ['YAML config', 'Terraform AVD modules', 'Azure Pipelines', 'Azure Virtual Desktop'],
  },
];

export const education = {
  degree: 'B.Tech, Electronics and Communication Engineering',
  school: 'Sree Vidyanikethan Engineering College',
  period: 'Jul 2015 – May 2019',
};

export const systemSpec = {
  os: 'saiOS 11',
  role: 'Sr. DevOps Engineer',
  uptime: '6 yrs',
  region: 'Belgium (EU West)',
  deployments: 'green',
};

// Lock-screen Easter egg tagline — nods to the Windows-admin → DevOps journey.
export const lockTagline = 'From Group Policy to GitOps — automating the boring, risky parts of ops.';
