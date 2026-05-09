import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { getTechTagPillStyle } from '../lib/techTagPill';

type ProjectsProps = {
  onOpenProjectDetail?: (projectName: string) => void;
};

type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  gradient: string;
  status: string;
  views: string;
  statusTone: 'live' | 'in-progress';
  studenzBitDetail?: boolean;
  inspectHref?: string;
};

const GAP_PX = 24;

export function Projects({ onOpenProjectDetail }: ProjectsProps) {
  const projects: Project[] = [
    {
      id: 'PROJ / 01',
      name: 'StudenzBit',
      description:
        'A resource hub for international students moving to Canada. Built with React, D3.js interactive world map, affiliate monetization, and deployed on Vercel. Targeting Gen Z students with a pastel-first design system.',
      tags: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
      gradient: 'linear-gradient(135deg, #F2664A 0%, #F9A8D4 100%)',
      status: 'live',
      views: '214',
      statusTone: 'live',
      studenzBitDetail: true,
    },
    {
      id: 'PROJ / 02',
      name: 'RecurList',
      description:
        'A smart grocery and habits app with a recurring rules engine. Built with React frontend, Node.js backend, PostgreSQL database, and Supabase. Designed to make recurring tasks feel effortless.',
      tags: ['TypeScript', 'Express', 'Supabase'],
      gradient: 'linear-gradient(135deg, #6366F1 0%, #2DD4BF 100%)',
      status: 'live',
      views: '187',
      statusTone: 'live',
    },
    {
      id: 'PROJ / 03',
      name: 'Task Manager',
      description:
        'A Kanban-style task management app with drag-and-drop interface, real-time sync, and keyboard-first editing. Built with React, Tailwind CSS, and Firebase.',
      tags: ['React', 'Tailwind', 'Firebase'],
      gradient: 'linear-gradient(135deg, #C8F135 0%, #60A5FA 100%)',
      status: 'live',
      views: '156',
      statusTone: 'live',
    },
    {
      id: 'PROJ / 04',
      name: 'FIXXO',
      description:
        'A human-powered AI task concierge for the GTA. One text — we handle the rest. Built with WhatsApp Business API and real-time service orchestration.',
      tags: ['React', 'Node.js', 'WhatsApp API'],
      gradient: 'linear-gradient(135deg, #0D0F14 0%, #00D4D4 100%)',
      status: 'live',
      views: '—',
      statusTone: 'live',
      inspectHref: '/projects/fixxo',
    },
    {
      id: 'PROJ / 05',
      name: 'SentryMind',
      description:
        'An AI-powered SRE tool for modern dev stacks. Detects incidents, surfaces root causes, and suggests fixes using LLMs. Built for Vercel + Supabase + Next.js.',
      tags: ['Next.js', 'Claude API', 'Supabase'],
      gradient: 'linear-gradient(135deg, #0D0D14 0%, #A78BFA 100%)',
      status: 'in progress',
      views: '—',
      statusTone: 'in-progress',
      inspectHref: '/projects/sentrymind',
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const getScrollStep = useCallback(() => {
    const el = scrollRef.current;
    const first = el?.querySelector<HTMLElement>('[data-carousel-slide]');
    if (!first) return GAP_PX;
    return first.offsetWidth + GAP_PX;
  }, []);

  const updateFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getScrollStep();
    if (step <= GAP_PX) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const raw = el.scrollLeft / step;
    let idx = Math.floor(raw + 0.35) + 1;
    if (el.scrollLeft >= maxScroll - 2) idx = projects.length;
    idx = Math.min(projects.length, Math.max(1, idx));
    setCurrentIndex(idx);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }, [getScrollStep, projects.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateFromScroll();
    const onScroll = () => updateFromScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(() => updateFromScroll());
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [updateFromScroll]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getScrollStep();
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const arrowStyle = (disabled: boolean): CSSProperties => ({
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    flexShrink: 0,
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.35 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  });

  const statusColors = (tone: Project['statusTone']) =>
    tone === 'in-progress'
      ? { dot: '#F59E0B', text: '#F59E0B' }
      : { dot: 'var(--sage-green)', text: 'var(--sage-green)' };

  return (
    <section id="projects" className="section-bg-projects relative py-20 md:py-32 px-4 md:px-8">
      <style>{`
        .projects-carousel-track {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          width: 100%;
        }
        .projects-carousel-track::-webkit-scrollbar {
          display: none;
        }
        .projects-carousel-slide {
          scroll-snap-align: start;
          flex: 0 0 100%;
          min-width: 100%;
          max-width: 100%;
        }
        @media (min-width: 768px) {
          .projects-carousel-slide {
            flex: 0 0 calc((100% - 3rem) / 3);
            min-width: calc((100% - 3rem) / 3);
            max-width: calc((100% - 3rem) / 3);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-start mb-10 md:mb-12 gap-3">
          <div>
            <p
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
            >
              // 03 · projects
            </p>
            <h2
              className="text-[clamp(34px,8vw,52px)]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-1px',
              }}
            >
              Things I've shipped from scratch.
            </h2>
          </div>
          <p
            className="text-xs pt-0 md:pt-12"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            // {currentIndex} of {projects.length}
          </p>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            aria-label="Previous projects"
            style={arrowStyle(!canPrev)}
            onClick={() => scrollByDir(-1)}
            onMouseEnter={(e) => {
              if (!canPrev) return;
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            }}
          >
            <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>
              ←
            </span>
          </button>

          <div ref={scrollRef} className="projects-carousel-track flex-1 min-w-0">
            {projects.map((project) => {
              const { dot, text: statusTextColor } = statusColors(project.statusTone);
              return (
                <div key={project.id} className="projects-carousel-slide" data-carousel-slide>
                  <div className="project-card group h-full">
                    <div
                      className="project-card__media h-[180px] relative overflow-hidden"
                      style={{ background: project.gradient }}
                    >
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          project.name === 'FIXXO' || project.name === 'SentryMind'
                            ? 'opacity-30'
                            : 'opacity-20'
                        }`}
                      >
                        {project.name === 'StudenzBit' && (
                          <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="2" />
                            <path d="M 20 60 L 100 60 M 60 20 L 60 100" stroke="white" strokeWidth="1" />
                            <circle cx="60" cy="60" r="3" fill="white" />
                            <circle cx="80" cy="45" r="2" fill="white" />
                            <circle cx="40" cy="70" r="2" fill="white" />
                          </svg>
                        )}
                        {project.name === 'RecurList' && (
                          <svg width="100" height="100" viewBox="0 0 100 100">
                            <rect x="20" y="20" width="60" height="12" rx="2" fill="white" opacity="0.8" />
                            <rect x="20" y="40" width="60" height="12" rx="2" fill="white" opacity="0.6" />
                            <rect x="20" y="60" width="60" height="12" rx="2" fill="white" opacity="0.4" />
                            <circle cx="28" cy="26" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )}
                        {project.name === 'Task Manager' && (
                          <svg width="100" height="100" viewBox="0 0 100 100">
                            <rect x="10" y="20" width="25" height="60" rx="3" fill="white" opacity="0.4" />
                            <rect x="40" y="20" width="25" height="60" rx="3" fill="white" opacity="0.6" />
                            <rect x="70" y="20" width="25" height="60" rx="3" fill="white" opacity="0.8" />
                          </svg>
                        )}
                        {project.name === 'FIXXO' && (
                          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden>
                            <path
                              d="M28 22h44c5.5 0 10 4.5 10 10v24c0 5.5-4.5 10-10 10H46l-12 12V66H28c-5.5 0-10-4.5-10-10V32c0-5.5 4.5-10 10-10z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M38 48l7 7 16-16"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {project.name === 'SentryMind' && (
                          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden>
                            <path
                              d="M50 16 L74 28 V42 C74 58 62 72 50 80 C38 72 26 58 26 42 V28 L50 16 Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20 50h10l6-12 8 22 8-18 6 10h12"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="project-card__body p-5 md:p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className="text-[11px]"
                          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                        >
                          {project.id}
                        </span>
                        <span
                          className="text-[11px]"
                          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                        >
                          ● {project.views}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} style={getTechTagPillStyle(tag)}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3
                        className="text-[20px] md:text-[22px] mb-3"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {project.name}
                      </h3>

                      <p
                        className="mb-6 text-[13px] leading-relaxed"
                        style={{
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-body)',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {project.description}
                      </p>

                      <div className="flex justify-between items-center">
                        {project.studenzBitDetail ? (
                          <button
                            type="button"
                            className="text-sm group-hover:translate-x-1 transition-transform duration-200"
                            style={{
                              color: 'var(--coral)',
                              fontFamily: 'var(--font-body)',
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              onOpenProjectDetail?.(project.name);
                            }}
                          >
                            inspect →
                          </button>
                        ) : project.inspectHref ? (
                          <a
                            href={project.inspectHref}
                            className="text-sm group-hover:translate-x-1 transition-transform duration-200"
                            style={{
                              color: 'var(--coral)',
                              fontFamily: 'var(--font-body)',
                              textDecoration: 'none',
                            }}
                          >
                            inspect →
                          </a>
                        ) : (
                          <button
                            type="button"
                            className="text-sm group-hover:translate-x-1 transition-transform duration-200"
                            style={{
                              color: 'var(--coral)',
                              fontFamily: 'var(--font-body)',
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'default',
                            }}
                          >
                            inspect →
                          </button>
                        )}
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
                          <span
                            className="text-xs"
                            style={{ color: statusTextColor, fontFamily: 'var(--font-body)' }}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next projects"
            style={arrowStyle(!canNext)}
            onClick={() => scrollByDir(1)}
            onMouseEnter={(e) => {
              if (!canNext) return;
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            }}
          >
            <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
