import { useEffect, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

const BG = '#0D0F14';
const CYAN = '#00D4D4';
const TEXT = '#FFFFFF';
const MUTED = '#6B7280';
const CARD = '#13171E';
const CARD_BORDER = '1px solid rgba(0, 212, 212, 0.15)';
const sans = 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const mono = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const padX = 'clamp(16px, 4vw, 48px)';

const cardStyle: CSSProperties = {
  background: CARD,
  border: CARD_BORDER,
  borderRadius: 12,
  boxSizing: 'border-box',
};

const pill = (outline = false): CSSProperties => ({
  fontFamily: sans,
  fontSize: 13,
  padding: '8px 18px',
  borderRadius: 99,
  border: outline ? `1px solid ${MUTED}` : `1px solid ${CYAN}`,
  background: outline ? 'transparent' : BG,
  color: outline ? MUTED : TEXT,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
});

const sectionLabelStyle: CSSProperties = {
  fontFamily: mono,
  fontSize: 12,
  color: CYAN,
  letterSpacing: '0.06em',
  marginBottom: 24,
};

function SectionHeader({
  num,
  title,
  stickerSrc,
  stickerWidth = 80,
  subtitle,
}: {
  num: string;
  title: string;
  stickerSrc?: string;
  stickerWidth?: number;
  subtitle?: string;
}) {
  return (
    <div style={{ marginBottom: subtitle ? 12 : 24, position: 'relative' }}>
      {stickerSrc ? (
        <img
          src={stickerSrc}
          alt=""
          width={stickerWidth}
          style={{ float: 'right', marginLeft: 16, marginBottom: 8, display: 'block' }}
        />
      ) : null}
      <div style={sectionLabelStyle}>
        // {num} · {title}
      </div>
      {subtitle ? (
        <p style={{ margin: '0 0 24px', fontSize: 15, color: MUTED, maxWidth: 640, clear: 'both' }}>
          {subtitle}
        </p>
      ) : null}
      <div style={{ clear: 'both' }} />
    </div>
  );
}

function FixxoArchitectureSvg() {
  const stroke = CYAN;
  const strokeRoad = 'rgba(0,212,212,0.5)';
  const fs = 11;
  const fsSm = 10;
  return (
    <svg
      width="100%"
      viewBox="0 0 1300 700"
      role="img"
      aria-label="FIXXO system architecture diagram"
      style={{ display: 'block', maxWidth: '100%', height: 'auto', background: BG, borderRadius: 12, border: CARD_BORDER }}
    >
      <defs>
        <marker id="fx-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={stroke} />
        </marker>
        <marker id="fx-arr-d" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={strokeRoad} />
        </marker>
      </defs>

      {/* Layer 1 User */}
      <circle cx="110" cy="120" r="48" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="110" y="124" textAnchor="middle" fill={TEXT} fontSize={fs + 1} fontWeight={700} fontFamily={sans}>
        USER
      </text>
      <line x1="158" y1="120" x2="228" y2="120" stroke={stroke} strokeWidth={2} markerEnd="url(#fx-arr)" />
      <text x="193" y="108" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        WhatsApp message
      </text>

      {/* Layer 2 Twilio */}
      <rect x="228" y="88" width="200" height="64" rx="0" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="328" y="118" textAnchor="middle" fill={TEXT} fontSize={fs} fontWeight={600} fontFamily={sans}>
        Twilio WhatsApp API
      </text>
      <text x="328" y="136" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={mono}>
        webhook → POST /incoming
      </text>
      <line x1="428" y1="120" x2="498" y2="120" stroke={stroke} strokeWidth={2} markerEnd="url(#fx-arr)" />
      <text x="463" y="108" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        normalized message payload
      </text>

      {/* Layer 3 Task Router */}
      <rect x="498" y="72" width="304" height="96" rx="0" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="650" y="108" textAnchor="middle" fill={CYAN} fontSize={fs + 3} fontWeight={800} fontFamily={sans}>
        FIXXO Task Router
      </text>
      <text x="650" y="130" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        Node.js · Express · classification engine
      </text>

      {/* Branches down */}
      <line x1="560" y1="168" x2="560" y2="220" stroke={stroke} strokeWidth={2} />
      <line x1="650" y1="168" x2="650" y2="220" stroke={stroke} strokeWidth={2} />
      <line x1="740" y1="168" x2="740" y2="220" stroke={stroke} strokeWidth={2} />
      <line x1="560" y1="220" x2="740" y2="220" stroke={stroke} strokeWidth={2} />
      <line x1="560" y1="220" x2="560" y2="248" stroke={stroke} strokeWidth={2} markerEnd="url(#fx-arr)" />
      <line x1="650" y1="220" x2="650" y2="248" stroke={stroke} strokeWidth={2} markerEnd="url(#fx-arr)" />
      <line x1="740" y1="220" x2="740" y2="248" stroke={stroke} strokeWidth={2} markerEnd="url(#fx-arr)" />

      <rect x="516" y="248" width="88" height="78" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="560" y="270" textAnchor="middle" fill={TEXT} fontSize={10} fontWeight={600} fontFamily={sans}>
        NLP Classifier
      </text>
      <text x="560" y="286" textAnchor="middle" fill={MUTED} fontSize={9} fontFamily={sans}>
        task_type · location
      </text>
      <text x="560" y="300" textAnchor="middle" fill={MUTED} fontSize={9} fontFamily={sans}>
        urgency · language
      </text>

      <rect x="606" y="248" width="88" height="78" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="650" y="270" textAnchor="middle" fill={TEXT} fontSize={10} fontWeight={600} fontFamily={sans}>
        Vendor Matcher
      </text>
      <text x="650" y="286" textAnchor="middle" fill={MUTED} fontSize={9} fontFamily={sans}>
        category → vendor DB
      </text>
      <text x="650" y="300" textAnchor="middle" fill={MUTED} fontSize={9} fontFamily={sans}>
        availability check
      </text>

      <rect x="696" y="248" width="88" height="78" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="740" y="270" textAnchor="middle" fill={TEXT} fontSize={10} fontWeight={600} fontFamily={sans}>
        Agent Dispatcher
      </text>
      <text x="740" y="286" textAnchor="middle" fill={MUTED} fontSize={9} fontFamily={sans}>
        assign human agent
      </text>
      <text x="740" y="300" textAnchor="middle" fill={MUTED} fontSize={9} fontFamily={sans}>
        Slack alert
      </text>

      {/* Layer 4 Data */}
      <line x1="560" y1="326" x2="560" y2="360" stroke={stroke} strokeWidth={2} />
      <line x1="650" y1="326" x2="650" y2="360" stroke={stroke} strokeWidth={2} />
      <line x1="740" y1="326" x2="740" y2="360" stroke={stroke} strokeWidth={2} />
      <line x1="360" y1="360" x2="940" y2="360" stroke={stroke} strokeWidth={2} />
      <line x1="360" y1="360" x2="360" y2="388" stroke={stroke} strokeWidth={2} markerEnd="url(#fx-arr)" />
      <line x1="650" y1="360" x2="650" y2="388" stroke={stroke} strokeWidth={2} markerEnd="url(#fx-arr)" />
      <line x1="940" y1="360" x2="940" y2="388" stroke={stroke} strokeWidth={2} markerEnd="url(#fx-arr)" />

      <rect x="288" y="388" width="144" height="76" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="360" y="412" textAnchor="middle" fill={TEXT} fontSize={fs} fontWeight={600} fontFamily={sans}>
        Supabase DB
      </text>
      <text x="360" y="432" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        tasks · vendors · users
      </text>
      <text x="360" y="448" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        agents · history
      </text>

      <rect x="578" y="388" width="144" height="76" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="650" y="412" textAnchor="middle" fill={TEXT} fontSize={fs} fontWeight={600} fontFamily={sans}>
        Redis Cache
      </text>
      <text x="650" y="432" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        session state · rate limit
      </text>
      <text x="650" y="448" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        message dedup
      </text>

      <rect x="868" y="388" width="144" height="76" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="940" y="412" textAnchor="middle" fill={TEXT} fontSize={fs} fontWeight={600} fontFamily={sans}>
        Twilio SMS/WA
      </text>
      <text x="940" y="432" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        outbound confirmations
      </text>
      <text x="940" y="448" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        status updates
      </text>

      {/* Layer 5 Agent */}
      <line x1="650" y1="464" x2="650" y2="492" stroke={stroke} strokeWidth={2} markerEnd="url(#fx-arr)" />
      <rect x="520" y="492" width="260" height="56" fill={BG} stroke={stroke} strokeWidth={2} />
      <text x="650" y="516" textAnchor="middle" fill={TEXT} fontSize={fs} fontWeight={600} fontFamily={sans}>
        Agent Dashboard
      </text>
      <text x="650" y="534" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        React · Next.js · real-time task queue
      </text>

      {/* Back to user */}
      <path
        d="M 650 548 Q 650 620 200 620 Q 80 620 80 168"
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        markerEnd="url(#fx-arr)"
      />
      <text x="360" y="608" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        WhatsApp confirmation
      </text>

      {/* Roadmap layer */}
      <rect
        x="32"
        y="548"
        width="1236"
        height="140"
        fill="rgba(0,212,212,0.03)"
        stroke={stroke}
        strokeWidth={2}
        strokeDasharray="8 6"
      />
      <rect x="120" y="592" width="320" height="80" fill={BG} stroke={strokeRoad} strokeWidth={2} strokeDasharray="6 4" />
      <rect x="128" y="598" width="102" height="18" fill={BG} stroke={strokeRoad} strokeWidth={1} />
      <text x="179" y="611" textAnchor="middle" fill={CYAN} fontSize={9} fontWeight={700} fontFamily={mono}>
        [ ROADMAP ]
      </text>
      <text x="280" y="618" textAnchor="middle" fill={TEXT} fontSize={fs} fontWeight={600} fontFamily={sans}>
        Claude API
      </text>
      <text x="280" y="638" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        AI task understanding · smart routing
      </text>
      <text x="280" y="654" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        vendor scoring
      </text>

      <rect x="490" y="592" width="320" height="80" fill={BG} stroke={strokeRoad} strokeWidth={2} strokeDasharray="6 4" />
      <rect x="498" y="598" width="102" height="18" fill={BG} stroke={strokeRoad} strokeWidth={1} />
      <text x="549" y="611" textAnchor="middle" fill={CYAN} fontSize={9} fontWeight={700} fontFamily={mono}>
        [ ROADMAP ]
      </text>
      <text x="650" y="618" textAnchor="middle" fill={TEXT} fontSize={fs} fontWeight={600} fontFamily={sans}>
        Vendor Portal
      </text>
      <text x="650" y="638" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        self-serve onboarding · availability
      </text>
      <text x="650" y="654" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        calendar · ratings
      </text>

      <rect x="860" y="592" width="392" height="80" fill={BG} stroke={strokeRoad} strokeWidth={2} strokeDasharray="6 4" />
      <rect x="868" y="598" width="102" height="18" fill={BG} stroke={strokeRoad} strokeWidth={1} />
      <text x="919" y="611" textAnchor="middle" fill={CYAN} fontSize={9} fontWeight={700} fontFamily={mono}>
        [ ROADMAP ]
      </text>
      <text x="1056" y="618" textAnchor="middle" fill={TEXT} fontSize={fs} fontWeight={600} fontFamily={sans}>
        Payments Layer
      </text>
      <text x="1056" y="638" textAnchor="middle" fill={MUTED} fontSize={fsSm} fontFamily={sans}>
        Stripe · escrow · agent payouts
      </text>

      <line x1="440" y1="632" x2="490" y2="632" stroke={strokeRoad} strokeWidth={2} strokeDasharray="6 4" markerEnd="url(#fx-arr-d)" />
      <line x1="810" y1="632" x2="860" y2="632" stroke={strokeRoad} strokeWidth={2} strokeDasharray="6 4" markerEnd="url(#fx-arr-d)" />
    </svg>
  );
}

export default function FixxoProjectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const back = () => navigate('/#projects');

  const heroLineGrid: CSSProperties = {
    backgroundColor: '#0D0F14',
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
    backgroundSize: '32px 32px',
  };

  return (
    <div style={{ backgroundColor: BG, color: TEXT, fontFamily: sans, minHeight: '100vh' }}>
      <style>{`
        @media (max-width: 900px) {
          .fixxo-how-grid { grid-template-columns: 1fr !important; }
          .fixxo-how-arrows { display: none !important; }
          .fixxo-two-col { grid-template-columns: 1fr !important; }
          .fixxo-tech-grid { grid-template-columns: 1fr !important; }
          .fixxo-decision-grid { grid-template-columns: 1fr !important; }
          .fixxo-pricing-grid { grid-template-columns: 1fr !important; }
          .fixxo-roadmap-grid { grid-template-columns: 1fr !important; }
          .fixxo-brand-grid { grid-template-columns: 1fr !important; }
          .fixxo-footer { grid-template-columns: 1fr !important; text-align: center; gap: 16px; }
          .fixxo-footer-left { justify-self: center !important; justify-content: center !important; }
        }
      `}</style>

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
          borderBottom: '1px solid rgba(0,212,212,0.15)',
        }}
      >
        <button
          type="button"
          onClick={back}
          style={{
            justifySelf: 'start',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: CYAN,
            fontFamily: sans,
            fontSize: 15,
            padding: 0,
            fontWeight: 500,
          }}
        >
          ← back
        </button>
        <span
          style={{
            fontFamily: sans,
            color: TEXT,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.15em',
          }}
        >
          FIXXO
        </span>
        <span style={{ justifySelf: 'end', fontFamily: sans, color: MUTED, fontSize: 13 }}>hetppatel.dev</span>
      </header>

      {/* HERO */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          ...heroLineGrid,
          padding: `${padX} ${padX} 64px`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(0,212,212,0.04), transparent)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1100,
            margin: '0 auto',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ ...pill(false), border: `1px solid ${CYAN}`, gap: 10 }}>
            <span style={{ color: CYAN, fontSize: 10 }}>●</span>
            <span style={{ fontWeight: 500 }}>Now launching in GTA</span>
          </div>
          <span style={{ fontFamily: mono, fontSize: 12, color: MUTED }}>[ PROJ / 04 ]</span>
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', paddingTop: 'clamp(48px, 12vh, 100px)' }}>
          <img
            src="/fixxo-sticker-gta.png"
            alt=""
            width={90}
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-8%',
              opacity: 0.85,
              pointerEvents: 'none',
            }}
          />
          <img
            src="/fixxo-sticker-hero.png"
            alt=""
            width={100}
            style={{
              position: 'absolute',
              top: '-24px',
              right: '4%',
              transform: 'rotate(12deg)',
              pointerEvents: 'none',
            }}
          />
          <img
            src="/fixxo-sticker-stressed.png"
            alt=""
            width={120}
            style={{
              position: 'absolute',
              bottom: '12%',
              left: '-6%',
              transform: 'rotate(-8deg)',
              pointerEvents: 'none',
            }}
          />
          <img
            src="/fixxo-sticker-whatsapp.png"
            alt=""
            width={95}
            style={{
              position: 'absolute',
              bottom: '8%',
              right: '-4%',
              transform: 'rotate(6deg)',
              pointerEvents: 'none',
            }}
          />

          <h1
            style={{
              margin: 0,
              textAlign: 'center',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
            }}
          >
            <span style={{ display: 'block', color: TEXT }}>Every task you can imagine.</span>
            <span style={{ display: 'block', color: CYAN }}>Consider it done.</span>
          </h1>
          <p
            style={{
              margin: '24px auto 0',
              textAlign: 'center',
              fontSize: '1.1rem',
              color: MUTED,
              lineHeight: 1.65,
              maxWidth: 560,
            }}
          >
            FIXXO is your human AI Assistant in the GTA. One text — we handle the rest.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              justifyContent: 'center',
              marginTop: 36,
            }}
          >
            <a
              href="https://fixxo-e.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...pill(false),
                background: CYAN,
                color: BG,
                border: `1px solid ${CYAN}`,
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: 99,
                padding: '12px 24px',
              }}
            >
              Visit FIXXO →
            </a>
            <button
              type="button"
              disabled
              style={{
                ...pill(true),
                padding: '12px 24px',
                cursor: 'not-allowed',
                opacity: 0.85,
                fontWeight: 600,
              }}
            >
              In Development
            </button>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding: `72px ${padX}`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ ...sectionLabelStyle, marginBottom: 28 }}>// 01 · THE PROBLEM</div>
        <div className="fixxo-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 40, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: -8,
                top: -32,
                fontSize: '5rem',
                fontWeight: 800,
                color: CYAN,
                opacity: 0.15,
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              aria-hidden
            >
              01
            </span>
            <h2 style={{ margin: '0 0 20px', fontSize: '2rem', fontWeight: 700, color: TEXT, position: 'relative' }}>
              Life in the GTA is full of tasks nobody has time for.
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 15, color: MUTED, lineHeight: 1.75 }}>
              Newcomers and busy professionals in the GTA face a constant backlog of real-world tasks — finding a reliable plumber,
              booking appointments, handling paperwork, sourcing contractors. Every task requires research, calls, follow-ups and
              trust-building in an unfamiliar city. Most people don&apos;t know who to call. Most services don&apos;t know how to reach
              them.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['No trusted network', 'No time', 'No one to call'].map((t) => (
                <span
                  key={t}
                  style={{
                    ...pill(false),
                    background: BG,
                    border: `1px solid ${CYAN}`,
                    color: TEXT,
                    fontSize: 12,
                    padding: '8px 14px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ justifySelf: 'center' }}>
            <img src="/fixxo-sticker-stressed.png" alt="" width={220} style={{ transform: 'rotate(-5deg)', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: `0 ${padX} 72px`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ ...sectionLabelStyle, marginBottom: 20 }}>// 02 · THE SOLUTION</div>
        <div
          style={{
            ...cardStyle,
            borderLeft: `4px solid ${CYAN}`,
            padding: 'clamp(28px, 4vw, 40px)',
          }}
        >
          <div className="fixxo-two-col" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 36, alignItems: 'center' }}>
            <div style={{ justifySelf: 'center' }}>
              <img src="/fixxo-sticker-relax.png" alt="" width={200} style={{ transform: 'rotate(4deg)', display: 'block' }} />
            </div>
            <div>
              <h2 style={{ margin: '0 0 16px', fontSize: '2rem', fontWeight: 700, color: TEXT }}>One text. We handle the rest.</h2>
              <p style={{ margin: '0 0 20px', fontSize: 15, color: MUTED, lineHeight: 1.75 }}>
                FIXXO is a WhatsApp-first task concierge built for the GTA. Text us any task in plain language — &quot;Fix my leaking tap
                in Brampton&quot;, &quot;Find me a cleaner for Saturday&quot;, &quot;Book my driving test&quot;. FIXXO assigns a human agent to handle it
                end to end — sourcing, vetting, booking, confirming. No app to download. No account to create. Just WhatsApp.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 600,
                  color: CYAN,
                  lineHeight: 1.6,
                  borderLeft: `3px solid ${CYAN}`,
                  paddingLeft: 16,
                }}
              >
                &quot;The first truly human-powered AI assistant for real-world tasks in the GTA.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: `0 ${padX} 72px`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ ...sectionLabelStyle, marginBottom: 28 }}>// 03 · HOW IT WORKS</div>
        <div
          className="fixxo-how-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            gap: 0,
            alignItems: 'stretch',
          }}
        >
          {[
            {
              img: '/fixxo-sticker-whatsapp.png',
              step: 'STEP 01',
              title: 'You Text',
              desc: 'Send any task in plain English to FIXXO on WhatsApp. No forms, no app, no account.',
            },
            {
              img: '/fixxo-sticker-network.png',
              step: 'STEP 02',
              title: 'We Route',
              desc: "FIXXO's system categorizes your task, assigns a verified human agent and sources the right service provider in your area.",
            },
            {
              img: '/fixxo-sticker-relax.png',
              step: 'STEP 03',
              title: 'Consider it Done',
              desc: "Your agent handles everything — sourcing, vetting, booking, confirming. You get a WhatsApp update when it's done.",
            },
          ].map((c, i) => (
            <div key={c.step} style={{ display: 'contents' }}>
              <div
                style={{
                  ...cardStyle,
                  borderTop: `3px solid ${CYAN}`,
                  padding: '24px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <img src={c.img} alt="" width={70} style={{ marginBottom: 14, display: 'block' }} />
                <div style={{ fontFamily: mono, fontSize: 11, color: CYAN, marginBottom: 8 }}>{c.step}</div>
                <h3 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 700, color: TEXT }}>{c.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{c.desc}</p>
              </div>
              {i < 2 ? (
                <div
                  className="fixxo-how-arrows"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 8px',
                    color: CYAN,
                    fontSize: 28,
                    fontWeight: 300,
                  }}
                >
                  →
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* VISION */}
      <section
        style={{
          padding: `72px ${padX}`,
          background: 'radial-gradient(ellipse at center, rgba(0,212,212,0.05) 0%, transparent 70%)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ ...sectionLabelStyle, marginBottom: 28 }}>// 04 · THE VISION</div>
          <div className="fixxo-two-col" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40, alignItems: 'start' }}>
            <div style={{ position: 'relative', minHeight: 220 }}>
              <img src="/fixxo-sticker-human-ai.png" alt="" width={180} style={{ display: 'block', position: 'relative', zIndex: 1 }} />
              <img
                src="/fixxo-sticker-gta.png"
                alt=""
                width={100}
                style={{
                  display: 'block',
                  marginTop: -28,
                  marginLeft: 24,
                  transform: 'rotate(-6deg)',
                  position: 'relative',
                  zIndex: 2,
                }}
              />
            </div>
            <div>
              <h2 style={{ margin: '0 0 16px', fontSize: '2rem', fontWeight: 700, color: TEXT }}>
                Human-powered first. AI-assisted always.
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: 15, color: MUTED, lineHeight: 1.75 }}>
                Most &quot;AI&quot; tools replace humans. FIXXO uses AI to make humans faster. Every task is handled by a real person — AI
                assists with routing, vendor matching, follow-up scheduling and quality checks. The goal: build enough trust data to
                eventually automate the most repeatable tasks while keeping humans in the loop for anything complex.
              </p>
              <div
                style={{
                  background: 'rgba(0,212,212,0.08)',
                  border: `1px solid ${CYAN}`,
                  borderRadius: 12,
                  padding: '20px 24px',
                  fontSize: 16,
                  fontWeight: 600,
                  color: TEXT,
                  lineHeight: 1.6,
                }}
              >
                &quot;By 2027, FIXXO will be the default task layer for 100,000 GTA residents — the first call you make when life needs
                handling.&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND */}
      <section style={{ padding: `72px ${padX}`, maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader num="05" title="BRAND SYSTEM" stickerSrc="/fixxo-sticker-brand.png" />
        <div className="fixxo-brand-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <div style={{ ...cardStyle, padding: 24 }}>
            <h3 style={{ margin: '0 0 18px', fontSize: 17, fontWeight: 700, color: TEXT }}>Color System</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {[
                { hex: '#0D0F14', label: 'Primary Dark' },
                { hex: CYAN, label: 'FIXXO Cyan' },
                { hex: '#FFFFFF', label: 'Text Primary' },
                { hex: MUTED, label: 'Text Muted' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: s.hex,
                      border: s.hex === '#FFFFFF' ? `1px solid rgba(0,212,212,0.25)` : 'none',
                      margin: '0 auto 6px',
                    }}
                  />
                  <div style={{ fontSize: 10, color: MUTED, maxWidth: 72, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...cardStyle, padding: 24 }}>
            <h3 style={{ margin: '0 0 18px', fontSize: 17, fontWeight: 700, color: TEXT }}>Typography</h3>
            <p style={{ margin: 0, fontSize: 14, color: MUTED, lineHeight: 1.75 }}>
              <span style={{ color: TEXT, fontWeight: 600 }}>Inter</span> — UI, body, buttons
              <br />
              <span style={{ color: TEXT, fontWeight: 800 }}>font-weight: 800</span> — headlines
              <br />
              <span style={{ letterSpacing: '0.15em', color: TEXT }}>letter-spacing: 0.15em</span> — brand wordmark
              <br />
              <br />
              Why: Clean, universal, renders perfectly on all WhatsApp-adjacent surfaces
            </p>
          </div>
          <div style={{ ...cardStyle, padding: 24 }}>
            <h3 style={{ margin: '0 0 18px', fontSize: 17, fontWeight: 700, color: TEXT }}>Why Dark + Cyan</h3>
            <p style={{ margin: 0, fontSize: 14, color: MUTED, lineHeight: 1.75 }}>
              Dark backgrounds signal trust and premium service — users hand FIXXO real tasks that matter. Cyan creates energy and
              forward motion without the aggression of red or orange. The combination reads as &quot;capable and calm&quot; — exactly what you
              want from a task concierge.
            </p>
          </div>
        </div>
      </section>

      {/* TECHNICAL DECISIONS */}
      <section style={{ padding: `0 ${padX} 72px`, maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader num="06" title="TECHNICAL DECISIONS" stickerSrc="/fixxo-sticker-code.png" />
        <div className="fixxo-decision-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            {
              n: '01',
              t: 'Why WhatsApp API first',
              b: 'WhatsApp has 2B+ users globally. GTA newcomers — the primary audience — already use WhatsApp as their default communication layer. Zero friction, zero download, zero learning curve. The Twilio WhatsApp Business API gives us a programmable channel with read receipts, media support and webhook integration in under a day.',
            },
            {
              n: '02',
              t: 'Why human-first before AI',
              b: 'Trust is the hardest thing to earn in a service marketplace. Automating too early means errors, and errors in real-world tasks (wrong contractor, missed appointment) destroy trust permanently. Human agents let us learn what "good" looks like before we automate it. Every human interaction is a training data point.',
            },
            {
              n: '03',
              t: 'Why GTA-only to start',
              b: 'Geographic focus lets us build a dense vendor network fast. 100 trusted vendors in one city is more valuable than 10 vendors in 10 cities. GTA also has the highest concentration of our target user — newcomers to Canada navigating an unfamiliar service landscape.',
            },
            {
              n: '04',
              t: 'Why no app',
              b: "Every app requires a download, an account, onboarding. Each step loses 20-40% of users. WhatsApp removes all of that. The constraint of a chat interface also forces FIXXO to be genuinely conversational — you can't hide behind a complex UI.",
            },
          ].map((d) => (
            <div key={d.n} style={{ ...cardStyle, padding: 24, position: 'relative' }}>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 12,
                  color: CYAN,
                  fontWeight: 700,
                  marginBottom: 12,
                  padding: '4px 10px',
                  border: `1px solid ${CYAN}`,
                  borderRadius: 6,
                  display: 'inline-block',
                  background: 'rgba(0,212,212,0.08)',
                }}
              >
                [ {d.n} ]
              </div>
              <h3 style={{ margin: '0 0 12px', fontSize: 17, fontWeight: 700, color: TEXT }}>{d.t}</h3>
              <p style={{ margin: 0, fontSize: 14, color: MUTED, lineHeight: 1.75 }}>{d.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section style={{ padding: `0 ${padX} 72px`, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ ...sectionLabelStyle, marginBottom: 8 }}>// 07 · SYSTEM ARCHITECTURE</div>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: MUTED }}>The most complex flow in this portfolio.</p>
        </div>
        <FixxoArchitectureSvg />
      </section>

      {/* TECH STACK */}
      <section style={{ padding: `0 ${padX} 72px`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ ...sectionLabelStyle, marginBottom: 28 }}>// 08 · TECH STACK</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="fixxo-tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              {
                icon: '💬',
                name: 'Twilio WhatsApp API',
                desc: 'Programmable messaging layer · inbound/outbound webhook integration',
                roadmap: false,
              },
              { icon: '⚡', name: 'Node.js + Express', desc: 'Task router backend · REST API · webhook handler · classification engine', roadmap: false },
              { icon: '🟩', name: 'Supabase', desc: 'Postgres DB · auth · real-time · task and vendor data storage', roadmap: false },
              { icon: '⚛️', name: 'Next.js', desc: 'Agent dashboard · React frontend · server-side rendering · real-time task queue UI', roadmap: false },
            ].map((s) => (
              <div
                key={s.name}
                style={{
                  ...cardStyle,
                  borderTop: `3px solid ${CYAN}`,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: TEXT, marginBottom: 8 }}>{s.name}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="fixxo-tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { icon: '🔴', name: 'Redis', desc: 'Session state · rate limiting · message deduplication', roadmap: false },
              { icon: '💳', name: 'Stripe (Roadmap)', desc: 'Payment processing · escrow · vendor payouts', roadmap: true },
              { icon: '🧠', name: 'Claude API (Roadmap)', desc: 'NLP task understanding · smart vendor matching · quality scoring', roadmap: true },
              { icon: '🌐', name: 'Vercel', desc: 'Frontend deployment · edge functions · CI/CD pipeline', roadmap: false },
            ].map((s) => (
              <div
                key={s.name}
                style={{
                  ...cardStyle,
                  borderTop: `3px solid ${CYAN}`,
                  padding: 20,
                  position: 'relative',
                  ...(s.roadmap
                    ? { border: '1px dashed rgba(0,212,212,0.4)', borderTop: `3px solid ${CYAN}` }
                    : {}),
                }}
              >
                {s.roadmap ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontFamily: mono,
                      fontSize: 9,
                      fontWeight: 700,
                      color: CYAN,
                      padding: '3px 8px',
                      border: `1px solid ${CYAN}`,
                      borderRadius: 4,
                      background: 'rgba(0,212,212,0.1)',
                    }}
                  >
                    [ ROADMAP ]
                  </div>
                ) : null}
                <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: TEXT, marginBottom: 8 }}>{s.name}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS MODEL */}
      <section style={{ padding: `0 ${padX} 72px`, maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader num="09" title="BUSINESS MODEL" stickerSrc="/fixxo-sticker-pricing.png" />
        <div className="fixxo-pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'stretch' }}>
          <div style={{ ...cardStyle, padding: 28, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: TEXT }}>Pay Per Task</h3>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: CYAN, marginBottom: 16 }}>$5–$15 per task</div>
            <ul style={{ margin: '0 0 24px', paddingLeft: 18, color: MUTED, fontSize: 14, lineHeight: 1.7, flex: 1 }}>
              <li>Basic tasks only</li>
              <li>1 active task at a time</li>
              <li>Standard response time (2hrs)</li>
            </ul>
            <button
              type="button"
              style={{
                ...pill(true),
                width: '100%',
                justifyContent: 'center',
                padding: '12px 20px',
                cursor: 'default',
              }}
            >
              Get Started
            </button>
          </div>
          <div
            style={{
              ...cardStyle,
              padding: 28,
              border: `2px solid ${CYAN}`,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: mono,
                fontSize: 10,
                fontWeight: 700,
                color: CYAN,
                background: BG,
                padding: '4px 12px',
                borderRadius: 99,
                border: `1px solid ${CYAN}`,
              }}
            >
              [ MOST POPULAR ]
            </div>
            <h3 style={{ margin: '12px 0 8px', fontSize: 18, fontWeight: 700, color: TEXT }}>FIXXO Pass</h3>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: CYAN, marginBottom: 16 }}>$29/month</div>
            <ul style={{ margin: '0 0 24px', paddingLeft: 18, color: MUTED, fontSize: 14, lineHeight: 1.7, flex: 1 }}>
              <li>Unlimited tasks</li>
              <li>Priority response (30min)</li>
              <li>Dedicated agent</li>
              <li>Task history</li>
            </ul>
            <button
              type="button"
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: 99,
                border: 'none',
                background: CYAN,
                color: BG,
                fontWeight: 700,
                fontFamily: sans,
                cursor: 'pointer',
              }}
            >
              Subscribe
            </button>
          </div>
          <div style={{ ...cardStyle, padding: 28, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: TEXT }}>Concierge</h3>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: CYAN, marginBottom: 16 }}>Custom</div>
            <ul style={{ margin: '0 0 24px', paddingLeft: 18, color: MUTED, fontSize: 14, lineHeight: 1.7, flex: 1 }}>
              <li>Business accounts</li>
              <li>API access</li>
              <li>Bulk task management</li>
              <li>SLA guarantee</li>
            </ul>
            <button
              type="button"
              style={{
                ...pill(true),
                width: '100%',
                justifyContent: 'center',
                padding: '12px 20px',
                border: `1px solid ${CYAN}`,
                color: CYAN,
                cursor: 'pointer',
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section style={{ padding: `0 ${padX} 72px`, maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader num="10" title="ROADMAP" stickerSrc="/fixxo-sticker-rocket.png" />
        <div className="fixxo-roadmap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            {
              phase: '1',
              badge: 'COMPLETE',
              badgeBg: 'rgba(34,197,94,0.15)',
              badgeColor: '#22C55E',
              title: 'Foundation',
              items: [
                'WhatsApp API integration',
                'Task routing engine',
                'Human agent dashboard',
                'GTA vendor database (50 vendors)',
                'Landing page live at fixxo-e.vercel.app',
              ],
              complete: true,
            },
            {
              phase: '2',
              badge: 'IN PROGRESS',
              badgeBg: 'rgba(245,158,11,0.15)',
              badgeColor: '#F59E0B',
              title: 'Growth',
              items: [
                'Payment processing via Stripe',
                'Vendor self-serve portal',
                'Agent mobile app',
                '200+ GTA vendor network',
                'Public beta launch',
              ],
              complete: false,
            },
            {
              phase: '3',
              badge: 'PLANNED',
              badgeBg: 'rgba(107,114,128,0.2)',
              badgeColor: MUTED,
              title: 'AI Layer',
              items: [
                'Claude API integration for smart routing',
                'Automated task classification',
                'Vendor scoring algorithm',
                'Predictive task suggestions',
                '10,000 active users target',
              ],
              complete: false,
            },
            {
              phase: '4',
              badge: 'VISION',
              badgeBg: 'rgba(0,212,212,0.12)',
              badgeColor: CYAN,
              title: 'Scale',
              items: [
                'Expand beyond GTA (Vancouver, Montreal)',
                'B2B concierge for companies',
                'FIXXO API for third-party integrations',
                '100,000 GTA residents served',
                'Full task automation for repeatable tasks',
              ],
              complete: false,
            },
          ].map((p) => (
            <div key={p.phase} style={{ ...cardStyle, padding: 22, position: 'relative', overflow: 'hidden', minHeight: 320 }}>
              <span
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 12,
                  fontFamily: mono,
                  fontSize: 9,
                  fontWeight: 700,
                  color: p.badgeColor,
                  background: p.badgeBg,
                  padding: '4px 8px',
                  borderRadius: 4,
                  border: `1px solid ${p.badgeColor}40`,
                }}
              >
                [ {p.badge} ]
              </span>
              <span
                style={{
                  position: 'absolute',
                  left: 8,
                  top: 36,
                  fontSize: '4.5rem',
                  fontWeight: 800,
                  color: MUTED,
                  opacity: 0.12,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
                aria-hidden
              >
                {p.phase}
              </span>
              <h3 style={{ margin: '36px 0 16px', fontSize: 17, fontWeight: 700, color: TEXT, position: 'relative' }}>{p.title}</h3>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', position: 'relative' }}>
                {p.items.map((it) => (
                  <li key={it} style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, marginBottom: 8, paddingLeft: 18, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: p.complete ? CYAN : MUTED }}>{p.complete ? '✓' : '·'}</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* OPEN QUESTIONS */}
      <section style={{ padding: `0 ${padX} 80px`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ ...sectionLabelStyle, marginBottom: 8 }}>// 11 · OPEN QUESTIONS</div>
          <p style={{ margin: 0, fontSize: 15, color: MUTED }}>Honest product thinking — what we&apos;re still figuring out.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            {
              q: 'How do we verify vendor quality at scale?',
              a: 'Currently manual vetting. Exploring rating systems, repeat booking signals and agent feedback loops.',
            },
            {
              q: "What's the right balance of human vs AI?",
              a: 'Every automated task saves cost but risks trust. The threshold is unclear until we have data on task complexity distribution.',
            },
            {
              q: 'How do we handle liability for bad outcomes?',
              a: 'If a vendor damages property or misses a booking, who is responsible? Legal framework for marketplace liability in Ontario is still being researched.',
            },
          ].map((item) => (
            <div key={item.q} style={{ ...cardStyle, padding: 24 }}>
              <div style={{ fontSize: 28, color: CYAN, fontWeight: 700, marginBottom: 12, lineHeight: 1 }}>?</div>
              <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: TEXT }}>{item.q}</h3>
              <p style={{ margin: 0, fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="fixxo-footer"
        style={{
          position: 'relative',
          padding: '28px clamp(16px, 4vw, 48px)',
          backgroundColor: CARD,
          borderTop: '1px solid rgba(0,212,212,0.15)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          className="fixxo-footer-left"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifySelf: 'start',
            gap: 0,
            minWidth: 0,
          }}
        >
          <img
            src="/fixxo-sticker-human-ai.png"
            alt=""
            width={45}
            style={{
              marginRight: '1rem',
              opacity: 0.6,
              flexShrink: 0,
              display: 'block',
            }}
          />
          <span style={{ fontFamily: mono, fontSize: 12, color: MUTED }}>PROJ / 04 · FIXXO · 2026</span>
        </div>
        <span style={{ fontFamily: sans, fontSize: 13, color: CYAN, fontStyle: 'italic', textAlign: 'center' }}>
          Every task you can imagine. Consider it done.
        </span>
        <button
          type="button"
          onClick={back}
          style={{
            justifySelf: 'end',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: CYAN,
            fontFamily: sans,
            fontSize: 14,
            padding: 0,
            fontWeight: 500,
          }}
        >
          ← back to projects
        </button>
      </footer>
    </div>
  );
}
