import type { CSSProperties, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const BG = '#F5F0E8';
const FG = '#0A0A0A';
const CRIMSON = '#C2185B';
const PURPLE = '#7C3AED';
const BORDER = `2px solid ${FG}`;
const BORDER_PURPLE = `2px solid ${PURPLE}`;
const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const MUTED = 'rgba(10,10,10,0.45)';

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

const features: { num: string; text: string; roadmap: boolean }[] = [
  {
    num: '01',
    text: 'Scrollable week strip (Mon–Sun) with a pill to jump between weeks — your whole week visible in one swipe',
    roadmap: false,
  },
  {
    num: '02',
    text: 'One-tap + to add a task — no forms, no friction, no date required',
    roadmap: false,
  },
  {
    num: '03',
    text: '4 views: Daily, Weekly, Calendar, Task list — switch instantly',
    roadmap: false,
  },
  {
    num: '04',
    text: 'Brain Dump — a dateless, timeless capture zone for ideas and future tasks',
    roadmap: false,
  },
  {
    num: '05',
    text: 'AI sentence-to-task parser (roadmap) — type naturally, app structures it',
    roadmap: true,
  },
  {
    num: '06',
    text: 'Wispr Flow voice-to-text integration (roadmap) — speak your task, it appears',
    roadmap: true,
  },
];

const techPills = ['React', 'Tailwind CSS', 'Firebase', 'Vite', 'TypeScript'];

const compareRows: {
  name: string;
  friction: ReactNode;
  quick: ReactNode;
  voice: ReactNode;
  dump: ReactNode;
  price: string;
}[] = [
  {
    name: 'Task Manager',
    friction: (
      <span style={{ color: CRIMSON, fontWeight: 700 }}>
        ● ZERO
      </span>
    ),
    quick: <span style={{ color: CRIMSON }}>✓</span>,
    voice: 'Roadmap',
    dump: <span style={{ color: CRIMSON }}>✓</span>,
    price: 'Free',
  },
  {
    name: 'Google Calendar',
    friction: 'High',
    quick: <span style={{ color: MUTED }}>✗</span>,
    voice: <span style={{ color: MUTED }}>✗</span>,
    dump: <span style={{ color: MUTED }}>✗</span>,
    price: 'Free',
  },
  {
    name: 'Notion/Motion',
    friction: 'High',
    quick: <span style={{ color: MUTED }}>✗</span>,
    voice: <span style={{ color: MUTED }}>✗</span>,
    dump: 'Partial',
    price: '$$$',
  },
  {
    name: 'Fantastical',
    friction: 'Medium',
    quick: 'Partial',
    voice: <span style={{ color: CRIMSON }}>✓</span>,
    dump: <span style={{ color: MUTED }}>✗</span>,
    price: '$$$',
  },
  {
    name: 'TickTick',
    friction: 'Medium',
    quick: 'Partial',
    voice: <span style={{ color: CRIMSON }}>✓</span>,
    dump: 'Partial',
    price: 'Free/$$',
  },
];

const scienceCards = [
  {
    title: 'FRICTION THEORY',
    body: (
      <>
        Behavioral science shows that every additional step in a process reduces completion rate by
        ~20%. Removing one tap from task entry means 20% more tasks actually get scheduled.{' '}
        <span className="tm-muted">(Fogg Behavior Model, 2009)</span>
      </>
    ),
  },
  {
    title: 'COGNITIVE LOAD',
    body: (
      <>
        Working memory holds 4±1 items at once. Complex UIs consume working memory before the task
        is even entered. Minimal interfaces preserve cognitive resources for the actual work.{' '}
        <span className="tm-muted">(Miller&apos;s Law)</span>
      </>
    ),
  },
  {
    title: 'COLOR PSYCHOLOGY',
    body: (
      <>
        Off-white reduces eye strain during long sessions. Black creates authority and focus.
        Crimson triggers urgency and action. Purple signals intelligence and calm. The palette is
        not aesthetic — it is functional.
      </>
    ),
  },
];

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
        .tm-nav-back:hover { color: ${CRIMSON}; }
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
        .tm-label-purple {
          color: ${PURPLE};
        }
        .tm-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0 0 0.75rem 0;
          align-items: center;
        }
        .tm-meta-pill {
          border: ${BORDER};
          padding: 0.35rem 0.6rem;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: ${BG};
          color: ${FG};
        }
        .tm-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${CRIMSON};
          flex-shrink: 0;
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
        .tm-btn-primary {
          background: ${FG};
          color: ${BG};
        }
        .tm-btn-primary:hover {
          background: ${CRIMSON};
          color: ${BG};
        }
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
          .tm-feat-grid > div.tm-feat-roadmap {
            border: ${BORDER_PURPLE} !important;
            position: relative;
            z-index: 1;
          }
        }
        @media (max-width: 767px) {
          .tm-feat-grid > div { border-bottom: ${BORDER}; }
          .tm-feat-grid > div:last-child { border-bottom: none; }
          .tm-feat-grid > div.tm-feat-roadmap {
            border-bottom: ${BORDER_PURPLE} !important;
            border-top: ${BORDER_PURPLE} !important;
            border-left: ${BORDER_PURPLE} !important;
            border-right: ${BORDER_PURPLE} !important;
            position: relative;
            z-index: 1;
          }
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
        .tm-compare {
          width: 100%;
          border-collapse: collapse;
          border: ${BORDER};
        }
        .tm-compare th,
        .tm-compare td {
          border: ${BORDER};
          padding: 0.65rem 0.75rem;
          font-size: 12px;
          text-align: left;
          vertical-align: top;
        }
        .tm-compare thead th {
          background: ${FG};
          color: ${BG};
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 10px;
        }
        .tm-compare tbody tr:nth-child(odd) { background: ${BG}; }
        .tm-compare tbody tr:nth-child(even) { background: #ebe5db; }
        .tm-science-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          border: ${BORDER};
        }
        @media (min-width: 900px) {
          .tm-science-grid { grid-template-columns: repeat(3, 1fr); }
          .tm-science-grid > div:not(:last-child) { border-right: ${BORDER}; border-bottom: none; }
        }
        @media (max-width: 899px) {
          .tm-science-grid > div:not(:last-child) { border-bottom: ${BORDER}; }
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
            className="tm-nav-back"
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
            className="tm-label-purple"
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
              <span className="tm-status-dot" aria-hidden />
              [ STATUS: IN PROGRESS ]
            </span>
            <span className="tm-meta-sep tm-muted" style={{ ...mono, fontSize: 11 }}>
              ·
            </span>
            <span className="tm-meta-pill" style={mono}>
              [ YEAR: 2026 ]
            </span>
            <span className="tm-meta-sep tm-muted" style={{ ...mono, fontSize: 11 }}>
              ·
            </span>
            <span className="tm-meta-pill" style={mono}>
              [ PLATFORM: iOS · Android · Web ]
            </span>
          </div>
          <h1 className="tm-hero-title" style={mono}>
            Your tasks. Zero friction.
          </h1>
          <p style={{ ...mono, fontSize: 16, margin: '0 0 0.75rem 0', maxWidth: 760, lineHeight: 1.7 }}>
            A minimal task manager built on one idea — if scheduling takes effort, it doesn&apos;t
            happen. Capture first. Schedule second.
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
            <span className="tm-btn tm-btn-disabled" style={mono} aria-disabled>
              coming soon
            </span>
          </div>
          <p
            style={{
              ...mono,
              fontSize: 12,
              fontWeight: 700,
              color: CRIMSON,
              margin: '0 0 0 0',
              letterSpacing: '0.04em',
            }}
          >
            // NOT ANOTHER KANBAN APP
          </p>
        </section>

        <section className="tm-section">
          <div className="tm-stats">
            {[
              { k: 'PLATFORM', v: 'iOS · Android · Web' },
              { k: 'TYPE', v: 'Mobile + Web App' },
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
                  Every task app adds friction. Opening the app, picking a date, choosing a time,
                  selecting a project. By the time you&apos;ve scheduled it, you&apos;ve lost the
                  thought. Google Calendar is powerful but heavy. Notion is flexible but slow. Motion
                  is smart but complex. The scheduling layer is always in the way.
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
                  Task Manager removes every unnecessary step. Tap +, type the task, done. The app
                  captures first and schedules second. A scrollable week strip, a brain dump for
                  undated tasks, and 4 views (Daily, Weekly, Calendar, Task list) — all reachable in
                  one tap.
                </p>
              </div>
            </Box>
          </div>
        </section>

        <section className="tm-section">
          <div
            className="tm-label-purple"
            style={{ ...mono, fontSize: 12, fontWeight: 600, marginBottom: '1rem' }}
          >
            // CORE FEATURES
          </div>
          <div className="tm-feat-grid">
            {features.map((feat) => (
              <div
                key={feat.num}
                className={feat.roadmap ? 'tm-feat-roadmap' : undefined}
                style={{ padding: '1.5rem 1.25rem', position: 'relative' }}
              >
                {feat.roadmap ? (
                  <span
                    style={{
                      ...mono,
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontSize: 9,
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: BG,
                      background: PURPLE,
                      padding: '0.25rem 0.45rem',
                    }}
                  >
                    ROADMAP
                  </span>
                ) : null}
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
                  FEATURE
                </div>
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
                    [ {feat.num} ]
                  </span>
                </div>
                <p style={{ ...mono, fontSize: 14, lineHeight: 1.8, margin: 0 }}>{feat.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tm-section" style={{ overflowX: 'auto' }}>
          <div
            className="tm-label-purple"
            style={{ ...mono, fontSize: 12, fontWeight: 600, marginBottom: '1rem' }}
          >
            // HOW WE&apos;RE DIFFERENT
          </div>
          <table className="tm-compare" style={mono}>
            <thead>
              <tr>
                <th>App name</th>
                <th>Friction level</th>
                <th>Quick capture</th>
                <th>Voice input</th>
                <th>Brain dump</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.friction}</td>
                  <td>{row.quick}</td>
                  <td>{row.voice}</td>
                  <td>{row.dump}</td>
                  <td>{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section
          className="tm-section"
          style={{
            borderLeft: `4px solid ${PURPLE}`,
            paddingLeft: '1.25rem',
            marginLeft: 0,
          }}
        >
          <div
            className="tm-label-purple"
            style={{
              ...mono,
              fontSize: 12,
              fontWeight: 600,
              marginBottom: '1rem',
              letterSpacing: '0.06em',
            }}
          >
            // THE SCIENCE · WHY MINIMALISM WORKS
          </div>
          <div className="tm-science-grid">
            {scienceCards.map((card) => (
              <div key={card.title} style={{ padding: 0, background: BG }}>
                <div
                  style={{
                    ...mono,
                    background: PURPLE,
                    color: BG,
                    padding: '0.5rem 1rem',
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    fontWeight: 700,
                  }}
                >
                  [ {card.title} ]
                </div>
                <div style={{ padding: '1.25rem 1rem' }}>
                  <p style={{ ...mono, fontSize: 14, lineHeight: 1.8, margin: 0 }}>{card.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="tm-label-purple"
            style={{
              ...mono,
              fontSize: 11,
              marginTop: '1rem',
              marginBottom: 0,
              letterSpacing: '0.04em',
            }}
          >
            // designed with behavior in mind, not features
          </p>
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
          <div
            className="tm-label-purple"
            style={{ ...mono, fontSize: 12, fontWeight: 600, marginBottom: '1rem' }}
          >
            // APP PREVIEWS
          </div>
          <div className="tm-shots">
            {(
              [
                '[ WEEKLY VIEW · COMING SOON ]',
                '[ DAILY VIEW · COMING SOON ]',
                '[ BRAIN DUMP · COMING SOON ]',
              ] as const
            ).map((label) => (
              <div
                key={label}
                style={{
                  minHeight: 280,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  boxSizing: 'border-box',
                  position: 'relative',
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #0A0A0A 0, #0A0A0A 1px, transparent 0, transparent 50%)',
                  backgroundSize: '8px 8px',
                  backgroundColor: BG,
                }}
              >
                <span
                  style={{
                    ...mono,
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    fontSize: 9,
                    letterSpacing: '0.12em',
                    fontWeight: 700,
                    color: BG,
                    background: CRIMSON,
                    padding: '0.3rem 0.5rem',
                  }}
                >
                  COMING SOON
                </span>
                <span style={{ ...mono, fontSize: 12, textAlign: 'center', opacity: 0.6 }}>
                  {label}
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
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.5rem 2rem',
          borderTop: BORDER,
          background: FG,
          color: BG,
        }}
      >
        <span style={{ ...mono, fontSize: 12, color: BG }}>PROJ / 03 · TASK MANAGER · 2026</span>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.5rem',
            marginLeft: 'auto',
          }}
        >
          <span style={{ ...mono, fontSize: 11, color: BG, opacity: 0.9 }}>
            built different. on purpose.
          </span>
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
        </div>
      </footer>
    </div>
  );
}
