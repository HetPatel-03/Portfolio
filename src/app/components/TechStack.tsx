import { useCallback, useEffect, useRef, type ComponentType } from 'react';
import {
  LogoReact,
  LogoTypeScript,
  LogoNextJs,
  LogoNodeJs,
  LogoPython,
  LogoTailwind,
  LogoPostgreSQL,
  LogoVercel,
  LogoGit,
  LogoVite,
  LogoFigma,
  LogoJava,
  LogoAws,
  LogoSupabase,
  LogoSql,
  LogoOpenAI,
  LogoMachineLearning,
} from './stack/StackLogos';

function rgbFromHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbaHex(hex: string, a: number): string {
  const [r, g, b] = rgbFromHex(hex);
  return `rgba(${r},${g},${b},${a})`;
}

type StackItem = {
  id: string;
  name: string;
  color: string;
  proof: string;
  Logo: ComponentType<Record<string, never>>;
};

const STACK_ITEMS: StackItem[] = [
  {
    id: 'react',
    name: 'React',
    color: '#61DAFB',
    proof:
      "Built StudenzBit's interactive D3 world map and multi-page SPA with hooks and context",
    Logo: LogoReact,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    color: '#3178C6',
    proof:
      'Primary language across all recent projects — strict typing, generics, utility types in production',
    Logo: LogoTypeScript,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    color: '#E0E0E0',
    proof: 'SSR + static generation for Digifixr agency site, API routes replacing Express layer',
    Logo: LogoNextJs,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    color: '#8CC84B',
    proof:
      'REST APIs at FIXXO — WhatsApp webhook integrations, async queue processing, Swagger docs',
    Logo: LogoNodeJs,
  },
  {
    id: 'python',
    name: 'Python',
    color: '#FFD43B',
    proof:
      'Automation scripts, n8n workflow helpers, data processing for Digifixr lead-gen pipeline',
    Logo: LogoPython,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    color: '#38BDF8',
    proof:
      'Design system of choice — utility-first, dark-mode-first, responsive in under 60 min on new projects',
    Logo: LogoTailwind,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    color: '#336791',
    proof:
      'Schema design, joins, window functions, indexing strategies across coursework and side projects',
    Logo: LogoPostgreSQL,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    color: '#E0E0E0',
    proof: 'CI/CD and edge deployments for StudenzBit and this portfolio — zero-config, instant previews',
    Logo: LogoVercel,
  },
  {
    id: 'git',
    name: 'Git',
    color: '#F05133',
    proof:
      'Feature branching, PR workflows, conventional commits — daily driver across all collaborative work',
    Logo: LogoGit,
  },
  {
    id: 'vite',
    name: 'Vite',
    color: '#BD34FE',
    proof: 'Build tool for this portfolio — sub-second HMR, plugin ecosystem, ES module native bundling',
    Logo: LogoVite,
  },
  {
    id: 'figma',
    name: 'Figma',
    color: '#A259FF',
    proof:
      'Wireframing to high-fidelity mockups before any code — component libraries, auto-layout, dev mode handoff',
    Logo: LogoFigma,
  },
  {
    id: 'java',
    name: 'Java',
    color: '#F89820',
    proof:
      'OOP fundamentals, data structures and algorithms practised through Algoma CS coursework and Codility assessments',
    Logo: LogoJava,
  },
  {
    id: 'aws',
    name: 'AWS',
    color: '#FF9900',
    proof:
      'S3, EC2, Lambda basics explored for cloud deployment architecture on side projects',
    Logo: LogoAws,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    color: '#3ECF8E',
    proof:
      'Postgres-backed auth and realtime DB used as backend layer on rapid-prototype projects',
    Logo: LogoSupabase,
  },
  {
    id: 'sql',
    name: 'SQL',
    color: '#4479A1',
    proof:
      'Complex queries, joins, subqueries, window functions — used across coursework and production database work',
    Logo: LogoSql,
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    color: '#74AA9C',
    proof:
      'Integrated LLM endpoints into Digifixr lead-gen pipeline for automated copy generation and classification',
    Logo: LogoOpenAI,
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    color: '#FF6B6B',
    proof:
      'Supervised learning concepts, scikit-learn, model evaluation — studied through Algoma AI coursework',
    Logo: LogoMachineLearning,
  },
];

/** Uniform card + viewport height (px) */
const STACK_CARD_HEIGHT = 360;

/** Auto-scroll speed (pixels per second) — lower = slower drift */
const STACK_AUTO_SCROLL_PX_PER_SEC = 14;

const SECTION_PAD_X = 'clamp(40px, 8vw, 120px)';

const CARD_LOOP = [...STACK_ITEMS, ...STACK_ITEMS];
const TICKER_SEQUENCE = [...STACK_ITEMS, ...STACK_ITEMS];

function StackCard({ tech }: { tech: StackItem }) {
  const { Logo } = tech;
  return (
    <article
      role="listitem"
      className="stack-tech-card flex w-[280px] shrink-0 flex-col transition-[border-color,box-shadow] duration-300 ease-out"
      style={{
        width: 280,
        height: STACK_CARD_HEIGHT,
        flexShrink: 0,
        boxSizing: 'border-box',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        backdropFilter: 'blur(8px) saturate(120%)',
        WebkitBackdropFilter: 'blur(8px) saturate(120%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        padding: 24,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = rgbaHex(tech.color, 0.35);
        e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 24px ${rgbaHex(tech.color, 0.08)}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06)';
      }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{
          background: rgbaHex(tech.color, 0.18),
          border: `1px solid ${rgbaHex(tech.color, 0.2)}`,
          borderRadius: 12,
        }}
      >
        <div className="h-8 w-8 [&_svg]:h-full [&_svg]:w-full">
          <Logo />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          style={{
            background: rgbaHex(tech.color, 0.15),
            border: `1px solid ${rgbaHex(tech.color, 0.3)}`,
            borderRadius: 999,
            padding: '3px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: tech.color,
          }}
        >
          {tech.name}
        </span>
      </div>

      <p
        className="mt-3 min-h-0 flex-1 overflow-y-auto text-[13px] leading-relaxed"
        style={{
          fontFamily: 'var(--font-body)',
          color: '#A8A8B8',
        }}
      >
        {tech.proof}
      </p>
    </article>
  );
}

export function TechStack() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const autoPausedRef = useRef(false);
  const cardResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);

  const pauseCardsAndScheduleResume = useCallback(() => {
    autoPausedRef.current = true;
    if (cardResumeTimeoutRef.current != null) {
      clearTimeout(cardResumeTimeoutRef.current);
    }
    cardResumeTimeoutRef.current = setTimeout(() => {
      autoPausedRef.current = false;
      cardResumeTimeoutRef.current = null;
    }, 10000);
  }, []);

  useEffect(() => {
    const view = viewportRef.current;
    const inner = innerRef.current;
    if (!view || !inner) return;

    let last = performance.now();
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      if (!autoPausedRef.current) {
        const half = inner.scrollWidth / 2;
        if (half > 0) {
          view.scrollLeft += STACK_AUTO_SCROLL_PX_PER_SEC * dt;
          if (view.scrollLeft >= half - 0.5) {
            view.scrollLeft -= half;
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (cardResumeTimeoutRef.current != null) {
        clearTimeout(cardResumeTimeoutRef.current);
        cardResumeTimeoutRef.current = null;
      }
    };
  }, []);

  const nudgeTrack = (direction: -1 | 1) => {
    pauseCardsAndScheduleResume();
    viewportRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  return (
    <section
      id="stack"
      className="stack-section relative overflow-hidden py-32"
      style={{
        paddingLeft: SECTION_PAD_X,
        paddingRight: SECTION_PAD_X,
      }}
    >
      <div className="stack-skills-watermark" aria-hidden>
        SKILLS
      </div>

      <div className="relative z-[1] max-w-7xl mx-auto">
        <header className="relative z-[1] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
            >
              // 06 · stack
            </p>
            <h2
              className="text-[52px] leading-none"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-1px',
              }}
            >
              Tools I reach for.
            </h2>
          </div>
          <p
            className="text-xs sm:text-right sm:pb-1"
            style={{ fontFamily: 'var(--font-mono)', color: '#A8A8B8' }}
          >
            // proof over self-rating
          </p>
        </header>

        <div className="relative z-[1] flex items-center gap-3">
          <button
            type="button"
            className="stack-nav-btn"
            aria-label="Scroll stack left"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => nudgeTrack(-1)}
          >
            ‹
          </button>

          <div className="stack-track-wrap min-w-0 flex-1 relative">
            <div
              ref={viewportRef}
              className="stack-cards-viewport overflow-x-auto overflow-y-hidden"
              style={{ height: STACK_CARD_HEIGHT }}
              onMouseEnter={pauseCardsAndScheduleResume}
              onMouseDown={pauseCardsAndScheduleResume}
              onTouchStart={pauseCardsAndScheduleResume}
            >
              <div ref={innerRef} className="stack-cards-row flex h-full items-stretch gap-5" role="list">
                {CARD_LOOP.map((tech, index) => (
                  <StackCard key={`${tech.id}-${index}`} tech={tech} />
                ))}
              </div>
            </div>

            <div className="stack-fade stack-fade--left" aria-hidden />
            <div className="stack-fade stack-fade--right" aria-hidden />
          </div>

          <button
            type="button"
            className="stack-nav-btn"
            aria-label="Scroll stack right"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => nudgeTrack(1)}
          >
            ›
          </button>
        </div>

        <p
          className="mt-4 text-center"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: '#A8A8B8',
            opacity: 0.5,
          }}
        >
          // slow auto-scroll · ‹ › or hover to pause
        </p>

        <div className="stack-logo-ticker mt-8 overflow-hidden" aria-hidden>
          <div className="stack-logo-ticker-inner">
            {TICKER_SEQUENCE.map((tech, index) => {
              const { Logo } = tech;
              return (
                <div
                  key={`${tech.id}-${index}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full"
                >
                  <Logo />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
