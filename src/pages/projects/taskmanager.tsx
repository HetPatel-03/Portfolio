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
        .tm-nav {
          padding: 1rem 2rem;
          border-bottom: ${BORDER};
          background: ${BG};
        }
        .tm-main {
          max-width: 1120px;
          margin: 0 auto;
          padding: 2rem;
          border-left: ${BORDER};
        }
        @media (max-width: 640px) {
          .tm-nav { padding: 1rem 1.25rem; }
          .tm-main { padding: 1.25rem; }
        }
        .tm-section {
          padding: 1.5rem 0;
          border-bottom: ${BORDER};
        }
        .tm-muted { opacity: 0.65; }
        .tm-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0 0 0.75rem 0;
        }
        .tm-meta-pill {
          border: ${BORDER};
          padding: 0.35rem 0.6rem;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-block;
          background: ${BG};
          color: ${FG};
        }
        .tm-hero {
          border-top: ${BORDER};
          padding-top: 1.25rem;
        }
        .tm-hero-title {
          font-size: clamp(4rem, 10vw, 9rem);
          font-weight: 800;
          line-height: 0.95;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.02em;
        }
        .tm-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin: 1.25rem 0 0 0;
          padding: 1.25rem 0;
          border-bottom: ${BORDER};
        }
        .tm-btn {
          padding: 1rem 2rem;
          font-size: 1rem;
          border-radius: 0;
          border: ${BORDER};
          text-decoration: none;
          display: inline-block;
        }
        .tm-btn-primary { background: ${FG}; color: ${BG}; }
        .tm-btn-disabled {
          background: transparent;
          color: ${FG};
          opacity: 0.4;
          cursor: not-allowed;
          user-select: none;
        }

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
        className="tm-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
          <span style={{ ...mono, fontSize: 11, letterSpacing: '0.08em' }} className="tm-muted">
            [ PROJ-03 · 2026 ]
          </span>
        </div>
        <span style={{ ...mono, fontSize: 13 }}>hetppatel.dev</span>
      </header>

      <main className="tm-main">
        <section className="tm-section tm-hero">
          <p
            style={{
              ...mono,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 0.75rem 0',
            }}
          >
            PROJ / 03 · TASK MANAGER
          </p>
          <div className="tm-meta-row">
            <span className="tm-meta-pill" style={mono}>
              [ STATUS: IN PROGRESS ]
            </span>
            <span className="tm-meta-pill" style={mono}>
              [ YEAR: 2026 ]
            </span>
            <span className="tm-meta-pill" style={mono}>
              [ STACK: REACT + FIREBASE ]
            </span>
          </div>
          <h1 className="tm-hero-title" style={mono}>
            Drag. Drop. Done.
          </h1>
          <p style={{ ...mono, fontSize: 16, margin: '0 0 0.75rem 0', maxWidth: 760, lineHeight: 1.7 }}>
            A Kanban-style task management app with real-time sync, drag-and-drop, and keyboard-first
            editing.
          </p>
          <div className="tm-hero-actions">
            <a
              href="https://github.com/HetPatel-03"
              target="_blank"
              rel="noopener noreferrer"
              className="tm-btn tm-btn-primary"
              style={mono}
            >
              view on github →
            </a>
            <span
              className="tm-btn tm-btn-disabled"
              style={mono}
              aria-disabled
            >
              not deployed yet
            </span>
          </div>
        </section>

        <section className="tm-section">
          <div className="tm-stats">
          {[
            { k: 'STACK', v: 'React · Tailwind · Firebase' },
            { k: 'TYPE', v: 'Web App' },
            { k: 'STATUS', v: 'In Progress' },
            { k: 'YEAR', v: '2026' },
          ].map((row) => (
            <div
              key={row.k}
              style={{
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  ...mono,
                  fontSize: 10,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  background: FG,
                  color: BG,
                  padding: '0.45rem 0.75rem',
                }}
              >
                {row.k}
              </div>
              <div style={{ ...mono, fontSize: 14, padding: '0.9rem 0.75rem' }}>{row.v}</div>
            </div>
          ))}
          </div>
        </section>

        <section className="tm-section">
          <div className="tm-prob-sol" style={{ border: BORDER }}>
            <Box style={{ padding: 0, border: 'none' }}>
              <div
                style={{
                  ...mono,
                  background: FG,
                  color: BG,
                  padding: '0.5rem 1rem',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                // THE PROBLEM
              </div>
              <div style={{ padding: '1.25rem 1rem' }}>
                <p style={{ ...mono, fontSize: 16, lineHeight: 1.8, margin: 0 }}>
              Most task apps are bloated with features nobody uses. Students and developers need
              something fast, keyboard-friendly, and distraction-free.
                </p>
              </div>
            </Box>
            <Box style={{ padding: 0, border: 'none' }}>
              <div
                style={{
                  ...mono,
                  background: FG,
                  color: BG,
                  padding: '0.5rem 1rem',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                // THE SOLUTION
              </div>
              <div style={{ padding: '1.25rem 1rem' }}>
                <p style={{ ...mono, fontSize: 16, lineHeight: 1.8, margin: 0 }}>
              A minimal Kanban board with drag-and-drop cards, real-time Firebase sync, and full
              keyboard navigation. No accounts needed to try it.
                </p>
              </div>
            </Box>
          </div>
        </section>

        <section className="tm-section">
          <div className="tm-feat-grid">
            {features.map((text) => {
              const m = text.match(/^\[\s*(\d+)\s*\]\s*(.*)$/);
              const num = m?.[1] ?? '';
              const rest = m?.[2] ?? text;
              return (
                <div key={text} style={{ padding: '1.5rem 1.25rem' }}>
                  <div
                    style={{
                      ...mono,
                      background: FG,
                      color: BG,
                      padding: '0.5rem 1rem',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                    }}
                  >
                    FEATURE\n+                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        ...mono,
                        background: FG,
                        color: BG,
                        display: 'inline-block',
                        padding: '2px 8px',
                        fontSize: 11,
                      }}
                    >
                      {num ? `[ ${num} ]` : '[ 00 ]'}
                    </span>
                  </div>
                  <p style={{ ...mono, fontSize: 14, lineHeight: 1.8, margin: 0 }}>{rest}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="tm-section" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'inline-flex', flexWrap: 'nowrap', minWidth: 'min-content', maxWidth: '100%', gap: 0 }}>
            {techPills.map((t, i) => (
              <span
                key={t}
                style={{
                  ...mono,
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  border: BORDER,
                  borderRadius: 0,
                  fontSize: 12,
                  marginLeft: i > 0 ? -2 : 0,
                  position: 'relative' as const,
                  zIndex: i,
                  background: FG,
                  color: BG,
                  whiteSpace: 'nowrap',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="tm-section">
          <div style={{ ...mono, fontSize: 12, fontWeight: 600, marginBottom: '1rem' }}>
            // SCREENSHOTS
          </div>
          <div className="tm-shots">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  minHeight: 280,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  boxSizing: 'border-box',
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #0A0A0A 0, #0A0A0A 1px, transparent 0, transparent 50%)',
                  backgroundSize: '8px 8px',
                  backgroundColor: BG,
                  opacity: 1,
                }}
              >
                <span style={{ ...mono, fontSize: 12, textAlign: 'center', opacity: 0.6 }}>
                  [ SCREENSHOT · COMING SOON ]
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
          padding: '1.5rem 2rem',
          borderTop: BORDER,
          background: FG,
          color: BG,
        }}
      >
        <span style={{ ...mono, fontSize: 12, color: BG }}>PROJ / 03 · TASK MANAGER · 2026</span>
        <button
          type="button"
          onClick={backToProjects}
          style={{
            ...mono,
            fontSize: 12,
            background: 'none',
            border: 'none',
            padding: 0,
            color: BG,
            cursor: 'pointer',
          }}
        >
          ← back to projects
        </button>
      </footer>
    </div>
  );
}
