import { useEffect, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

const BG = '#0D0D14';
const ACCENT = '#A78BFA';
const TEXT_PRIMARY = '#E6E6FA';
const TEXT_MUTED = '#6B7280';
const CARD = '#13131F';
const CARD_BORDER = '1px solid rgba(167, 139, 250, 0.2)';
const TERMINAL_BG = '#0A0A12';
const mono = "'JetBrains Mono', ui-monospace, monospace";
const sans = 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const pillBase: CSSProperties = {
  fontFamily: mono,
  fontSize: 12,
  padding: '6px 10px',
  borderRadius: 4,
  border: '1px solid rgba(167, 139, 250, 0.4)',
  background: 'rgba(167, 139, 250, 0.1)',
  color: ACCENT,
};

const cardBase: CSSProperties = {
  background: CARD,
  border: CARD_BORDER,
  borderRadius: 8,
  boxSizing: 'border-box',
};

const stats = [
  { label: 'STACK', value: 'Next.js · Supabase · Claude API · Vercel' },
  { label: 'TYPE', value: 'Developer Tool · SRE · AI' },
  { label: 'STATUS', value: 'In Progress' },
  { label: 'YEAR', value: '2026' },
];

const techPills = [
  'Next.js',
  'Supabase',
  'Claude API',
  'Vercel',
  'TypeScript',
  'Python',
  'Node.js',
  'PostgreSQL',
];

const features = [
  {
    num: '01',
    title: 'Real-Time Stack Monitoring',
    desc: 'Ingests Vercel deployment webhooks, Supabase DB metrics and Next.js error events into a unified incident stream.',
  },
  {
    num: '02',
    title: 'AI Root Cause Analysis',
    desc: 'Sends structured incident context to Claude API — returns human-readable explanation of what broke and why, in plain English.',
  },
  {
    num: '03',
    title: 'Automated Fix Suggestions',
    desc: 'Claude API generates a prioritized list of suggested fixes with code snippets, ranked by likelihood of resolving the incident.',
  },
  {
    num: '04',
    title: 'Incident Timeline',
    desc: 'Every incident logged with timestamp, severity (P1–P3), affected service, detection latency and resolution status.',
  },
  {
    num: '05',
    title: 'Slack + Email Alerts',
    desc: 'Instant notifications with incident summary, AI analysis and fix suggestions — delivered to your team in under 60 seconds.',
  },
  {
    num: '06',
    title: 'Zero Config Setup',
    desc: 'Connect your Vercel project, Supabase instance and Claude API key. SentryMind handles the rest — no agents to install, no YAML to write.',
  },
];

const whyClaudeCards = [
  {
    icon: '🧠',
    title: 'Context Window',
    body:
      "Claude's large context window means we can send the full stack trace, recent deploy history and DB metrics in a single prompt — no chunking, no lost context.",
  },
  {
    icon: '⚡',
    title: 'Speed',
    body: 'Claude API returns a structured incident analysis in under 3 seconds — fast enough to include in a real-time alert.',
  },
  {
    icon: '🎯',
    title: 'Engineering Accuracy',
    body:
      'Claude understands Next.js, Supabase and Vercel architecture natively. Fix suggestions reference actual file paths, function names and config patterns.',
  },
];

const buildLogLines: { date: string; mark: 'done' | 'progress' | 'planned'; text: string }[] = [
  { date: '2026-01-15', mark: 'done', text: 'Project scoped and RFC drafted' },
  { date: '2026-02-01', mark: 'done', text: 'Vercel webhook ingestion built' },
  { date: '2026-02-15', mark: 'done', text: 'Supabase metrics pipeline connected' },
  { date: '2026-03-01', mark: 'done', text: 'Claude API incident analysis prompt engineered' },
  { date: '2026-03-15', mark: 'progress', text: 'Slack alert dispatcher — in progress' },
  { date: '2026-04-01', mark: 'planned', text: 'Anomaly detection ML layer — planned' },
  { date: '2026-04-15', mark: 'planned', text: 'Dashboard UI — planned' },
  { date: '2026-05-01', mark: 'planned', text: 'Public beta — planned' },
];

const microLabels = [
  'LATENCY: 120MS',
  'STATUS: ONLINE',
  'INC-783',
  'P95',
  'NODE_01',
  'EPOCH: 2026',
  'QUEUE: 0',
  'TRACE_ID: 8f2a',
  'REGION: IAD',
  'HEALTH: OK',
];

const RFC_SPEC = `TITLE: SentryMind Incident Detection Engine
STATUS: Draft
AUTHOR: Het Patel
CREATED: 2026

1. OVERVIEW
SentryMind ingests telemetry from three sources: Vercel (deploy hooks,
function logs), Supabase (DB metrics, slow queries, auth errors) and
Next.js (runtime errors, 500s, edge function failures). Events are
normalized into a unified IncidentEvent schema and evaluated against
configurable thresholds.

2. INCIDENT DETECTION
Threshold rules: error_rate > 5% over 60s window → P2 incident
Anomaly detection: latency spike > 3x baseline → P1 incident
Deploy correlation: error spike within 5min of deploy → auto-tagged

3. AI ANALYSIS PIPELINE
On incident trigger:
  → Build context payload: {service, error_type, stack_trace, recent_deploys, db_metrics}
  → Send to Claude API with SRE system prompt
  → Parse response: {root_cause, confidence, suggested_fixes[], severity}
  → Store in Supabase incidents table
  → Dispatch alert via Slack webhook / email

4. DATA SCHEMA
incidents: {id, timestamp, service, severity, status, ai_analysis, resolved_at}
metrics: {id, incident_id, latency_p95, error_rate, db_connections, deploy_id}`;

const GITHUB_HREF = 'https://github.com/HetPatel-03/SentryMind';

export default function SentryMindProjectPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backToProjects = () => navigate('/#projects');

  const copySpec = async () => {
    try {
      await navigator.clipboard.writeText(RFC_SPEC);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const markColor = (m: (typeof buildLogLines)[0]['mark']) =>
    m === 'done' ? '#22C55E' : m === 'progress' ? '#F59E0B' : TEXT_MUTED;

  const markChar = (m: (typeof buildLogLines)[0]['mark']) =>
    m === 'done' ? '✓' : m === 'progress' ? '◐' : '○';

  return (
    <div style={{ background: BG, color: TEXT_PRIMARY, fontFamily: sans, minHeight: '100vh' }}>
      <style>{`
        @keyframes sentrymind-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .sentrymind-blink-dot {
          animation: sentrymind-blink 1.2s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .sentrymind-footer {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            gap: 16px;
          }
          .sentrymind-footer > * {
            justify-self: center !important;
          }
          .sentrymind-features-flow {
            grid-column: 1 / -1;
          }
        }
      `}</style>

      {/* Nav */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: 12,
          padding: '14px clamp(16px, 4vw, 32px)',
          background: BG,
          borderBottom: CARD_BORDER,
        }}
      >
        <button
          type="button"
          onClick={backToProjects}
          style={{
            justifySelf: 'start',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: ACCENT,
            fontFamily: mono,
            fontSize: 14,
            padding: 0,
          }}
        >
          ← back
        </button>
        <span style={{ fontFamily: mono, color: TEXT_PRIMARY, fontSize: 14, fontWeight: 600 }}>
          SentryMind
        </span>
        <span
          style={{
            justifySelf: 'end',
            fontFamily: sans,
            color: TEXT_MUTED,
            fontSize: 13,
          }}
        >
          hetppatel.dev
        </span>
      </header>

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '90vh',
          padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 48px) 48px',
          overflow: 'hidden',
        }}
      >
        {/* Micrographics */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {microLabels.map((label, i) => (
            <span
              key={label}
              style={{
                position: 'absolute',
                left: `${8 + (i * 11) % 82}%`,
                top: `${12 + ((i * 17) % 78)}%`,
                fontFamily: mono,
                fontSize: 10,
                color: ACCENT,
                opacity: 0.04,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: mono,
                fontSize: 12,
                color: ACCENT,
              }}
            >
              <span className="sentrymind-blink-dot" style={{ lineHeight: 1 }}>
                ●
              </span>
              SYSTEM ACTIVE
            </div>
            <span style={{ ...pillBase, border: `1px solid ${ACCENT}`, background: 'transparent', color: ACCENT }}>
              [ IN PROGRESS ]
            </span>
          </div>

          <h1
            style={{
              textAlign: 'center',
              margin: '0 0 24px',
              fontFamily: sans,
              fontWeight: 800,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 1.05,
            }}
          >
            <span style={{ display: 'block', color: TEXT_PRIMARY }}>AI-Powered SRE.</span>
            <span style={{ display: 'block', color: ACCENT }}>For the modern dev stack.</span>
          </h1>

          <p
            style={{
              maxWidth: 720,
              margin: '0 auto 28px',
              fontSize: '1.1rem',
              lineHeight: 1.65,
              color: TEXT_MUTED,
              textAlign: 'center',
            }}
          >
            SentryMind monitors your Vercel + Supabase + Next.js stack, detects incidents automatically, and uses the
            Claude API to surface root causes and suggest fixes. Built for indie devs and small teams who can&apos;t afford
            an on-call engineer.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'center',
              marginBottom: 0,
            }}
          >
            <a
              href={GITHUB_HREF}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...pillBase,
                borderRadius: 8,
                padding: '12px 22px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                background: 'transparent',
                border: `1px solid ${ACCENT}`,
                color: ACCENT,
                cursor: 'pointer',
              }}
            >
              View on GitHub →
            </a>
            <button
              type="button"
              disabled
              style={{
                ...pillBase,
                borderRadius: 8,
                padding: '12px 22px',
                fontWeight: 600,
                opacity: 0.55,
                cursor: 'not-allowed',
                background: 'rgba(107, 114, 128, 0.15)',
                border: `1px solid rgba(107, 114, 128, 0.35)`,
                color: TEXT_MUTED,
              }}
            >
              In Progress
            </button>
          </div>

          <img
            src="/sentrymind-hero.png"
            alt="SentryMind product preview"
            width="100%"
            style={{
              borderRadius: 12,
              border: '1px solid rgba(167,139,250,0.3)',
              marginTop: '3rem',
              display: 'block',
            }}
          />
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ ...cardBase, padding: 20 }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: ACCENT, letterSpacing: '0.06em', marginBottom: 8 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: mono, fontSize: 13, color: TEXT_PRIMARY, lineHeight: 1.5 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech pills */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {techPills.map((t) => (
            <span key={t} style={pillBase}>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          <div style={{ ...cardBase, padding: 24 }}>
            <div style={{ fontFamily: mono, fontSize: 12, color: ACCENT, marginBottom: 16 }}>// PROBLEM STATEMENT</div>
            <p style={{ margin: 0, color: TEXT_MUTED, lineHeight: 1.75, fontSize: 15 }}>
              Modern dev teams running on Vercel, Supabase and Next.js have no affordable on-call solution. When something
              breaks at 2am — a failed deployment, a spiking DB query, a crashed edge function — there&apos;s no system to
              detect it, explain it, or suggest a fix. PagerDuty and Datadog are built for enterprise teams with $10k/month
              budgets. Indie devs and small teams get nothing.
            </p>
          </div>
          <div style={{ ...cardBase, padding: 24 }}>
            <div style={{ fontFamily: mono, fontSize: 12, color: ACCENT, marginBottom: 16 }}>// THE SOLUTION</div>
            <p style={{ margin: 0, color: TEXT_MUTED, lineHeight: 1.75, fontSize: 15 }}>
              SentryMind is an AI SRE agent that monitors your stack 24/7. It ingests Vercel deployment logs, Supabase
              metrics and Next.js error events, detects anomalies in real time, and sends the Claude API a structured
              incident context to generate a human-readable root cause analysis and suggested fix — delivered via Slack or
              email within seconds of detection.
            </p>
          </div>
        </div>
      </section>

      {/* Core features */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 56px', maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {features.map((f) => (
            <div
              key={f.num}
              style={{
                ...cardBase,
                padding: 22,
                borderTop: `2px solid ${ACCENT}`,
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 12, color: ACCENT, marginBottom: 10 }}>[ {f.num} ]</div>
              <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700, color: TEXT_PRIMARY }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: 14, color: TEXT_MUTED, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}

          <div
            className="sentrymind-features-flow"
            style={{
              gridColumn: 'span 2',
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: mono,
                fontSize: 12,
                color: ACCENT,
                marginBottom: 10,
                letterSpacing: '0.02em',
              }}
            >
              // INCIDENT FLOW · SYSTEM DIAGRAM
            </div>
            <img
              src="/sentrymind-micro.png"
              width="100%"
              alt="SentryMind system flow"
              style={{
                borderRadius: 8,
                border: '1px solid rgba(167,139,250,0.2)',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>

      {/* RFC Technical Spec */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 56px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ ...cardBase, padding: 24 }}>
          <div style={{ fontFamily: mono, fontSize: 12, color: ACCENT, marginBottom: 20 }}>
            // TECHNICAL SPEC · RFC-001
          </div>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={copySpec}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 2,
                fontFamily: mono,
                fontSize: 11,
                padding: '6px 12px',
                borderRadius: 4,
                border: `1px solid rgba(167, 139, 250, 0.35)`,
                background: 'rgba(167, 139, 250, 0.12)',
                color: ACCENT,
                cursor: 'pointer',
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
            <pre
              style={{
                margin: 0,
                padding: '48px 20px 24px',
                background: TERMINAL_BG,
                borderRadius: 8,
                border: CARD_BORDER,
                fontFamily: mono,
                fontSize: 12,
                lineHeight: 1.65,
                overflow: 'auto',
                color: TEXT_PRIMARY,
                whiteSpace: 'pre-wrap',
              }}
            >
              {RFC_SPEC.split('\n').map((line, i) => {
                const isLabel =
                  /^(TITLE|STATUS|AUTHOR|CREATED|\d+\.\s)/.test(line) || line.startsWith('  →');
                return (
                  <span key={i} style={{ display: 'block' }}>
                    {isLabel ? (
                      <span style={{ color: ACCENT }}>{line}</span>
                    ) : (
                      <span style={{ color: TEXT_PRIMARY }}>{line}</span>
                    )}
                  </span>
                );
              })}
            </pre>
          </div>
        </div>
      </section>

      {/* Why Claude */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 56px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: 12, color: ACCENT, marginBottom: 20 }}>// WHY CLAUDE API</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {whyClaudeCards.map((c) => (
            <div key={c.title} style={{ ...cardBase, padding: 22 }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{c.icon}</div>
              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>{c.title}</h3>
              <p style={{ margin: 0, fontSize: 14, color: TEXT_MUTED, lineHeight: 1.7 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Build log */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 56px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: 12, color: ACCENT, marginBottom: 16 }}>// BUILD LOG</div>
        <div
          style={{
            background: TERMINAL_BG,
            border: CARD_BORDER,
            borderRadius: 8,
            padding: '20px 24px',
            fontFamily: mono,
            fontSize: 13,
            lineHeight: 2,
          }}
        >
          {buildLogLines.map((row) => (
            <div key={row.date + row.text} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'baseline' }}>
              <span style={{ color: ACCENT }}>[{row.date}]</span>
              <span style={{ color: markColor(row.mark), flexShrink: 0 }}>{markChar(row.mark)}</span>
              <span style={{ color: TEXT_PRIMARY }}>{row.text}</span>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ margin: 0, width: '100%' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 260,
            overflow: 'hidden',
            borderTop: '1px solid #A78BFA',
          }}
        >
          <img
            src="/sentrymind-footer.png"
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'left top',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '38%',
              width: '52%',
              transform: 'translateY(-50%)',
              boxSizing: 'border-box',
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'block',
                fontFamily: "'Courier New', monospace",
                fontSize: 36,
                fontWeight: 800,
                color: '#A78BFA',
                lineHeight: 1,
                marginBottom: '0.12em',
              }}
            >
              &quot;
            </span>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                fontSize: 'clamp(13px, 1.5vw, 19px)',
                lineHeight: 1.4,
              }}
            >
              <span style={{ display: 'block', color: '#E2E2F0' }}>The best alert is</span>
              <span style={{ display: 'block', color: '#A78BFA' }}>the one you never see.&quot;</span>
            </div>
            <p
              style={{
                margin: '8px 0 0',
                fontFamily: "'Courier New', monospace",
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#E2E2F0',
                opacity: 0.35,
              }}
            >
              — SentryMind, 2026
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <a
                href="/"
                style={{
                  border: '1.5px solid #A78BFA',
                  color: '#A78BFA',
                  background: 'transparent',
                  padding: '8px 16px',
                  fontSize: '11px',
                  fontFamily: "'Courier New', monospace",
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                ← Back to Portfolio
              </a>
              <a
                href="/projects/studenzbit"
                style={{
                  background: '#A78BFA',
                  color: '#0D0D14',
                  border: 'none',
                  padding: '8px 16px',
                  fontSize: '11px',
                  fontFamily: "'Courier New', monospace",
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                Next Project →
              </a>
            </div>
          </div>
        </div>
        <div
          style={{
            background: '#0D0D14',
            borderTop: '1px solid #A78BFA',
            padding: '14px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              fontWeight: 700,
              color: '#E2E2F0',
              letterSpacing: '0.12em',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#A78BFA',
                marginRight: 8,
                flexShrink: 0,
              }}
            />
            SENTRYMIND
          </span>
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              fontWeight: 400,
              color: '#A78BFA',
            }}
          >
            AI-powered incident response
          </span>
        </div>
      </footer>
    </div>
  );
}
