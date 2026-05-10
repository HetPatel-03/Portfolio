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

const photo = (name: string) => `/RecurList - Photos/${name}`;

const tierRows: { label: string; free: string; premium: string }[] = [
  { label: 'Grocery lists', free: '3', premium: 'Unlimited' },
  { label: 'Items per list', free: '50', premium: 'Unlimited' },
  { label: 'Shared members', free: '2', premium: 'Unlimited' },
  { label: 'Reset schedules', free: 'Weekly only', premium: 'Weekly · bi-weekly · monthly' },
  { label: 'Stores compared', free: '3 stores', premium: 'All 9 stores' },
  { label: 'Reward cards', free: '2 cards', premium: 'Unlimited' },
  { label: 'Purchase history', free: 'Last 30 days', premium: 'Full history' },
];

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
        .rl-hero-phones {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin-top: 2.5rem;
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
        .rl-tier-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .rl-tier-grid { grid-template-columns: repeat(2, 1fr); align-items: stretch; }
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
            src={photo('Screen1.jpeg')}
            alt=""
            width={32}
            height={32}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
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
            Smart grocery lists that reset themselves.
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
            <span style={{ color: GREEN }}>●</span> In Development · iOS & Android · CAD $14.99/yr
          </p>
        </section>

        <section className="rl-hero-phones" aria-label="Product screenshots">
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
              <article
                key={f.title}
                style={{
                  background: CARD,
                  border: BORDER,
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: SHADOW,
                }}
              >
                <div style={{ padding: '1rem 1rem 0' }}>
                  <img
                    src={photo(f.img)}
                    alt=""
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: 12,
                    }}
                  />
                </div>
                <div style={{ padding: '1rem 1.25rem 1.35rem' }}>
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

        <section style={{ marginTop: '3rem' }}>
          <h2
            style={{
              margin: '0 0 1.25rem',
              fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
              fontWeight: 800,
              color: DARK,
            }}
          >
            Subscription tiers
          </h2>
          <div className="rl-tier-grid">
            <div
              style={{
                background: CARD,
                border: BORDER,
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: SHADOW,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3 style={{ margin: '0 0 1rem', fontSize: 20, fontWeight: 800, color: DARK }}>
                Free
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {tierRows.map((row, idx) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 12,
                      paddingBottom: 10,
                      borderBottom:
                        idx < tierRows.length - 1 ? `1px solid ${BORDER_GREEN}` : 'none',
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: MUTED_GREEN }}>{row.label}</span>
                    <strong style={{ color: ACCENT, textAlign: 'right' }}>{row.free}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: CARD,
                border: `2px solid ${GREEN}`,
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: SHADOW,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3 style={{ margin: '0 0 1rem', fontSize: 20, fontWeight: 800, color: DARK }}>
                ⭐ Premium
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                {tierRows.map((row, idx) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 12,
                      paddingBottom: 10,
                      borderBottom:
                        idx < tierRows.length - 1 ? `1px solid ${BORDER_GREEN}` : 'none',
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: MUTED_GREEN }}>{row.label}</span>
                    <strong style={{ color: ACCENT, textAlign: 'right' }}>{row.premium}</strong>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 99,
                    background: DARK,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 8,
                  }}
                >
                  Upgrade — CAD $14.99/year
                </div>
                <p style={{ margin: 0, fontSize: 13, color: MUTED_GREEN }}>
                  or $2.49/month · Cancel anytime
                </p>
              </div>
            </div>
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

      <footer className="rl-footer-strip">
        <span>
          PROJ / 02 · RECURLIST · 2026
        </span>
        <span className="rl-footer-center">🍁 Smart grocery lists built for Canadians</span>
        <span className="rl-footer-right">
          <button
            type="button"
            onClick={backToProjects}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: sans,
              fontSize: 13,
              fontWeight: 600,
              color: DARK,
              cursor: 'pointer',
            }}
          >
            ← back to projects
          </button>
        </span>
      </footer>
    </div>
  );
}
