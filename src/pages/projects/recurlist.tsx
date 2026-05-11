import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BG = '#F0FBF4';
const GREEN = '#22C55E';
const DARK = '#14532D';
const ACCENT = '#16A34A';
const CARD = '#FFFFFF';
const BORDER_GREEN = '#BBF7D0';
const BORDER = `1px solid ${BORDER_GREEN}`;
const SHADOW = '0 2px 12px rgba(0, 0, 0, 0.06)';
const FOOTER_MINT = '#D1FAE5';
const MUTED_GREEN = '#15803d';
const FRAME = '#1a1a1a';
const sans =
  'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const ARCH_MONO = "'JetBrains Mono', ui-monospace, monospace";
const API_INNER_BG = '#DCFCE7';
const ROADMAP_FILL = '#F0FDF4';
const LANE_SEP = '#BBF7D0';
const SIDEBAR = '#14532D';
const ARCH_MUTED = '#15803d';

const photo = (name: string) => `/RecurList - Photos/${name}`;

const techPills = [
  'React Native',
  'Expo SDK 54',
  'TypeScript',
  'Supabase',
  'Edge Functions',
  'React Navigation v7',
  'EAS',
  'RevenueCat',
  'expo-notifications',
  'expo-haptics',
];

const builtWithItems: { icon: string; name: string; desc: string }[] = [
  {
    icon: '⚛️',
    name: 'React Native',
    desc: 'Cross-platform iOS & Android from one codebase',
  },
  {
    icon: '📱',
    name: 'Expo SDK 54',
    desc: 'Managed workflow with new architecture enabled',
  },
  {
    icon: '🔷',
    name: 'TypeScript',
    desc: 'Strict typing across all screens and utilities',
  },
  {
    icon: '🟩',
    name: 'Supabase',
    desc: 'Postgres DB, Auth, Realtime and Edge Functions',
  },
  {
    icon: '⚡',
    name: 'Edge Functions (Deno)',
    desc: 'Serverless list reset logic and cron jobs',
  },
  {
    icon: '🗺️',
    name: 'React Navigation v7',
    desc: 'Native stack and bottom tab navigation',
  },
  {
    icon: '🔔',
    name: 'expo-notifications',
    desc: 'Push notifications with custom icons',
  },
  {
    icon: '💳',
    name: 'RevenueCat',
    desc: 'Subscription management (monthly + annual tiers)',
  },
  {
    icon: '🔐',
    name: 'expo-secure-store',
    desc: 'Secure on-device key storage',
  },
  {
    icon: '📦',
    name: 'EAS',
    desc: 'Expo Application Services for builds and distribution',
  },
];

const whyGreenCards: { icon: string; title: string; body: string }[] = [
  {
    icon: '🌿',
    title: 'Trust & Safety',
    body: 'Green is universally associated with freshness, health and trust. For a grocery app, it signals that food is fresh and the app is reliable.',
  },
  {
    icon: '💚',
    title: 'Calm Action',
    body: 'Unlike red (urgency) or blue (corporate), green encourages calm decision-making — ideal for a shopping context where users need to think clearly.',
  },
  {
    icon: '🍃',
    title: 'Canadian Nature',
    body: "Green connects to Canada's natural identity. For an app built specifically for Canadians, the palette feels local and grounded.",
  },
];

const floatVegEmojis = ['🥬', '🥕', '🍅', '🧄', '🥦', '🍋', '🛒', '🍎'];

const whatsNextCards: { icon: string; title: string; body: string }[] = [
  {
    icon: '🔍',
    title: 'Canadian Grocery Price Scraper',
    body:
      "We're building a Python scraper that pulls real-time prices from 9 Canadian grocery chains — Loblaws, Walmart Canada, No Frills, FreshCo, Costco, Metro, Sobeys, T&T and Giant Tiger. The scraper runs on a cron schedule, normalizes product names across stores using fuzzy matching, and stores results in Supabase. Users see live price comparisons without any manual input.",
  },
  {
    icon: '🧠',
    title: 'AI Consumption Trend Engine',
    body:
      'A machine learning model that learns how fast each household consumes each item — based on how often they check it off and how quickly they reorder. Over time it builds a custom reset interval per item per household. Instead of "weekly" or "monthly", your list resets exactly when you need it to. No configuration required.',
  },
  {
    icon: '🔗',
    title: 'Full Automation Mode',
    body:
      'Combining the price scraper + AI trend engine + push notifications: RecurList will tell you "Your Milk is running low — Loblaws has the best price today and gives you 5pts/$ on your Amex Cobalt. Add to list?" One tap. Done. Fully automated grocery intelligence.',
  },
];

const features: { img: string; title: string; body: string }[] = [
  {
    img: 'Screen2.jpeg',
    title: 'Recurring Smart Lists',
    body: 'Set weekly, bi-weekly or monthly reset schedules. Your list is always ready before your next trip.',
  },
  {
    img: 'Screen7.jpeg',
    title: 'Canadian Price Comparison',
    body: 'Compare prices across No Frills, Walmart, Loblaws, FreshCo, Costco and 4 more stores in real time.',
  },
  {
    img: 'Screen8.jpeg',
    title: 'Credit Card Rewards Engine',
    body: 'Tell the app your cards. It calculates which store earns you the most points per dollar on your cart.',
  },
  {
    img: 'Screen9.jpeg',
    title: 'Points Breakdown',
    body: 'See exactly how many points you earn per store, per trip — with a running yearly total.',
  },
  {
    img: 'Screen4.jpeg',
    title: 'Shop Together',
    body: 'Share lists with family or roommates. Everyone stays in sync — no duplicate purchases.',
  },
  {
    img: 'Screen10.jpeg',
    title: 'Premium Tier via RevenueCat',
    body: 'Unlimited lists, all 9 stores, all credit cards, full history. CAD $14.99/year or $2.49/month.',
  },
];

function IPhoneFrame({
  src,
  alt,
  tilt,
  width,
}: {
  src: string;
  alt: string;
  tilt: 'left' | 'center' | 'right';
  width: number;
}) {
  const transform =
    tilt === 'left'
      ? 'rotate(-4deg)'
      : tilt === 'right'
        ? 'rotate(4deg)'
        : 'rotate(0deg) scale(1.06)';
  return (
    <div
      style={{
        flexShrink: 0,
        width,
        transform,
        transformOrigin: 'center bottom',
        boxShadow: SHADOW,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          border: `8px solid ${FRAME}`,
          borderRadius: 44,
          overflow: 'hidden',
          background: FRAME,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
}

function RecurListArchitectureDiagram() {
  const W = 1200;
  const H = 900;
  const SB = 48;
  const cx = 600;
  const x0 = 52;
  const innerW = W - x0 - 8;

  const L1_T = 14;
  const L1_B = 140;
  const L2_T = 168;
  const L2_B = 278;
  const L3_T = 306;
  const L3_B = 422;
  const L4_T = 450;
  const L4_B = 602;
  const L5_T = 630;
  const L5_B = 796;

  function Sidebar({ top, h, label }: { top: number; h: number; label: string }) {
    const mid = top + h / 2;
    return (
      <>
        <rect x={0} y={top} width={SB} height={h} fill={SIDEBAR} />
        <g transform={`translate(24 ${mid}) rotate(-90)`}>
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={12}
            fontFamily={sans}
            fontWeight={600}
          >
            {label}
          </text>
        </g>
      </>
    );
  }

  function LaneSep(y: number) {
    return <line x1={0} y1={y} x2={W} y2={y} stroke={LANE_SEP} strokeWidth={2} />;
  }

  function Pill(x: number, y: number, label: string) {
    const tw = Math.min(118, 10 + label.length * 5.5);
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={tw}
          height={18}
          rx={9}
          fill={BG}
          stroke={ACCENT}
          strokeWidth={1}
        />
        <text
          x={x + tw / 2}
          y={y + 13}
          textAnchor="middle"
          fill={DARK}
          fontFamily={ARCH_MONO}
          fontSize={8}
        >
          {label}
        </text>
      </g>
    );
  }

  const gapMid = (a: number, b: number) => (a + b) / 2;

  const boxW2 = (innerW - 10) / 2;
  const boxW3 = (innerW - 16) / 3;
  const boxW5 = (innerW - 20) / 5;
  const boxWrm = (innerW - 16) / 3;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      role="img"
      aria-label="RecurList swimlane architecture"
      style={{ display: 'block', maxWidth: '100%' }}
    >
      <defs>
        <marker id="rl-swim-arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={ACCENT} />
        </marker>
      </defs>
      <rect x={0} y={0} width={W} height={H} fill={BG} stroke="none" />

      <Sidebar top={L1_T} h={L1_B - L1_T} label="CLIENT LAYER" />
      <rect
        x={x0}
        y={L1_T + 10}
        width={boxW2}
        height={72}
        rx={8}
        fill={CARD}
        stroke={ACCENT}
        strokeWidth={2}
      />
      <text x={x0 + 10} y={L1_T + 30} fill={DARK} fontFamily={sans} fontSize={11} fontWeight={700}>
        [ iOS App ]
      </text>
      <text x={x0 + 10} y={L1_T + 48} fill="#64748b" fontFamily={sans} fontSize={9}>
        React Native 0.81.5 · Expo SDK 54
      </text>
      <rect
        x={x0 + boxW2 + 10}
        y={L1_T + 10}
        width={boxW2}
        height={72}
        rx={8}
        fill={CARD}
        stroke={ACCENT}
        strokeWidth={2}
      />
      <text x={x0 + boxW2 + 20} y={L1_T + 30} fill={DARK} fontFamily={sans} fontSize={11} fontWeight={700}>
        [ Android App ]
      </text>
      <text x={x0 + boxW2 + 20} y={L1_T + 48} fill="#64748b" fontFamily={sans} fontSize={9}>
        React Native 0.81.5 · Expo SDK 54
      </text>
      {Pill(x0 + 36, L1_T + 92, 'expo-haptics')}
      {Pill(x0 + 156, L1_T + 92, 'expo-notifications')}
      {Pill(x0 + 284, L1_T + 92, 'expo-secure-store')}
      {Pill(x0 + boxW2 + 46, L1_T + 92, 'expo-haptics')}
      {Pill(x0 + boxW2 + 166, L1_T + 92, 'expo-notifications')}
      {Pill(x0 + boxW2 + 294, L1_T + 92, 'expo-secure-store')}
      <LaneSep y={L1_B} />

      <Sidebar top={L2_T} h={L2_B - L2_T} label="STATE LAYER" />
      <rect
        x={x0}
        y={L2_T + 10}
        width={boxW3}
        height={88}
        rx={8}
        fill={CARD}
        stroke={ACCENT}
        strokeWidth={2}
      />
      <text x={x0 + 8} y={L2_T + 28} fill={DARK} fontFamily={sans} fontSize={10} fontWeight={700}>
        [ React Context ]
      </text>
      <text x={x0 + 8} y={L2_T + 44} fill="#64748b" fontFamily={sans} fontSize={8}>
        auth · user profile · active list
      </text>
      <rect
        x={x0 + boxW3 + 8}
        y={L2_T + 10}
        width={boxW3}
        height={88}
        rx={8}
        fill={CARD}
        stroke={ACCENT}
        strokeWidth={2}
      />
      <text x={x0 + boxW3 + 16} y={L2_T + 28} fill={DARK} fontFamily={sans} fontSize={10} fontWeight={700}>
        [ React Query ]
      </text>
      <text x={x0 + boxW3 + 16} y={L2_T + 42} fill="#64748b" fontFamily={sans} fontSize={8}>
        server cache · optimistic updates ·
      </text>
      <text x={x0 + boxW3 + 16} y={L2_T + 54} fill="#64748b" fontFamily={sans} fontSize={8}>
        background sync
      </text>
      <rect
        x={x0 + 2 * boxW3 + 16}
        y={L2_T + 10}
        width={boxW3}
        height={88}
        rx={8}
        fill={CARD}
        stroke={ACCENT}
        strokeWidth={2}
      />
      <text x={x0 + 2 * boxW3 + 24} y={L2_T + 28} fill={DARK} fontFamily={sans} fontSize={10} fontWeight={700}>
        [ React Navigation v7 ]
      </text>
      <text x={x0 + 2 * boxW3 + 24} y={L2_T + 44} fill="#64748b" fontFamily={sans} fontSize={8}>
        native stack · bottom tabs · deep links
      </text>
      <text x={x0 + 2 * boxW3 + 24} y={L2_T + 56} fill="#64748b" fontFamily={sans} fontSize={8}>
        recurlist://
      </text>
      <LaneSep y={L2_B} />

      <Sidebar top={L3_T} h={L3_B - L3_T} label="API LAYER" />
      <rect
        x={x0}
        y={L3_T + 10}
        width={innerW}
        height={98}
        rx={8}
        fill={CARD}
        stroke={ACCENT}
        strokeWidth={2}
      />
      <text x={x0 + 12} y={L3_T + 30} fill={DARK} fontFamily={sans} fontSize={12} fontWeight={700}>
        [ Supabase Client SDK v2 ]
      </text>
      {(['REST API', 'Realtime WebSocket', 'RLS Policies'] as const).map((lbl, i) => {
        const subW = (innerW - 40) / 3;
        const sx = x0 + 12 + i * (subW + 8);
        return (
          <rect
            key={lbl}
            x={sx}
            y={L3_T + 42}
            width={subW}
            height={54}
            rx={6}
            fill={API_INNER_BG}
            stroke={ACCENT}
            strokeWidth={2}
          />
        );
      })}
      {(['REST API', 'Realtime WebSocket', 'RLS Policies'] as const).map((lbl, i) => {
        const subW = (innerW - 40) / 3;
        const sx = x0 + 12 + i * (subW + 8);
        return (
          <text
            key={`t-${lbl}`}
            x={sx + subW / 2}
            y={L3_T + 74}
            textAnchor="middle"
            fill={DARK}
            fontFamily={sans}
            fontSize={10}
            fontWeight={600}
          >
            {lbl}
          </text>
        );
      })}
      <LaneSep y={L3_B} />

      <Sidebar top={L4_T} h={L4_B - L4_T} label="BACKEND" />
      {(
        [
          {
            title: '[ Supabase Auth ]',
            lines: ['email · magic link ·', 'Google OAuth'],
          },
          {
            title: '[ Postgres DB ]',
            lines: ['lists · items · users · resets ·', 'stores · rewards_history'],
          },
          {
            title: '[ Supabase Realtime ]',
            lines: ['live sync · presence ·', 'broadcast'],
          },
          {
            title: '[ Edge Functions ]',
            lines: ['Deno runtime · reset-lists', 'cron · push triggers'],
          },
          {
            title: '[ RevenueCat ]',
            lines: ['premium_monthly ·', 'premium_annual · entitlement: premium'],
          },
        ] as const
      ).map((b, i) => {
        const bx = x0 + i * (boxW5 + 5);
        return (
          <g key={b.title}>
            <rect
              x={bx}
              y={L4_T + 10}
              width={boxW5}
              height={132}
              rx={8}
              fill={CARD}
              stroke={ACCENT}
              strokeWidth={2}
            />
            <text x={bx + 8} y={L4_T + 30} fill={DARK} fontFamily={sans} fontSize={9} fontWeight={700}>
              {b.title}
            </text>
            {b.lines.map((ln, j) => (
              <text
                key={`${b.title}-${j}`}
                x={bx + 8}
                y={L4_T + 46 + j * 12}
                fill="#64748b"
                fontFamily={sans}
                fontSize={7.5}
              >
                {ln}
              </text>
            ))}
          </g>
        );
      })}
      <LaneSep y={L4_B} />

      <rect
        x={SB}
        y={L5_T}
        width={W - SB}
        height={L5_B - L5_T}
        fill={ROADMAP_FILL}
        stroke={ACCENT}
        strokeWidth={2}
        strokeDasharray="8 6"
        pointerEvents="none"
      />
      <Sidebar top={L5_T} h={L5_B - L5_T} label="ROADMAP" />

      {(
        [
          {
            title: '[ Price Scraper ]',
            lines: [
              'Python · fuzzy product matching ·',
              '9 Canadian chains · Supabase cron',
            ],
          },
          {
            title: '[ AI Trend Engine ]',
            lines: ['ML consumption model · custom', 'reset intervals · per-item per-household'],
          },
          {
            title: '[ Full Auto Mode ]',
            lines: ['scraper + AI + push ·', '"Milk running low — Loblaws best price today"'],
          },
        ] as const
      ).map((b, i) => {
        const bx = x0 + i * (boxWrm + 8);
        const bw = boxWrm;
        return (
          <g key={b.title}>
            <rect
              x={bx}
              y={L5_T + 12}
              width={bw}
              height={148}
              rx={8}
              fill={ROADMAP_FILL}
              stroke={ACCENT}
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            <rect x={bx + bw - 78} y={L5_T + 18} width={72} height={16} rx={2} fill={ACCENT} />
            <text
              x={bx + bw - 42}
              y={L5_T + 30}
              textAnchor="middle"
              fill={CARD}
              fontFamily={sans}
              fontSize={7}
              fontWeight={700}
            >
              [ ROADMAP ]
            </text>
            <text x={bx + 8} y={L5_T + 52} fill={DARK} fontFamily={sans} fontSize={10} fontWeight={700}>
              {b.title}
            </text>
            {b.lines.map((ln, j) => (
              <text
                key={`${b.title}-${j}`}
                x={bx + 8}
                y={L5_T + 68 + j * 12}
                fill="#64748b"
                fontFamily={sans}
                fontSize={8}
              >
                {ln}
              </text>
            ))}
          </g>
        );
      })}
      <LaneSep y={L5_B} />

      <rect x={862} y={848} width={12} height={12} fill={CARD} stroke={ACCENT} strokeWidth={2} />
      <text x={878} y={859} fill={DARK} fontFamily={sans} fontSize={11}>
        solid green border = LIVE
      </text>
      <rect
        x={862}
        y={868}
        width={12}
        height={12}
        fill={ROADMAP_FILL}
        stroke={ACCENT}
        strokeWidth={2}
        strokeDasharray="4 3"
      />
      <text x={878} y={879} fill={DARK} fontFamily={sans} fontSize={11}>
        dashed green border = ROADMAP
      </text>

      <line
        x1={cx}
        y1={L1_B}
        x2={cx}
        y2={L2_T}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd="url(#rl-swim-arr)"
      />
      <text x={618} y={gapMid(L1_B, L2_T) + 4} fill={ARCH_MUTED} fontFamily={ARCH_MONO} fontSize={11}>
        dispatches action
      </text>

      <line
        x1={cx}
        y1={L2_B}
        x2={cx}
        y2={L3_T}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd="url(#rl-swim-arr)"
      />
      <text x={618} y={gapMid(L2_B, L3_T) + 4} fill={ARCH_MUTED} fontFamily={ARCH_MONO} fontSize={11}>
        mutation / query
      </text>

      <line
        x1={cx}
        y1={L3_B}
        x2={cx}
        y2={L4_T}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd="url(#rl-swim-arr)"
      />
      <text x={618} y={gapMid(L3_B, L4_T) + 4} fill={ARCH_MUTED} fontFamily={ARCH_MONO} fontSize={11}>
        REST + WebSocket + RLS
      </text>

      <line
        x1={cx}
        y1={L4_B}
        x2={cx}
        y2={L5_T}
        stroke={ACCENT}
        strokeWidth={2}
        strokeDasharray="6 5"
        markerEnd="url(#rl-swim-arr)"
      />
      <text x={618} y={gapMid(L4_B, L5_T) + 4} fill={ARCH_MUTED} fontFamily={ARCH_MONO} fontSize={11}>
        planned integration
      </text>
    </svg>
  );
}

export default function RecurListProjectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backToProjects = () => navigate('/#projects');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: BG,
        color: DARK,
        fontFamily: sans,
        fontSize: 16,
        lineHeight: 1.55,
      }}
    >
      <style>{`
        .rl-nav {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: #FFFFFF;
          border-bottom: ${BORDER};
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .rl-nav-back { justify-self: start; }
        .rl-nav-brand { justify-self: center; }
        .rl-nav-domain { justify-self: end; }
        @media (max-width: 520px) {
          .rl-nav {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
          }
          .rl-nav-back { justify-self: center; order: 2; }
          .rl-nav-brand { order: 1; }
          .rl-nav-domain { order: 3; }
        }
        .rl-wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 1.5rem 1.25rem 3rem;
        }
        .rl-hero-mockup-wrap {
          position: relative;
          overflow: hidden;
          margin-top: 2.5rem;
          padding: 3rem 2rem;
          min-height: 420px;
        }
        .rl-hero-deco {
          position: absolute;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }
        .rl-hero-phones {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          position: relative;
          z-index: 1;
          padding: 0 0.5rem;
        }
        @media (min-width: 900px) {
          .rl-hero-phones {
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            gap: 1.25rem;
          }
        }
        .phone-frame {
          border: 6px solid #1a1a1a;
          border-radius: 32px;
          overflow: hidden;
          width: 100%;
          background: #1a1a1a;
          margin-bottom: 1rem;
        }
        .phone-frame img {
          width: 100%;
          display: block;
          border-radius: 26px;
        }
        .rl-feature-card {
          display: flex;
          flex-direction: column;
          background: ${CARD};
          border: ${BORDER};
          border-radius: 16px;
          box-shadow: ${SHADOW};
          overflow: hidden;
        }
        .rl-feature-card-body {
          padding: 0 1.25rem 1.35rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .rl-stats {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 520px) {
          .rl-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .rl-stats { grid-template-columns: repeat(4, 1fr); }
        }
        .rl-problem-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .rl-problem-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .rl-features {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .rl-features { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .rl-features { grid-template-columns: repeat(3, 1fr); }
        }
        .rl-built-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 520px) {
          .rl-built-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .rl-built-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .rl-built-card {
          background: ${CARD};
          border: ${BORDER};
          border-radius: 12px;
          padding: 1rem;
        }
        .rl-why-green-section {
          position: relative;
          overflow: hidden;
          padding: 2rem 0 1rem;
          margin-top: 2.5rem;
        }
        .rl-float-veg {
          position: absolute;
          pointer-events: none;
          user-select: none;
          opacity: 0.15;
          line-height: 1;
        }
        @keyframes floatVeg {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
        .rl-why-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 768px) {
          .rl-why-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .rl-whats-next-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .rl-whats-next-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .rl-previews-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 0.5rem 0 1rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .rl-preview-item {
          flex: 0 0 auto;
          scroll-snap-align: start;
          width: 200px;
        }
        @media (min-width: 640px) {
          .rl-preview-item { width: 220px; }
        }
        .rl-footer-strip {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr;
          text-align: center;
          align-items: center;
          padding: 1.25rem 1.25rem;
          background: ${FOOTER_MINT};
          border-top: ${BORDER};
          font-size: 13px;
          font-weight: 600;
        }
        @media (min-width: 768px) {
          .rl-footer-strip {
            grid-template-columns: 1fr auto 1fr;
            text-align: left;
          }
          .rl-footer-strip .rl-footer-center { text-align: center; }
          .rl-footer-strip .rl-footer-right { text-align: right; }
        }
      `}</style>

      <header className="rl-nav">
        <button
          type="button"
          className="rl-nav-back"
          onClick={backToProjects}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 600,
            color: DARK,
            cursor: 'pointer',
          }}
        >
          ← back
        </button>
        <div className="rl-nav-brand" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="/Logo.png"
            width={32}
            height={32}
            style={{ borderRadius: 8 }}
            alt="RecurList"
          />
          <span style={{ fontWeight: 800, fontSize: 17, color: GREEN, letterSpacing: '-0.02em' }}>
            RecurList
          </span>
        </div>
        <span className="rl-nav-domain" style={{ color: MUTED_GREEN, fontSize: 13, fontWeight: 500 }}>
          hetppatel.dev
        </span>
      </header>

      <main className="rl-wrap">
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.35rem 1rem',
              borderRadius: 99,
              background: CARD,
              border: BORDER,
              color: ACCENT,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
            🍁 Built for Canadians
          </div>
          <h1
            style={{
              margin: '0 0 1rem',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              color: DARK,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Stop rewriting the same list. Every. Single. Week.
          </h1>
          <p
            style={{
              margin: '0 0 1.75rem',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: MUTED_GREEN,
              maxWidth: 640,
              fontWeight: 500,
            }}
          >
            Set it once, shop forever. RecurList remembers your routine, compares Canadian store
            prices, and maximizes your credit card rewards on every trip.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            <button
              type="button"
              disabled
              style={{
                padding: '0.85rem 1.35rem',
                borderRadius: 99,
                border: 'none',
                background: ACCENT,
                color: '#fff',
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'not-allowed',
                opacity: 0.85,
                boxShadow: SHADOW,
              }}
            >
              🍎 App Store — Coming Soon
            </button>
            <button
              type="button"
              disabled
              style={{
                padding: '0.85rem 1.35rem',
                borderRadius: 99,
                border: `2px solid ${ACCENT}`,
                background: 'transparent',
                color: ACCENT,
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'not-allowed',
                opacity: 0.85,
              }}
            >
              🤖 Google Play — Coming Soon
            </button>
          </div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: DARK }}>
            <span style={{ color: GREEN }}>●</span> In Development · iOS & Android
          </p>
        </section>

        <section className="rl-hero-mockup-wrap" aria-label="Product screenshots">
          <span
            className="rl-hero-deco"
            style={{
              top: '4%',
              left: '2%',
              fontSize: '2.5rem',
              opacity: 0.35,
              transform: 'rotate(-15deg)',
            }}
          >
            🍎
          </span>
          <span
            className="rl-hero-deco"
            style={{
              top: '6%',
              right: '4%',
              fontSize: '2rem',
              opacity: 0.3,
              transform: 'rotate(10deg)',
            }}
          >
            🥦
          </span>
          <span
            className="rl-hero-deco"
            style={{
              bottom: '8%',
              left: '3%',
              fontSize: '2rem',
              opacity: 0.3,
              transform: 'rotate(-20deg)',
            }}
          >
            🥕
          </span>
          <span
            className="rl-hero-deco"
            style={{
              bottom: '6%',
              right: '3%',
              fontSize: '2.5rem',
              opacity: 0.35,
              transform: 'rotate(15deg)',
            }}
          >
            🍓
          </span>
          <span
            className="rl-hero-deco"
            style={{
              left: '0%',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.75rem',
              opacity: 0.25,
            }}
          >
            🧅
          </span>
          <span
            className="rl-hero-deco"
            style={{
              right: '0%',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.75rem',
              opacity: 0.25,
            }}
          >
            🛒
          </span>

          <div className="rl-hero-phones">
            <IPhoneFrame
              src={photo('Screen6.jpeg')}
              alt="My Lists view"
              tilt="left"
              width={200}
            />
            <IPhoneFrame src={photo('Screen5.jpeg')} alt="Shop view" tilt="center" width={220} />
            <IPhoneFrame
              src={photo('Screen7.jpeg')}
              alt="Price Compare view"
              tilt="right"
              width={200}
            />
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <div className="rl-stats">
            {[
              ['PLATFORM', 'iOS · Android'],
              ['STACK', 'React Native · Expo · Supabase'],
              ['STATUS', 'In Development'],
              ['PRICING', 'Free · Premium CAD $14.99/yr'],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  background: CARD,
                  border: BORDER,
                  borderRadius: 16,
                  padding: '1.15rem 1.25rem',
                  boxShadow: SHADOW,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: MUTED_GREEN,
                    marginBottom: 6,
                  }}
                >
                  {k}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: DARK }}>{v}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {techPills.map((t) => (
              <span
                key={t}
                style={{
                  display: 'inline-block',
                  padding: '0.45rem 0.95rem',
                  borderRadius: 99,
                  background: GREEN,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <div className="rl-problem-grid">
            <div
              style={{
                background: CARD,
                border: BORDER,
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: SHADOW,
              }}
            >
              <h2 style={{ margin: '0 0 1rem', fontSize: 18, fontWeight: 800, color: DARK }}>
                The Problem
              </h2>
              <p style={{ margin: 0, color: MUTED_GREEN, fontSize: 15 }}>
                Canadians rewrite the same grocery list every week. They forget items, overpay at
                the wrong store, and leave credit card rewards on the table. No app was built
                specifically for the Canadian grocery market.
              </p>
            </div>
            <div
              style={{
                background: CARD,
                border: BORDER,
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: SHADOW,
              }}
            >
              <h2 style={{ margin: '0 0 1rem', fontSize: 18, fontWeight: 800, color: GREEN }}>
                The Solution
              </h2>
              <p style={{ margin: 0, color: MUTED_GREEN, fontSize: 15 }}>
                RecurList auto-resets your lists weekly, bi-weekly or monthly. It compares prices
                across 9 Canadian stores in real time and tells you exactly which store maximizes
                your credit card points on every trip.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2
            style={{
              margin: '0 0 1.25rem',
              fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
              fontWeight: 800,
              color: DARK,
            }}
          >
            Core Features
          </h2>
          <div className="rl-features">
            {features.map((f) => (
              <article key={f.title} className="rl-feature-card">
                <div style={{ padding: '1rem 1rem 0' }}>
                  <div className="phone-frame">
                    <img src={photo(f.img)} alt="" />
                  </div>
                </div>
                <div className="rl-feature-card-body">
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: 17, fontWeight: 800, color: DARK }}>
                    {f.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: MUTED_GREEN, lineHeight: 1.5 }}>
                    {f.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '3.5rem' }}>
          <p
            style={{
              margin: '0 0 1rem',
              fontFamily: sans,
              fontSize: 13,
              color: MUTED_GREEN,
              fontWeight: 600,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
            }}
          >
            // Built With
          </p>
          <div className="rl-built-grid">
            {builtWithItems.map((item) => (
              <div key={item.name} className="rl-built-card">
                <div style={{ fontSize: '1.35rem', marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 800, color: DARK, fontSize: 15, marginBottom: 6 }}>
                  {item.name}
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.45 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rl-why-green-section">
          {floatVegEmojis.map((emoji, i) => (
            <span
              key={`${emoji}-${i}`}
              className="rl-float-veg"
              style={{
                left: `${8 + (i % 4) * 22}%`,
                top: `${12 + (i % 3) * 28}%`,
                fontSize: `${2 + (i % 3) * 0.35}rem`,
                animation: `floatVeg ${6 + (i % 5)}s ease-in-out infinite`,
                animationDelay: `${(i % 5) * 0.85}s`,
              }}
            >
              {emoji}
            </span>
          ))}
          <p
            style={{
              margin: '0 0 1rem',
              position: 'relative',
              zIndex: 1,
              fontFamily: sans,
              fontSize: 13,
              color: MUTED_GREEN,
              fontWeight: 600,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
            }}
          >
            // Why Green
          </p>
          <div className="rl-why-grid">
            {whyGreenCards.map((c) => (
              <div
                key={c.title}
                style={{
                  background: CARD,
                  border: BORDER,
                  borderRadius: 16,
                  padding: '1.5rem',
                  boxShadow: SHADOW,
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{c.icon}</div>
                <h3 style={{ margin: '0 0 0.65rem', fontSize: 17, fontWeight: 800, color: DARK }}>
                  {c.title}
                </h3>
                <p style={{ margin: 0, fontSize: 14, color: MUTED_GREEN, lineHeight: 1.5 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <p
            style={{
              margin: '0 0 1rem',
              fontFamily: sans,
              fontSize: 13,
              color: MUTED_GREEN,
              fontWeight: 600,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
            }}
          >
            // System Architecture
          </p>
          <div
            style={{
              border: BORDER,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: SHADOW,
              background: BG,
            }}
          >
            <RecurListArchitectureDiagram />
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <p
            style={{
              margin: '0 0 1.25rem',
              fontFamily: sans,
              fontSize: 13,
              color: MUTED_GREEN,
              fontWeight: 600,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
            }}
          >
            // What&apos;s Next
          </p>
          <div className="rl-whats-next-grid">
            {whatsNextCards.map((c) => (
              <article
                key={c.title}
                style={{
                  background: CARD,
                  border: `2px dashed ${ACCENT}`,
                  borderRadius: 16,
                  padding: '1.5rem',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{c.icon}</div>
                <h3 style={{ margin: '0 0 0.75rem', fontSize: 17, fontWeight: 800, color: DARK }}>
                  {c.title}
                </h3>
                <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.55 }}>
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <p
            style={{
              margin: '0 0 1rem',
              fontFamily: sans,
              fontSize: 13,
              color: MUTED_GREEN,
              fontWeight: 600,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
            }}
          >
            // App Previews
          </p>
          <div className="rl-previews-scroll">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <div key={n} className="rl-preview-item">
                <div
                  style={{
                    border: `8px solid ${FRAME}`,
                    borderRadius: 44,
                    overflow: 'hidden',
                    background: FRAME,
                    boxShadow: SHADOW,
                  }}
                >
                  <img
                    src={photo(`Screen${n}.jpeg`)}
                    alt={`App preview ${n}`}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ margin: 0, width: '100%' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 260,
            overflow: 'hidden',
            borderTop: '1px solid #16A34A',
          }}
        >
          <img
            src="/recurlist-footer.png"
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
              left: '40%',
              width: '50%',
              transform: 'translateY(-50%)',
              boxSizing: 'border-box',
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'block',
                fontFamily: sans,
                fontSize: 36,
                fontWeight: 800,
                color: '#16A34A',
                lineHeight: 1,
                marginBottom: '0.12em',
              }}
            >
              &quot;
            </span>
            <div
              style={{
                fontFamily: sans,
                fontWeight: 700,
                fontSize: 'clamp(13px, 1.5vw, 19px)',
                lineHeight: 1.4,
              }}
            >
              <span style={{ display: 'block', color: '#0D3321' }}>Small habits.</span>
              <span style={{ display: 'block', color: '#16A34A' }}>Big outcomes.&quot;</span>
            </div>
            <p
              style={{
                margin: '8px 0 0',
                fontFamily: sans,
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                opacity: 0.35,
                color: '#0D3321',
              }}
            >
              — RecurList, 2026
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <a
                href="/"
                style={{
                  border: '1.5px solid #16A34A',
                  color: '#16A34A',
                  background: 'transparent',
                  padding: '8px 16px',
                  fontSize: '11px',
                  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                ← Back to Portfolio
              </a>
              <a
                href="/projects/taskmanager"
                style={{
                  background: '#16A34A',
                  color: '#F0FBF4',
                  border: 'none',
                  padding: '8px 16px',
                  fontSize: '11px',
                  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
            background: '#0D3321',
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
              fontFamily: sans,
              fontSize: 11,
              fontWeight: 700,
              color: '#F0FBF4',
              letterSpacing: '0.12em',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#16A34A',
                marginRight: 8,
                flexShrink: 0,
              }}
            />
            RECURLIST
          </span>
          <span
            style={{
              fontFamily: sans,
              fontSize: 11,
              fontWeight: 400,
              color: '#16A34A',
            }}
          >
            🍁 Smart grocery lists for Canadians
          </span>
        </div>
      </footer>
    </div>
  );
}
