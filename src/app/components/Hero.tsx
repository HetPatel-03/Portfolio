import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const cycleWords = ['Software Engineer.', 'Problem Solver.', 'Product Minded.', 'Full Stack Dev.'];
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroLeftRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    if (!imageWrapperRef.current || !heroImageRef.current) return;

    const ctx = gsap.context(() => {
      const aboutHeading = gsap.utils.toArray<HTMLElement>('[data-about-heading]');
      const aboutLines = gsap.utils.toArray<HTMLElement>('[data-about-line]');
      const aboutCta = gsap.utils.toArray<HTMLElement>('[data-about-cta]');
      const aboutTerminal = document.querySelector<HTMLElement>('[data-about-terminal]');
      const aboutStats = gsap.utils.toArray<HTMLElement>('[data-about-stat]');

      if (!heroLeftRef.current || !aboutTerminal) return;

      let swapped = false;

      function getCenterOffset() {
        const wrapper = imageWrapperRef.current;
        if (!wrapper) return 0;
        const rect = wrapper.getBoundingClientRect();
        const wrapperCenter = rect.left + rect.width / 2;
        const screenCenter = window.innerWidth / 2;
        return wrapperCenter - screenCenter;
      }

      function getLeftOffset() {
        const wrapper = imageWrapperRef.current;
        if (!wrapper) return 0;
        const rect = wrapper.getBoundingClientRect();
        return -(window.innerWidth - rect.width - 40);
      }

      gsap.set(heroImageRef.current, { clearProps: 'all' });
      heroImageRef.current.src = '/Me_Hero.png';
      gsap.set(heroImageRef.current, { rotateY: 0, transformOrigin: 'center center' });
      gsap.set(imageWrapperRef.current, { x: 0, y: 0, scale: 1 });
      gsap.set(heroLeftRef.current, { opacity: 1, y: 0 });
      gsap.set(aboutHeading, { opacity: 0, x: -40 });
      gsap.set(aboutLines, { opacity: 0, y: 40 });
      gsap.set(aboutCta, { opacity: 0, y: 30 });
      gsap.set(aboutTerminal, { opacity: 0, y: 60 });
      gsap.set(aboutStats, { opacity: 0, y: 60 });

      const PHASE_1_START = 0;
      const PHASE_1_END = 3;
      const PHASE_2_START = 3;
      const PHASE_2_END = 5;
      const PHASE_2B_START = 5;
      const PHASE_2B_END = 6.5;
      const PHASE_3_START = 6.5;
      const PHASE_3_END = 8.5;
      const PHASE_4_END = 10;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-about-scene',
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Left content swap while image stays fixed on right
      tl.to(heroLeftRef.current, { opacity: 0, y: -30, duration: 1.3 }, PHASE_1_START)
        .to(aboutHeading, { opacity: 1, x: 0, duration: 1.1, stagger: 0.1 }, PHASE_1_START + 0.6)
        .to(aboutLines, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, PHASE_1_START + 0.9)
        .to(aboutCta, { opacity: 1, y: 0, duration: 0.9 }, PHASE_1_START + 1.3)
        // Phase 2: image moves right -> center
        .to(
          imageWrapperRef.current,
          {
            x: () => -getCenterOffset(),
            scale: 1.05,
            duration: PHASE_2_END - PHASE_2_START,
          },
          PHASE_2_START
        )
        // Phase 2B: 3D flip and source swap at edge-on
        .to(
          heroImageRef.current,
          {
            rotateY: 180,
            duration: PHASE_2B_END - PHASE_2B_START,
            onUpdate: () => {
              const angle = Math.abs(Number(gsap.getProperty(heroImageRef.current, 'rotateY')));
              if (angle >= 90 && !swapped) {
                heroImageRef.current!.src = '/Image2.png.PNG';
                swapped = true;
              }
            },
          },
          PHASE_2B_START
        )
        // Phase 3: photo to left, right terminal/stats reveal
        .to(
          imageWrapperRef.current,
          {
            x: () => getLeftOffset(),
            scale: 1,
            duration: PHASE_3_END - PHASE_3_START,
          },
          PHASE_3_START
        )
        .to(aboutTerminal, { opacity: 1, y: 0, duration: 1 }, PHASE_3_START + 0.25)
        .to(aboutStats, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' }, PHASE_3_START + 0.45)
        // Phase 4 hold from 0.85 -> 1.0
        .to({}, { duration: PHASE_4_END - PHASE_3_END }, PHASE_3_END);
    }, heroSectionRef);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
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

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="section-bg-hero relative"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '80px',
        paddingLeft: 'clamp(24px, 5vw, 80px)',
        paddingRight: '0',
      }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="w-full">
        <div
          className="flex flex-col md:flex-row gap-12 md:gap-16"
          style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* Left Side */}
          <div
            ref={heroLeftRef}
            className="relative z-10 w-full text-center md:text-left"
            style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 0, paddingLeft: 0 }}
          >
            {/* Availability badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(44, 43, 48, 0.7)',
                border: '1px solid rgba(240, 237, 232, 0.08)',
                backdropFilter: 'blur(20px)',
                marginLeft: 0,
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--sage-green)' }} />
              <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                Available for opportunities · Summer 2026
              </span>
            </div>

            {/* Watermark */}
            <div 
              className="absolute -left-8 top-32 pointer-events-none select-none"
              style={{
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

            {/* Greeting */}
            <p 
              className="text-[22px] mb-2"
              style={{ 
                color: 'rgba(240, 237, 232, 0.4)', 
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                marginLeft: 0,
              }}
            >
              Hi, I'm
            </p>

            {/* Name */}
            <h1 
              className="mb-4"
              style={{
                fontSize: '96px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-3px',
                lineHeight: 0.95,
                marginLeft: 0,
              }}
            >
              Het Patel.
            </h1>

            {/* Cycling text — single line; font scales with viewport width */}
            <div className="relative mb-6 h-[52px] w-full overflow-hidden sm:h-[56px] md:h-[60px]">
              {cycleWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: index === cycleIndex ? 1 : 0,
                    y: index === cycleIndex ? 0 : 10
                  }}
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

            {/* Description */}
            <p 
              className="text-base mb-8 max-w-xl"
              style={{ 
                color: 'var(--text-muted)', 
                fontFamily: 'var(--font-body)',
                marginLeft: 0,
              }}
            >
              I build end-to-end products. Engineer. Product thinker. Top performer.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8" style={{ marginLeft: 0 }}>
              <button
                onClick={() => scrollToSection('connect')}
                className="px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--coral)',
                  color: 'var(--bg-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  height: '48px'
                }}
              >
                Contact Me →
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 rounded-full transition-all duration-200 hover:border-[var(--coral)]"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(240, 237, 232, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  height: '48px'
                }}
              >
                Explore My Work
              </button>
            </div>

            {/* Social — glass pill links */}
            <div
              className="flex flex-wrap justify-center md:justify-start"
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '24px',
                marginLeft: 0,
              }}
            >
              <a
                href="https://github.com/hetpatel"
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/hetpatel"
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://x.com/hetpatel"
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </a>
            </div>
          </div>

          {/* Right side spacer keeps initial hero layout balance */}
          <div
            className="relative w-full h-[420px] md:h-[600px]"
            style={{ flex: '0 0 42%', alignSelf: 'stretch' }}
          >
          </div>
        </div>
      </div>

      <div
        ref={imageWrapperRef}
        style={{
          perspective: '1000px',
          position: 'absolute',
          right: '0',
          top: '0',
          height: '100%',
          width: '42%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <img
          ref={heroImageRef}
          src="/Me_Hero.png"
          alt="Het Patel"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            height: '90%',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom',
            maxHeight: '700px',
            filter: 'drop-shadow(0 0 40px rgba(242,102,74,0.15))',
          }}
        />
      </div>
    </section>
  );
}