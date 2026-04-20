import type { ComponentType, CSSProperties, ReactElement } from 'react';
import {
  LogoReact,
  LogoNextJs,
  LogoTypeScript,
  LogoNodeJs,
  LogoPython,
  LogoTailwind,
  LogoPostgreSQL,
  LogoJava,
  LogoAws,
  LogoGit,
  LogoFigma,
  LogoVercel,
  LogoDocker,
  LogoSupabase,
} from './stack/StackLogos';

function rgbaHex(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function IconCodeSlash({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 7 5 12l4 5M15 7l4 5-4 5"
      />
    </svg>
  );
}

function IconLightning({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill={color}
        d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"
      />
    </svg>
  );
}

function IconTrophy({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 21h8M12 17v4M6 9V6h12v3M6 9H4v2a4 4 0 0 0 4 4h.5M18 9h2v2a4 4 0 0 1-4 4h-.5M9 9h6c0 4-1.5 6-3 6S9 13 9 9z"
      />
    </svg>
  );
}

function IconHammer({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14 4 6 6-3 3-2-2-5 5-2-2 5-5-2-2 3-3zm-8 14 3 3"
      />
    </svg>
  );
}

type PillDef = {
  label: string;
  color: string;
  Logo: ComponentType<Record<string, never>>;
};

const PILLS: PillDef[] = [
  { label: 'React', color: '#61DAFB', Logo: LogoReact },
  { label: 'Next.js', color: '#E0E0E0', Logo: LogoNextJs },
  { label: 'TypeScript', color: '#3178C6', Logo: LogoTypeScript },
  { label: 'Node.js', color: '#8CC84B', Logo: LogoNodeJs },
  { label: 'Python', color: '#FFD43B', Logo: LogoPython },
  { label: 'Tailwind CSS', color: '#38BDF8', Logo: LogoTailwind },
  { label: 'PostgreSQL', color: '#336791', Logo: LogoPostgreSQL },
  { label: 'Java', color: '#F89820', Logo: LogoJava },
  { label: 'AWS', color: '#FF9900', Logo: LogoAws },
  { label: 'Git', color: '#F05133', Logo: LogoGit },
  { label: 'Figma', color: '#A259FF', Logo: LogoFigma },
  { label: 'Vercel', color: '#E0E0E0', Logo: LogoVercel },
  { label: 'Docker', color: '#2496ED', Logo: LogoDocker },
  { label: 'Supabase', color: '#3ECF8E', Logo: LogoSupabase },
];

type CustomPill = {
  label: string;
  color: string;
  renderIcon: (color: string) => ReactElement;
};

const CUSTOM_PILLS: CustomPill[] = [
  { label: 'Full Stack', color: '#F2664A', renderIcon: (c) => <IconCodeSlash color={c} /> },
  { label: 'Problem Solver', color: '#C8F135', renderIcon: (c) => <IconLightning color={c} /> },
  { label: 'Top Performer', color: '#F59E0B', renderIcon: (c) => <IconTrophy color={c} /> },
  { label: 'Builder', color: '#A78BFA', renderIcon: (c) => <IconHammer color={c} /> },
];

const pillShellStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '999px',
  padding: '6px 14px',
  marginRight: '12px',
  whiteSpace: 'nowrap',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '13px',
  color: '#A8A8B8',
  flexShrink: 0,
};

export function Marquee() {
  const techRow = PILLS.map((pill) => {
    const BrandIcon = pill.Logo;
    return (
      <span style={pillShellStyle}>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: '4px',
            background: rgbaHex(pill.color, 0.15),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="marquee-pill-svg">
            <BrandIcon />
          </span>
        </span>
        {pill.label}
      </span>
    );
  });

  const customRow = CUSTOM_PILLS.map((pill) => (
    <span style={pillShellStyle}>
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '4px',
          background: rgbaHex(pill.color, 0.15),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="marquee-pill-svg marquee-pill-svg--custom">
          {pill.renderIcon(pill.color)}
        </span>
      </span>
      {pill.label}
    </span>
  ));

  const sequence = [...techRow, ...customRow];
  const looped = [...sequence, ...sequence];

  return (
    <div
      aria-hidden
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 0',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        className="marquee-ticker-track"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: 'max-content',
          animation: 'tickerScroll 30s linear infinite',
        }}
      >
        {looped.map((node, index) => (
          <span key={index}>{node}</span>
        ))}
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-pill-svg {
          display: flex;
          width: 12px;
          height: 12px;
          align-items: center;
          justify-content: center;
          line-height: 0;
        }
        .marquee-pill-svg svg {
          width: 12px;
          height: 12px;
          display: block;
          flex-shrink: 0;
        }
        .marquee-pill-svg--custom svg {
          overflow: visible;
        }
      `}</style>
    </div>
  );
}
