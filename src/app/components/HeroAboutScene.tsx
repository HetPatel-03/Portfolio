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

const MOBILE_BREAKPOINT = 768;

export function HeroAboutScene() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT);
  const cycleWords = ['Software Engineer.', 'Problem Solver.', 'Product Minded.', 'Full Stack Dev.'];

  const sceneRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgFrontRef = useRef<HTMLImageElement>(null);
  const imgBackRef = useRef<HTMLImageElement>(null);
  const terminalColRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((p) => (p + 1) % cycleWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    if (isMobile) return;
    let cleanup = () => {};
    const refreshDelay = window.setTimeout(() => {
      const ctx = gsap.context(() => {
        const scene = sceneRef.current;
        const heroLeft = heroLeftRef.current;
        const aboutText = aboutTextRef.current;
        const imgWrapper = imgWrapperRef.current;
        const imgFront = imgFrontRef.current;
        const imgBack = imgBackRef.current;
        const terminalCol = terminalColRef.current;
        const statsGrid = statsGridRef.current;

        if (!scene || !heroLeft || !aboutText || !imgWrapper || !imgFront || !imgBack || !terminalCol || !statsGrid) return;

        gsap.set(aboutText, { autoAlpha: 0, y: 50 });
        gsap.set(terminalCol, { autoAlpha: 0, x: 60 });
        gsap.set(Array.from(statsGrid.children), { autoAlpha: 0, y: 60 });
        gsap.set(imgWrapper, {
          x: 0,
          rotationY: 0,
          transformOrigin: '50% 50%',
          transformPerspective: 1200,
          scale: 1,
          autoAlpha: 1,
          clearProps: 'filter',
        });
        gsap.set(imgFront, { autoAlpha: 1, rotateY: 0, scale: 1, transformOrigin: '50% 50%' });
        gsap.set(imgBack, { autoAlpha: 1, rotateY: 180, scale: 1, transformOrigin: '50% 50%' });

        const rect = imgWrapper.getBoundingClientRect();
        const rightGap = window.innerWidth - rect.right;
        const toLeft = -(rect.left - rightGap * 0.5) + 130;

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: '+=280%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(heroLeft, { autoAlpha: 0, y: -60, filter: 'blur(8px)', duration: 1.5 }, 0)
          .to(aboutText, { autoAlpha: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 0.5)
          .to(aboutText, { autoAlpha: 0, y: -30, filter: 'blur(6px)', duration: 0.8 }, 2)
          .to([heroLeft, aboutText], { filter: 'blur(8px)', opacity: 0.5, duration: 0.5 }, 2.25)
          .to(imgWrapper, { x: toLeft, duration: 2.1, ease: 'power2.inOut' }, 2.2)
          .to(imgWrapper, { rotationY: 180, duration: 1.5, ease: 'power2.inOut' }, 2.45)
          .to([heroLeft, aboutText], { filter: 'blur(0px)', opacity: 1, duration: 0.45 }, 3.65)
          .to(terminalCol, { autoAlpha: 0.35, duration: 0.4 }, 3.15)
          .to(terminalCol, { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' }, 4.0)
          .to(Array.from(statsGrid.children), {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'back.out(1.2)',
          }, 4.2)
          .to({}, { duration: 1.5 }, 6);
      }, sceneRef);

      ScrollTrigger.refresh();
      cleanup = () => ctx.revert();
    }, 150);

    return () => {
      window.clearTimeout(refreshDelay);
      cleanup();
    };
  }, [isMobile]);

  useLayoutEffect(() => {
    if (!isMobile) return;
    const targets = [heroLeftRef, aboutTextRef, imgWrapperRef, terminalColRef];
    targets.forEach((ref) => {
      if (ref.current) gsap.set(ref.current, { clearProps: 'all' });
    });
    if (imgFrontRef.current) gsap.set(imgFrontRef.current, { clearProps: 'all' });
    if (imgBackRef.current) gsap.set(imgBackRef.current, { clearProps: 'all' });
  }, [isMobile]);

  const renderHeroBlock = () => (
    <div ref={heroLeftRef} className="hero-about-block hero-about-block--hero">
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
        style={{
          background: 'rgba(44,43,48,0.7)',
          border: '1px solid rgba(240,237,232,0.08)',
          backdropFilter: 'blur(20px)',
          width: 'fit-content',
        }}
      >
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--sage-green)' }} />
        <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          Open to opportunities
        </span>
      </div>

      <div className="absolute pointer-events-none select-none hidden md:block" style={{
        left: '-32px', top: '100px',
        fontSize: '280px', fontFamily: 'var(--font-heading)', fontWeight: 800,
        color: 'rgba(240,237,232,0.02)', lineHeight: 1, zIndex: -1, filter: 'blur(2px)',
      }}>{'</>'}</div>

      <p className="hero-about-lead" style={{ fontSize: '22px', color: 'rgba(240,237,232,0.4)', fontFamily: 'var(--font-body)', fontWeight: 400, marginBottom: '8px' }}>
        Hi, I&apos;m
      </p>
      <h1 className="hero-about-name" style={{
        fontSize: 'clamp(64px, 8vw, 108px)',
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        color: 'var(--text-primary)', letterSpacing: '-3px',
        lineHeight: 0.95, marginBottom: '16px',
      }}>
        Het Patel.
      </h1>

      <div className="relative mb-6 overflow-hidden" style={{ height: '60px' }}>
        {cycleWords.map((word, i) => (
          <motion.span key={word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: i === cycleIndex ? 1 : 0, y: i === cycleIndex ? 0 : 10 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center"
            style={{
              fontSize: 'clamp(18px, 2.65vw + 0.4rem, 40px)',
              fontFamily: 'var(--font-heading)', fontWeight: 800,
              color: 'var(--coral)', letterSpacing: '-0.03em', whiteSpace: 'nowrap',
            }}
          >{word}</motion.span>
        ))}
      </div>

      <p className="hero-about-desc" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', marginBottom: '32px' }}>
        I build features, fix systems, and integrate AI into products.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
        <button onClick={() => scrollToSection('connect')}
          style={{ padding: '12px 24px', background: 'var(--coral)', color: 'var(--bg-primary)', fontFamily: 'var(--font-body)', fontWeight: 500, borderRadius: '50px', border: 'none', cursor: 'pointer', height: '48px' }}>
          Contact Me →
        </button>
        <button onClick={() => scrollToSection('projects')}
          style={{ padding: '12px 24px', background: 'transparent', border: '1px solid rgba(240,237,232,0.15)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', borderRadius: '50px', cursor: 'pointer', height: '48px' }}>
          Explore My Work
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {[
          { label: 'GitHub', href: 'https://github.com/HetPatel-03', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hetppatel', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
          { label: 'X', href: 'https://x.com/hetpatel', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
        ].map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', color: '#F0EDE8', fontSize: '13px', fontFamily: 'DM Sans', textDecoration: 'none', transition: 'all 0.2s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(242,102,74,0.4)'; e.currentTarget.style.background = 'rgba(242,102,74,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          >{icon}{label}</a>
        ))}
      </div>
    </div>
  );

  const renderAboutBlock = () => (
    <div ref={aboutTextRef} id="about" className="hero-about-block hero-about-block--about">
      <p style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-mono)', color: 'var(--coral)', fontSize: '12px', marginBottom: '16px', letterSpacing: '0.05em' }}>
        // 01 · about
      </p>
      <h2 style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: 'var(--font-heading)', fontWeight: 900,
        color: 'var(--text-primary)', letterSpacing: '-1px',
        fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, marginBottom: '20px', width: '100%',
      }}>
        Software Engineer.
      </h2>
      <p style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#D0D0E0', fontSize: '20px', marginBottom: '24px' }}>
        Built 3+ live products used by international students across Canada — full-stack, AI-integrated, shipped.
      </p>
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 0 }}>
        <div
          aria-hidden
          className="hidden md:block"
          style={{
            position: 'absolute',
            top: 'auto',
            bottom: 0,
            right: '-2rem',
            left: 'auto',
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(12rem, 25vw, 22rem)',
            color: 'white',
            opacity: 0.04,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
            filter: 'blur(2px)',
            zIndex: 0,
          }}
        >
          &gt;_
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            'I break down complex engineering problems fast — REST APIs, database schemas, cloud infrastructure and everything in between.',
            'I thrive in fast-moving environments where shipping matters and business impact is the goal.',
            'Currently deep in Next.js, Supabase and AI/ML — building scalable products for real users.',
          ].map((text, i) => (
            <p key={i} style={{ display: 'flex', gap: '12px', color: '#A8A8B8', fontFamily: 'var(--font-body)', lineHeight: 1.75, fontSize: '15px' }}>
              <span style={{ color: '#F2664A', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span>{text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  const renderImageBlock = () => (
    <div ref={imgWrapperRef} className="hero-about-block hero-about-block--image">
      <img
        ref={imgBackRef}
        src="/Image2.png"
        alt=""
        aria-hidden
        className="hero-scene-image hero-scene-image--back"
      />
      <img
        ref={imgFrontRef}
        src="/Me_Hero.png"
        alt="Het Patel"
        className="hero-scene-image hero-scene-image--front"
      />
    </div>
  );

  const renderTerminalBlock = () => (
    <div ref={terminalColRef} className="hero-about-block hero-about-block--terminal">
      <div style={{
        background: 'rgba(14,14,20,0.95)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '20px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '13px',
        marginBottom: '14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
          ))}
          <span style={{ marginLeft: '8px', color: 'rgba(240,237,232,0.35)', fontSize: '11px' }}>het@portfolio ~ %</span>
        </div>
        <div style={{ lineHeight: '1.85' }}>
          {[
            ['name', '"Het Patel"'],
            ['role', '"Full Stack Engineer"'],
            ['location', '"Brampton, ON 🍁"'],
            ['stack', '["React","Node","TypeScript"]'],
            ['status', '"Available 2026 ✅"'],
          ].map(([k, v]) => (
            <div key={k}>
              <span style={{ color: '#60A5FA' }}>const </span>
              <span style={{ color: '#F0EDE8' }}>{k}</span>
              <span style={{ color: '#F0EDE8' }}> = </span>
              <span style={{ color: '#C8F135' }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: '10px', color: 'rgba(240,237,232,0.35)' }}>// trilingual: English · Hindi · Gujarati</div>
          <div style={{ color: 'rgba(240,237,232,0.35)' }}>// top 150 canada · top 3 GTA</div>
          <div style={{ marginTop: '6px', color: '#F2664A' }}>█</div>
        </div>
      </div>

      <div ref={statsGridRef} className="hero-about-stats" style={{ display: 'grid', gap: '12px', width: '100%' }}>
        {stats.map((s, i) => (
          <div key={i} className={`about-stat-card about-stat-card--${s.variant}`}>
            <div className="about-stat-number">{s.number}</div>
            <div className="about-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={sceneRef} id="hero-about-scene" className="hero-about-scene">
      <section id="hero" className="section-bg-hero hero-about-section">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        <div className="hero-about-grid">
          {renderHeroBlock()}
          {renderImageBlock()}
          {renderAboutBlock()}
          {renderTerminalBlock()}
        </div>
      </section>
    </div>
  );
}
