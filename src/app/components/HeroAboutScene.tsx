import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '3+ Years', label: 'BUILDING & SHIPPING REAL PRODUCTS', variant: 'coral' as const },
  { number: 'Top 150', label: 'WIRELESS SALES · STAPLES CANADA', variant: 'blue' as const },
  { number: 'Full Stack', label: 'FRONTEND · BACKEND · DATABASE · DEVOPS', variant: 'lime' as const },
  { number: 'Harvard', label: 'CERTIFIED · CS50X & CS50W', variant: 'violet' as const },
];

export function HeroAboutScene() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const cycleWords = ['Software Engineer.', 'Problem Solver.', 'Product Minded.', 'Full Stack Dev.'];

  const sceneRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const aboutLeftRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scene = sceneRef.current;
      const heroLeft = heroLeftRef.current;
      const aboutLeft = aboutLeftRef.current;
      const imgWrapper = imgWrapperRef.current;
      const img = imgRef.current;
      const terminal = terminalRef.current;
      const statsEl = statsRef.current;

      if (!scene || !heroLeft || !aboutLeft || !imgWrapper || !img || !terminal || !statsEl) return;

      // Initial hidden states
      gsap.set(aboutLeft, { opacity: 0, y: 40 });
      gsap.set(terminal, { opacity: 0, y: 60 });
      gsap.set(statsEl.children, { opacity: 0, y: 60 });

      let swapped = false;

      // Offset helpers
      const getCenterOffset = () => {
        const rect = imgWrapper.getBoundingClientRect();
        const wrapperCenterX = rect.left + rect.width / 2;
        const screenCenterX = window.innerWidth / 2;
        return screenCenterX - wrapperCenterX;
      };

      const getLeftOffset = () => {
        const rect = imgWrapper.getBoundingClientRect();
        const rightGap = window.innerWidth - rect.right;
        return -(window.innerWidth - rect.width - rightGap * 2);
      };

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // PHASE 1: Hero text out, About text in. Image stays still.
      tl.to(heroLeft, { opacity: 0, y: -40, duration: 2, ease: 'power2.inOut' }, 0);
      tl.to(aboutLeft, { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, 1);

      // PHASE 2: Image slides to center
      tl.to(
        imgWrapper,
        {
          x: () => getCenterOffset(),
          scale: 1.05,
          duration: 3,
          ease: 'power2.inOut',
        },
        4
      );

      // PHASE 2B: 3D flip at center
      tl.to(
        img,
        {
          rotateY: 180,
          duration: 3,
          ease: 'power1.inOut',
          onUpdate: function () {
            if (!swapped) {
              const angle = Math.abs(gsap.getProperty(img, 'rotateY') as number);
              if (angle >= 88) {
                img.src = '/Image2.png';
                gsap.set(img, { scaleX: -1 });
                swapped = true;
              }
            }
          },
        },
        7
      );

      // PHASE 3: Photo moves left, right content reveals
      tl.to(
        imgWrapper,
        {
          x: () => getLeftOffset(),
          scale: 1,
          duration: 3,
          ease: 'power2.inOut',
        },
        10
      );

      tl.to(terminal, { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, 10.5);

      tl.to(
        statsEl.children,
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: 'back.out(1.2)',
        },
        11
      );

      // PHASE 4: Hold — timeline ends, pin releases naturally

      setTimeout(() => ScrollTrigger.refresh(), 200);
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sceneRef}
      id="hero-about-scene"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'visible',
        background: 'var(--bg-primary)',
      }}
    >
      <section
        id="hero"
        className="section-bg-hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingTop: '80px',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: '0',
          overflow: 'visible',
        }}
      >
        {/* Noise texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        <div className="w-full" style={{ position: 'relative' }}>
          <div
            className="flex flex-col md:flex-row gap-12 md:gap-16"
            style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
          >
            {/* LEFT: Hero + About stacked */}
            <div
              style={{
                flex: '1',
                position: 'relative',
                minHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Hero content — fades OUT in phase 1 */}
              <div
                ref={heroLeftRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                  style={{
                    background: 'rgba(44, 43, 48, 0.7)',
                    border: '1px solid rgba(240, 237, 232, 0.08)',
                    backdropFilter: 'blur(20px)',
                    width: 'fit-content',
                  }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--sage-green)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                    Available for opportunities · Summer 2026
                  </span>
                </div>

                <div
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: '-32px',
                    top: '128px',
                    fontSize: '280px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    color: 'rgba(240, 237, 232, 0.02)',
                    lineHeight: 1,
                    zIndex: -1,
                    filter: 'blur(2px)',
                  }}
                >
                  {'</>'}
                </div>

                <p className="text-[22px] mb-2" style={{ color: 'rgba(240, 237, 232, 0.4)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                  Hi, I&apos;m
                </p>

                <h1
                  className="mb-4"
                  style={{
                    fontSize: '96px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-3px',
                    lineHeight: 0.95,
                  }}
                >
                  Het Patel.
                </h1>

                <div className="relative mb-6 h-[52px] w-full overflow-hidden sm:h-[56px] md:h-[60px]">
                  {cycleWords.map((word, index) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: index === cycleIndex ? 1 : 0, y: index === cycleIndex ? 0 : 10 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex w-full items-center overflow-hidden"
                      style={{
                        fontSize: 'clamp(18px, 2.65vw + 0.4rem, 40px)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        color: 'var(--coral)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>

                <p className="text-base mb-8 max-w-xl" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  I build end-to-end products. Engineer. Product thinker. Top performer.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <button
                    onClick={() => scrollToSection('connect')}
                    className="px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
                    style={{ background: 'var(--coral)', color: 'var(--bg-primary)', fontFamily: 'var(--font-body)', fontWeight: 500, height: '48px' }}
                  >
                    Contact Me →
                  </button>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-6 py-3 rounded-full transition-all duration-200"
                    style={{ background: 'transparent', border: '1px solid rgba(240, 237, 232, 0.15)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', height: '48px' }}
                  >
                    Explore My Work
                  </button>
                </div>

                <div className="flex flex-wrap gap-[10px]">
                  {[
                    {
                      label: 'GitHub',
                      href: 'https://github.com/hetpatel',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'LinkedIn',
                      href: 'https://linkedin.com/in/hetpatel',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'X',
                      href: 'https://x.com/hetpatel',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                    },
                  ].map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50px',
                        color: '#F0EDE8',
                        fontSize: '13px',
                        fontFamily: 'DM Sans',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(242,102,74,0.4)';
                        e.currentTarget.style.background = 'rgba(242,102,74,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }}
                    >
                      {icon}
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* About content — fades IN in phase 1 */}
              <div
                ref={aboutLeftRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  opacity: 0,
                  paddingTop: '60px',
                }}
              >
                <p className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}>
                  // 01 · about
                </p>
                <h2
                  className="mb-8"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-1px',
                    fontSize: 'clamp(20px, 2.5vw, 32px)',
                  }}
                >
                  Software Engineer. Problem Solver. Product Minded.
                </h2>
                <p className="text-xl mb-8" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#D0D0E0' }}>
                  Full Stack Engineer who builds products people actually use.
                </p>
                <div className="mb-10 space-y-6">
                  {[
                    "Throughout my software development journey, I've shown a strong commitment to innovation and creative problem-solving — from building live platforms to integrating real APIs used by real users.",
                    'My analytical approach helps me break down complex challenges quickly. I thrive in fast-moving environments where shipping matters and business impact is the goal.',
                    'I build full-stack applications end-to-end — designing REST APIs, structuring database schemas, and deploying to cloud infrastructure. Every project I ship is live, documented, and built with real users in mind.',
                  ].map((text, i) => (
                    <p key={i} className="flex gap-3 text-[15px]" style={{ color: '#A8A8B8', fontFamily: 'var(--font-body)', lineHeight: 1.8 }}>
                      <span style={{ color: '#F2664A' }}>→</span>
                      <span>{text}</span>
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('connect')}
                    className="px-6 py-3 transition-all duration-200 hover:scale-105"
                    style={{ background: '#F2664A', color: 'var(--bg-primary)', fontFamily: 'var(--font-body)', fontWeight: 500, borderRadius: '50px', border: 'none' }}
                  >
                    Contact Me
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F0EDE8', fontFamily: 'var(--font-body)', borderRadius: '50px' }}
                  >
                    View Resume
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Image + About right content */}
            <div
              style={{
                flex: '0 0 42%',
                position: 'relative',
                height: '100vh',
                overflow: 'visible',
              }}
            >
              {/* Travelling image — moves freely via GSAP */}
              <div
                ref={imgWrapperRef}
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '90%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  perspective: '1000px',
                  overflow: 'visible',
                  zIndex: 10,
                }}
              >
                <img
                  ref={imgRef}
                  src="/Me_Hero.png"
                  alt="Het Patel"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'bottom',
                    maxHeight: '700px',
                    filter: 'drop-shadow(0 0 40px rgba(242,102,74,0.15))',
                    animation: 'heroFloat 3s ease-in-out infinite',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                />
              </div>

              {/* About right: terminal + stats — hidden until phase 3 */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  width: '100%',
                  transform: 'translateY(-50%)',
                  paddingRight: '24px',
                  zIndex: 5,
                }}
              >
                <div
                  ref={terminalRef}
                  style={{
                    background: 'rgba(20, 20, 28, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '20px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '13px',
                    marginBottom: '16px',
                    opacity: 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                    {['#FF5F57', '#FEBC2E', '#28C840'].map((color) => (
                      <div key={color} style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />
                    ))}
                    <span style={{ marginLeft: '8px', color: 'rgba(240,237,232,0.4)', fontSize: '11px' }}>het@portfolio ~ %</span>
                  </div>
                  <div style={{ lineHeight: '1.8' }}>
                    {[
                      ['name', '"Het Patel"'],
                      ['role', '"Full Stack Engineer"'],
                      ['location', '"Brampton, ON 🍁"'],
                      ['stack', '["React","Node","TypeScript"]'],
                      ['status', '"Available 2026 ✅"'],
                    ].map(([key, val]) => (
                      <div key={key}>
                        <span style={{ color: '#60A5FA' }}>const </span>
                        <span style={{ color: '#F0EDE8' }}>{key} =</span>
                        <span style={{ color: '#C8F135' }}> {val}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: '8px' }}>
                      <span style={{ color: 'rgba(240,237,232,0.4)' }}>// trilingual: English · Hindi · Gujarati</span>
                    </div>
                    <div>
                      <span style={{ color: 'rgba(240,237,232,0.4)' }}>// top 150 canada · top 3 GTA</span>
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      <span style={{ color: '#F2664A' }}>█</span>
                    </div>
                  </div>
                </div>

                <div ref={statsRef} className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`about-stat-card about-stat-card--${stat.variant}`}
                      style={{ opacity: 0 }}
                    >
                      <div className="about-stat-number">{stat.number}</div>
                      <div className="about-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
