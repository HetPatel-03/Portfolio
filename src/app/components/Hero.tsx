import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import meHero from '../../assets/Me_Hero.png';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [heroImageSrc, setHeroImageSrc] = useState(meHero);
  const cycleWords = ['Software Engineer.', 'Problem Solver.', 'Product Minded.', 'Full Stack Dev.'];
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroLeftRef = useRef<HTMLDivElement | null>(null);
  const heroImageShellRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const scene = document.getElementById('hero-about-scene');
    if (!scene || !heroImageShellRef.current || !heroImageRef.current) return;

    const ctx = gsap.context(() => {
      const aboutLines = gsap.utils.toArray<HTMLElement>('[data-about-line]');
      const aboutReveal = gsap.utils.toArray<HTMLElement>('[data-about-reveal]');
      const aboutTerminal = document.querySelector<HTMLElement>('[data-about-terminal]');
      const aboutStats = gsap.utils.toArray<HTMLElement>('[data-about-stat]');

      gsap.set(heroImageRef.current, { rotateY: 0, transformOrigin: 'center center' });
      gsap.set(heroImageShellRef.current, { x: 0, y: 0, scale: 1 });
      gsap.set(heroLeftRef.current, { opacity: 1 });

      const flipState = { angle: 0, swapped: false };
      const getToAboutRightX = () => window.innerWidth * 0.05;
      const getToCenterX = () => -window.innerWidth * 0.16;
      const getToFinalLeftX = () => -window.innerWidth * 0.43;
      const getToAboutY = () => window.innerHeight * 0.9;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        heroLeftRef.current,
        { opacity: 0, duration: 15, ease: 'none' },
        0
      )
        .to(
          heroImageShellRef.current,
          {
            x: getToAboutRightX,
            y: getToAboutY,
            duration: 30,
            ease: 'none',
          },
          0
        )
        .to(
          aboutLines,
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 8,
            ease: 'power2.out',
          },
          4
        )
        .to(
          aboutReveal,
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 8,
            ease: 'power2.out',
          },
          6
        )
        .to(
          heroImageShellRef.current,
          {
            x: getToCenterX,
            scale: 1.05,
            duration: 20,
            ease: 'power2.inOut',
          },
          30
        )
        .to(
          flipState,
          {
            angle: 180,
            duration: 15,
            ease: 'none',
            onUpdate: () => {
              const shadow = 12 + (flipState.angle / 180) * 18;
              gsap.set(heroImageRef.current, {
                rotateY: flipState.angle,
                boxShadow: `0 ${shadow}px ${shadow * 1.8}px rgba(0,0,0,0.28)`,
              });
              if (flipState.angle >= 90 && !flipState.swapped) {
                setHeroImageSrc('/Image2.png');
                flipState.swapped = true;
              } else if (flipState.angle < 90 && flipState.swapped) {
                setHeroImageSrc(meHero);
                flipState.swapped = false;
              }
            },
          },
          50
        )
        .to(
          heroImageShellRef.current,
          {
            x: getToFinalLeftX,
            y: getToAboutY,
            scale: 1,
            duration: 20,
            ease: 'power2.inOut',
          },
          65
        )
        .to(
          aboutTerminal,
          {
            y: 0,
            opacity: 1,
            duration: 8,
            ease: 'power2.out',
          },
          68
        )
        .to(
          aboutStats,
          {
            y: 0,
            opacity: 1,
            duration: 8,
            stagger: 0.12,
            ease: 'back.out(1.2)',
          },
          70
        );
    }, heroSectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
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

          {/* Right Side - Hero image */}
          <div
            className="relative w-full h-[420px] md:h-[600px]"
            style={{ flex: '0 0 42%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', alignSelf: 'stretch', padding: 0 }}
          >
            <div
              ref={heroImageShellRef}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '100%',
                height: '100%',
                perspective: '1000px',
              }}
            >
              <img
                ref={heroImageRef}
                src={heroImageSrc}
                alt="Het Patel"
                style={{
                  height: '90%',
                  width: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                  maxHeight: '700px',
                  filter: 'drop-shadow(0 0 40px rgba(242,102,74,0.15))',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}