import type { CSSProperties } from 'react';

const TECH_COLORS: Record<
  string,
  { bg: string; border: string; color: string }
> = {
  React: {
    bg: 'rgba(97, 218, 251, 0.12)',
    border: 'rgba(97, 218, 251, 0.25)',
    color: '#61DAFB',
  },
  'Node.js': {
    bg: 'rgba(104, 160, 99, 0.12)',
    border: 'rgba(104, 160, 99, 0.25)',
    color: '#68A063',
  },
  'D3.js': {
    bg: 'rgba(242, 102, 74, 0.12)',
    border: 'rgba(242, 102, 74, 0.25)',
    color: '#F2664A',
  },
  PostgreSQL: {
    bg: 'rgba(51, 103, 145, 0.15)',
    border: 'rgba(51, 103, 145, 0.3)',
    color: '#7EB8D4',
  },
  TypeScript: {
    bg: 'rgba(49, 120, 198, 0.12)',
    border: 'rgba(49, 120, 198, 0.25)',
    color: '#3178C6',
  },
  Express: {
    bg: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.15)',
    color: '#E0E0E0',
  },
  Supabase: {
    bg: 'rgba(62, 207, 142, 0.12)',
    border: 'rgba(62, 207, 142, 0.25)',
    color: '#3ECF8E',
  },
  Tailwind: {
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.25)',
    color: '#38BDF8',
  },
  Firebase: {
    bg: 'rgba(255, 202, 40, 0.12)',
    border: 'rgba(255, 202, 40, 0.25)',
    color: '#FFCA28',
  },
  'Next.js': {
    bg: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.15)',
    color: '#E0E0E0',
  },
  Python: {
    bg: 'rgba(55, 118, 171, 0.12)',
    border: 'rgba(55, 118, 171, 0.25)',
    color: '#3776AB',
  },
  MongoDB: {
    bg: 'rgba(71, 162, 72, 0.12)',
    border: 'rgba(71, 162, 72, 0.25)',
    color: '#47A248',
  },
  Docker: {
    bg: 'rgba(36, 150, 237, 0.12)',
    border: 'rgba(36, 150, 237, 0.25)',
    color: '#2496ED',
  },
  Git: {
    bg: 'rgba(240, 80, 50, 0.12)',
    border: 'rgba(240, 80, 50, 0.25)',
    color: '#F05032',
  },
  Vercel: {
    bg: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.15)',
    color: '#E0E0E0',
  },
  'WhatsApp API': {
    bg: 'rgba(37, 211, 102, 0.12)',
    border: 'rgba(37, 211, 102, 0.28)',
    color: '#25D366',
  },
  'Claude API': {
    bg: 'rgba(167, 139, 250, 0.12)',
    border: 'rgba(167, 139, 250, 0.28)',
    color: '#C4B5FD',
  },
};

const BASE_PILL: CSSProperties = {
  display: 'inline-block',
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '11px',
  fontFamily: 'JetBrains Mono, monospace',
  backdropFilter: 'blur(8px) saturate(180%)',
  WebkitBackdropFilter: 'blur(8px) saturate(180%)',
  fontWeight: 500,
};

const DEFAULT_PILL: CSSProperties = {
  ...BASE_PILL,
  background: 'rgba(255, 255, 255, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  color: 'rgba(240, 237, 232, 0.7)',
};

function resolveTechKey(label: string): string {
  const t = label.trim();
  if (TECH_COLORS[t]) return t;
  if (t === 'Tailwind CSS' || /^tailwind\b/i.test(t)) return 'Tailwind';
  return t;
}

export function getTechTagPillStyle(label: string): CSSProperties {
  const key = resolveTechKey(label);
  const preset = TECH_COLORS[key];
  if (!preset) {
    return DEFAULT_PILL;
  }
  return {
    ...BASE_PILL,
    backgroundColor: preset.bg,
    border: `1px solid ${preset.border}`,
    color: preset.color,
  };
}

/** Experience section tags — extended map; unknown labels use default pill. */
const EXPERIENCE_TECH_COLORS: Record<
  string,
  { bg: string; border: string; color: string }
> = {
  React: {
    bg: 'rgba(97, 218, 251, 0.12)',
    border: 'rgba(97, 218, 251, 0.25)',
    color: '#61DAFB',
  },
  'Node.js': {
    bg: 'rgba(104, 160, 99, 0.12)',
    border: 'rgba(104, 160, 99, 0.25)',
    color: '#68A063',
  },
  PostgreSQL: {
    bg: 'rgba(51, 103, 145, 0.15)',
    border: 'rgba(51, 103, 145, 0.3)',
    color: '#7EB8D4',
  },
  'React Native': {
    bg: 'rgba(97, 218, 251, 0.10)',
    border: 'rgba(97, 218, 251, 0.2)',
    color: '#61DAFB',
  },
  Vercel: {
    bg: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.15)',
    color: '#E0E0E0',
  },
  'Full Stack': {
    bg: 'rgba(200, 241, 53, 0.10)',
    border: 'rgba(200, 241, 53, 0.2)',
    color: '#C8F135',
  },
  'Wireless Sales': {
    bg: 'rgba(96, 165, 250, 0.12)',
    border: 'rgba(96, 165, 250, 0.25)',
    color: '#60A5FA',
  },
  'Team Leadership': {
    bg: 'rgba(242, 102, 74, 0.10)',
    border: 'rgba(242, 102, 74, 0.2)',
    color: '#F2664A',
  },
  Training: {
    bg: 'rgba(251, 191, 36, 0.10)',
    border: 'rgba(251, 191, 36, 0.2)',
    color: '#FBBF24',
  },
  CRM: {
    bg: 'rgba(167, 139, 250, 0.10)',
    border: 'rgba(167, 139, 250, 0.2)',
    color: '#A78BFA',
  },
  Rogers: {
    bg: 'rgba(242, 102, 74, 0.12)',
    border: 'rgba(242, 102, 74, 0.25)',
    color: '#F2664A',
  },
  Fido: {
    bg: 'rgba(242, 102, 74, 0.08)',
    border: 'rgba(242, 102, 74, 0.15)',
    color: '#F2664A',
  },
  Chatr: {
    bg: 'rgba(242, 102, 74, 0.08)',
    border: 'rgba(242, 102, 74, 0.15)',
    color: '#F2664A',
  },
  'Excel Automation': {
    bg: 'rgba(71, 162, 72, 0.12)',
    border: 'rgba(71, 162, 72, 0.25)',
    color: '#47A248',
  },
  'KPI Tracking': {
    bg: 'rgba(251, 191, 36, 0.12)',
    border: 'rgba(251, 191, 36, 0.25)',
    color: '#FBBF24',
  },
  Electronics: {
    bg: 'rgba(96, 165, 250, 0.12)',
    border: 'rgba(96, 165, 250, 0.25)',
    color: '#60A5FA',
  },
  'Consultative Sales': {
    bg: 'rgba(200, 241, 53, 0.10)',
    border: 'rgba(200, 241, 53, 0.2)',
    color: '#C8F135',
  },
  'Retail Operations': {
    bg: 'rgba(251, 191, 36, 0.10)',
    border: 'rgba(251, 191, 36, 0.2)',
    color: '#FBBF24',
  },
};

export function getExperienceTechTagPillStyle(label: string): CSSProperties {
  const preset = EXPERIENCE_TECH_COLORS[label.trim()];
  if (!preset) {
    return DEFAULT_PILL;
  }
  return {
    ...BASE_PILL,
    backgroundColor: preset.bg,
    border: `1px solid ${preset.border}`,
    color: preset.color,
  };
}

/** Split stack card titles like "Node.js + Express" or "Git / GitHub" into pill labels. */
export function splitStackTechName(name: string): string[] {
  return name
    .split(/\s*(?:\/|\+)\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}
