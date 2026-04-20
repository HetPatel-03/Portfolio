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
];

const TRACK_HEIGHT = 280;

const SECTION_PAD_X = 'clamp(40px, 8vw, 120px)';

/** Two copies for seamless ticker (translate -50%) */
const TICKER_SEQUENCE = [...STACK_ITEMS, ...STACK_ITEMS];

export function TechStack() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current != null) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current != null) return;
    autoScrollIntervalRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 0.5) {
        el.scrollLeft = 0;
      }
    }, 20);
  }, []);

  const pauseAutoScrollAndScheduleResume = useCallback(() => {
    stopAutoScroll();
    if (inactivityTimeoutRef.current != null) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
      inactivityTimeoutRef.current = null;
    }, 10000);
  }, [startAutoScroll, stopAutoScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      pauseAutoScrollAndScheduleResume();
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    const onPause = () => pauseAutoScrollAndScheduleResume();

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('mouseenter', onPause);
    el.addEventListener('touchstart', onPause, { passive: true });

    startAutoScroll();

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mouseenter', onPause);
      el.removeEventListener('touchstart', onPause);
      stopAutoScroll();
      if (inactivityTimeoutRef.current != null) {
        clearTimeout(inactivityTimeoutRef.current);
        inactivityTimeoutRef.current = null;
      }
    };
  }, [pauseAutoScrollAndScheduleResume, startAutoScroll, stopAutoScroll]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const track = scrollRef.current;
      if (!track || !dragRef.current.active) return;
      track.scrollLeft = dragRef.current.startScroll - (e.pageX - dragRef.current.startX);
    };

    const onUp = () => {
      const track = scrollRef.current;
      dragRef.current.active = false;
      if (track) track.style.removeProperty('cursor');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  const onTrackMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    pauseAutoScrollAndScheduleResume();
    const track = scrollRef.current;
    if (!track) return;
    dragRef.current = {
      active: true,
      startX: e.pageX,
      startScroll: track.scrollLeft,
    };
    track.style.cursor = 'grabbing';
  };

  const scrollByNav = (delta: number) => {
    pauseAutoScrollAndScheduleResume();
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const trackPadStyle = {
    paddingLeft: SECTION_PAD_X,
    paddingRight: 0,
  };

  const spacerStyle = {
    flexShrink: 0 as const,
    width: SECTION_PAD_X,
    minWidth: SECTION_PAD_X,
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
            onMouseDown={() => pauseAutoScrollAndScheduleResume()}
            onClick={() => scrollByNav(-320)}
          >
            ‹
          </button>

          <div className="stack-track-wrap min-w-0 flex-1">
            <div
              ref={scrollRef}
              role="list"
              className="stack-scroll-row flex gap-5 overflow-x-auto overflow-y-hidden select-none"
              style={{
                ...trackPadStyle,
                height: TRACK_HEIGHT,
                alignItems: 'center',
                scrollbarWidth: 'thin',
              }}
              onMouseDown={onTrackMouseDown}
            >
              {STACK_ITEMS.map((tech) => {
                const { Logo } = tech;
                return (
                  <article
                    key={tech.id}
                    role="listitem"
                    className="stack-tech-card flex w-[280px] shrink-0 flex-col transition-[border-color,box-shadow] duration-300 ease-out"
                    style={{
                      width: 280,
                      flexShrink: 0,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      padding: 24,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = rgbaHex(tech.color, 0.35);
                      e.currentTarget.style.boxShadow = `0 0 24px ${rgbaHex(tech.color, 0.08)}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: rgbaHex(tech.color, 0.12),
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
                      className="mt-3 text-[13px] leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: '#A8A8B8',
                      }}
                    >
                      {tech.proof}
                    </p>
                  </article>
                );
              })}
              <div aria-hidden className="shrink-0" style={spacerStyle} />
            </div>

            <div className="stack-fade stack-fade--left" aria-hidden />
            <div className="stack-fade stack-fade--right" aria-hidden />
          </div>

          <button
            type="button"
            className="stack-nav-btn"
            aria-label="Scroll stack right"
            onMouseDown={() => pauseAutoScrollAndScheduleResume()}
            onClick={() => scrollByNav(320)}
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
          // drag or scroll →
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
