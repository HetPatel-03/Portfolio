import type { CSSProperties, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const BG = '#F5F0E8';
const FG = '#0A0A0A';
const BORDER = `2px solid ${FG}`;
const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

function Box({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        border: BORDER,
        borderRadius: 0,
        background: BG,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const features = [
  '[ 01 ] Drag-and-drop Kanban board across Todo, In Progress, Done columns',
  '[ 02 ] Real-time sync with Firebase — changes reflect instantly across tabs',
  '[ 03 ] Keyboard-first editing — add, edit and move cards without touching the mouse',
  '[ 04 ] Built with React and Tailwind — fast, lightweight, no unnecessary dependencies',
  '[ 05 ] Clean brutalist UI — distraction-free by design',
  '[ 06 ] Mobile responsive — works on any screen size',
];

const techPills = ['React', 'Tailwind CSS', 'Firebase', 'Vite', 'TypeScript'];

export default function TaskManagerProjectPage() {
  const navigate = useNavigate();

  const backToProjects = () => {
    navigate('/#projects');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: BG,
        color: FG,
        ...mono,
        fontSize: 14,
        lineHeight: 1.6,
      }}
    >
      <style>{`
        .tm-stats {
          display: grid;
          grid-template-columns: 1fr;
          border: ${BORDER};
        }
        @media (min-width: 1024px) {
          .tm-stats { grid-template-columns: repeat(4, 1fr); }
          .tm-stats > div:not(:last-child) { border-right: ${BORDER}; border-bottom: none; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .tm-stats { grid-template-columns: repeat(2, 1fr); }
          .tm-stats > div:nth-child(1), .tm-stats > div:nth-child(2) { border-bottom: ${BORDER}; }
          .tm-stats > div:nth-child(1), .tm-stats > div:nth-child(3) { border-right: ${BORDER}; }
        }
        @media (max-width: 639px) {
          .tm-stats > div:not(:last-child) { border-bottom: ${BORDER}; }
        }
        .tm-prob-sol {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .tm-prob-sol { grid-template-columns: 1fr 1fr; }
          .tm-prob-sol > div:first-child { border-right: ${BORDER} !important; }
        }
        @media (max-width: 767px) {
          .tm-prob-sol > div:first-child { border-bottom: ${BORDER} !important; }
        }
        .tm-feat-grid {
          display: grid;
          grid-template-columns: 1fr;
          border: ${BORDER};
        }
        @media (min-width: 768px) {
          .tm-feat-grid { grid-template-columns: repeat(3, 1fr); }
          .tm-feat-grid > div {
            border-right: ${BORDER};
            border-bottom: ${BORDER};
          }
          .tm-feat-grid > div:nth-child(3n) { border-right: none; }
          .tm-feat-grid > div:nth-last-child(-n+3) { border-bottom: none; }
        }
        @media (max-width: 767px) {
          .tm-feat-grid > div { border-bottom: ${BORDER}; }
          .tm-feat-grid > div:last-child { border-bottom: none; }
        }
        .tm-shots {
          display: grid;
          grid-template-columns: 1fr;
          border: ${BORDER};
        }
        @media (min-width: 640px) {
          .tm-shots { grid-template-columns: repeat(3, 1fr); }
          .tm-shots > div:not(:last-child) { border-right: ${BORDER}; border-bottom: none; }
        }
        @media (max-width: 639px) {
          .tm-shots > div:not(:last-child) { border-bottom: ${BORDER}; }
        }
      `}</style>

      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          borderBottom: BORDER,
          background: BG,
        }}
      >
        <button
          type="button"
          onClick={backToProjects}
          style={{
            ...mono,
            fontSize: 13,
            background: 'none',
            border: 'none',
            padding: 0,
            color: FG,
            cursor: 'pointer',
          }}
        >
          ← back
        </button>
        <span style={{ ...mono, fontSize: 13 }}>hetppatel.dev</span>
      </header>

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
        <section style={{ marginBottom: '3rem' }}>
          <p
            style={{
              ...mono,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 1.25rem 0',
            }}
          >
            PROJ / 03 · TASK MANAGER
          </p>
          <h1
            style={{
              ...mono,
              fontSize: 'clamp(2rem, 6vw, 3.25rem)',
              fontWeight: 700,
              margin: '0 0 1rem 0',
              lineHeight: 1.1,
            }}
          >
            Drag. Drop. Done.
          </h1>
          <p style={{ ...mono, fontSize: 15, margin: '0 0 1.5rem 0', maxWidth: 640 }}>
            A Kanban-style task management app with real-time sync, drag-and-drop, and keyboard-first
            editing.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <a
              href="https://github.com/HetPatel-03"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...mono,
                display: 'inline-block',
                padding: '0.65rem 1.25rem',
                background: FG,
                color: BG,
                border: BORDER,
                textDecoration: 'none',
                fontSize: 13,
                borderRadius: 0,
              }}
            >
              view on github →
            </a>
            <span
              style={{
                ...mono,
                display: 'inline-block',
                padding: '0.65rem 1.25rem',
                border: BORDER,
                background: 'transparent',
                color: FG,
                fontSize: 13,
                opacity: 0.4,
                cursor: 'not-allowed',
                userSelect: 'none',
              }}
              aria-disabled
            >
              not deployed yet
            </span>
          </div>
          <p
            style={{
              ...mono,
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            <span style={{ marginRight: 8 }}>●</span>
            IN PROGRESS
          </p>
        </section>

        <section className="tm-stats" style={{ marginBottom: '3rem' }}>
          {[
            { k: 'STACK', v: 'React · Tailwind · Firebase' },
            { k: 'TYPE', v: 'Web App' },
            { k: 'STATUS', v: 'In Progress' },
            { k: 'YEAR', v: '2026' },
          ].map((row) => (
            <div key={row.k} style={{ padding: '1rem 1.1rem' }}>
              <div style={{ ...mono, fontSize: 10, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                {row.k}
              </div>
              <div style={{ ...mono, fontSize: 13 }}>{row.v}</div>
            </div>
          ))}
        </section>

        <section className="tm-prob-sol" style={{ marginBottom: '3rem', border: BORDER }}>
          <Box style={{ padding: '1.25rem 1.5rem', border: 'none' }}>
            <div style={{ ...mono, fontSize: 12, fontWeight: 600, marginBottom: '1rem' }}>
              // THE PROBLEM
            </div>
            <p style={{ ...mono, fontSize: 14, margin: 0 }}>
              Most task apps are bloated with features nobody uses. Students and developers need
              something fast, keyboard-friendly, and distraction-free.
            </p>
          </Box>
          <Box style={{ padding: '1.25rem 1.5rem', border: 'none' }}>
            <div style={{ ...mono, fontSize: 12, fontWeight: 600, marginBottom: '1rem' }}>
              // THE SOLUTION
            </div>
            <p style={{ ...mono, fontSize: 14, margin: 0 }}>
              A minimal Kanban board with drag-and-drop cards, real-time Firebase sync, and full
              keyboard navigation. No accounts needed to try it.
            </p>
          </Box>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <div className="tm-feat-grid">
            {features.map((text) => (
              <div key={text} style={{ padding: '1rem 1.1rem' }}>
                <p style={{ ...mono, fontSize: 13, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem', overflowX: 'auto' }}>
          <div style={{ display: 'inline-flex', flexWrap: 'nowrap', minWidth: 'min-content', maxWidth: '100%' }}>
            {techPills.map((t, i) => (
              <span
                key={t}
                style={{
                  ...mono,
                  display: 'inline-block',
                  padding: '0.45rem 0.9rem',
                  border: BORDER,
                  borderRadius: 0,
                  fontSize: 12,
                  marginLeft: i > 0 ? -2 : 0,
                  position: 'relative' as const,
                  zIndex: i,
                  background: BG,
                  whiteSpace: 'nowrap',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <div style={{ ...mono, fontSize: 12, fontWeight: 600, marginBottom: '1rem' }}>
            // SCREENSHOTS
          </div>
          <div className="tm-shots">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  minHeight: 140,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ ...mono, fontSize: 12, textAlign: 'center', opacity: 0.7 }}>
                  [ screenshot coming soon ]
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1rem 1.25rem',
          borderTop: BORDER,
          background: BG,
        }}
      >
        <span style={{ ...mono, fontSize: 12 }}>PROJ / 03 · TASK MANAGER · 2026</span>
        <button
          type="button"
          onClick={backToProjects}
          style={{
            ...mono,
            fontSize: 12,
            background: 'none',
            border: 'none',
            padding: 0,
            color: FG,
            cursor: 'pointer',
          }}
        >
          ← back to projects
        </button>
      </footer>
    </div>
  );
}
