import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StudenzBitDetail() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const section2Ref = useRef(null);
  const heroTextRef = useRef(null);

  const portfolioLinkRef = useRef(null);
  const heroStampRef = useRef(null);
  const statRowRefs = useRef([]);
  const heroLineIntoRef = useRef(null);
  const heroLineUnknownRef = useRef(null);
  const heroSublineRef = useRef(null);
  const heroButtonsRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current || !heroRef.current || !section2Ref.current) return undefined;

    const ctx = gsap.context(() => {
      const heroBtns = heroButtonsRef.current
        ? Array.from(heroButtonsRef.current.querySelectorAll('button'))
        : [];

      gsap.set(
        [
          portfolioLinkRef.current,
          heroStampRef.current,
          ...statRowRefs.current,
          heroLineIntoRef.current,
          heroLineUnknownRef.current,
          heroSublineRef.current,
          ...heroBtns,
        ].filter(Boolean),
        { opacity: 0 }
      );

      const intro = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

      intro.fromTo(
        portfolioLinkRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0 },
        0.2
      );

      intro.fromTo(
        heroStampRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0 },
        0.4
      );

      intro.fromTo(
        statRowRefs.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.15 },
        0.5
      );

      intro.fromTo(
        heroLineIntoRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        0.6
      );

      intro.fromTo(
        heroLineUnknownRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        0.75
      );

      intro.fromTo(
        heroSublineRef.current,
        { opacity: 0 },
        { opacity: 1 },
        0.9
      );

      intro.fromTo(
        heroBtns,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1 },
        1.0
      );

      if (heroTextRef.current) {
        gsap.to(heroTextRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'center top',
            end: 'bottom top',
            scrub: 1,
          },
          opacity: 0,
          y: -40,
          ease: 'none',
        });
      }

    }, rootRef);

    return () => ctx.revert();
  }, []);

  const statPills = ['16+ Pages', '4 Blog Posts', 'Amazon Affiliate', 'Launched 2024'];

  return (
    <div ref={rootRef} style={{ position: 'relative', background: '#000', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@900&family=DM+Sans:wght@300;400;700&display=swap');
        html, body, #root {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
      `}</style>

      <section
        ref={heroRef}
        style={{
          position: 'relative',
          top: 0,
          marginTop: 0,
          height: '100vh',
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/Studenzbit_1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '2.5rem',
            zIndex: 10,
          }}
        >
          <a
            ref={portfolioLinkRef}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '';
            }}
            style={{
              display: 'inline-block',
              marginBottom: '1.5rem',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
          >
            ← Portfolio
          </a>

          <div ref={heroStampRef}>
            <p
              style={{
                margin: 0,
                fontFamily: 'Unbounded, sans-serif',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '0.05em',
                color: '#fff',
                marginBottom: '0.4rem',
              }}
            >
              TECHNICAL DEEP DIVE · 2024
            </p>
            <p
              style={{
                margin: '0 0 2rem 0',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Web · Affiliate · SEO · Content
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { value: '16+', label: 'Pages Built' },
              { value: '4', label: 'Blog Posts' },
              { value: '2024', label: 'Year Launched' },
            ].map((s, idx) => (
              <div
                key={s.label}
                ref={(el) => {
                  statRowRefs.current[idx] = el;
                }}
                style={{ marginBottom: idx === 2 ? 0 : '1.2rem' }}
              >
                <div
                  style={{
                    fontFamily: 'Unbounded, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    color: '#fff',
                    lineHeight: 1.1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    marginTop: '0.25rem',
                  }}
                >
                  {s.label}
                </div>
                {idx < 2 ? (
                  <div
                    style={{
                      width: '40px',
                      height: '1px',
                      background: 'rgba(255,255,255,0.15)',
                      marginTop: '1.2rem',
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={heroTextRef}
          style={{
            position: 'absolute',
            bottom: '6rem',
            right: '2.5rem',
            zIndex: 3,
            textAlign: 'right',
          }}
        >
          <span
            ref={heroLineIntoRef}
            style={{
              display: 'block',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              color: '#fff',
              lineHeight: 0.95,
            }}
          >
            into the
          </span>
          <span
            ref={heroLineUnknownRef}
            style={{
              display: 'block',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              color: '#fff',
              lineHeight: 0.95,
            }}
          >
            unknown
          </span>
          <p
            ref={heroSublineRef}
            style={{
              margin: '1rem 0 0 auto',
              maxWidth: '300px',
              textAlign: 'right',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.85rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            A survival guide for international students landing in Canada
          </p>
        </div>

        <div
          ref={heroButtonsRef}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '2.5rem',
            display: 'flex',
            gap: '1rem',
            zIndex: 3,
          }}
        >
          <button
            type="button"
            onClick={() => window.open('https://studenzbit.com', '_blank')}
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '50px',
              padding: '0.75rem 1.5rem',
              color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }}
          >
            Visit StudenzBit ↗
          </button>

          <button
            type="button"
            onClick={() => section2Ref.current?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: '#0D9488',
              border: 'none',
              borderRadius: '50px',
              padding: '0.75rem 1.5rem',
              color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              boxShadow: '0 0 20px rgba(13,148,136,0.4)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0f9e92';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(13,148,136,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0D9488';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(13,148,136,0.4)';
            }}
          >
            View Case Study ↓
          </button>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: '1px',
            height: '40px',
            background: 'rgba(255,255,255,0.3)',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        />
      </section>

      <section
        ref={section2Ref}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          backgroundImage:
            "url('/Studenzbit_2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '3rem',
            left: '3rem',
            zIndex: 20,
            opacity: 1,
          }}
        >
          <div
            className="s2-line"
            style={{
              width: '50px',
              height: '1px',
              background: 'rgba(45,26,14,0.4)',
              marginBottom: '0.8rem',
              opacity: 1,
            }}
          />

          <p
            className="s2-label"
            style={{
              margin: '0 0 0.8rem 0',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(45,26,14,0.55)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              display: 'block',
              opacity: 1,
            }}
          >
            OVERVIEW
          </p>

          <h2
            className="s2-headline"
            style={{
              margin: '0 0 1.5rem 0',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#2d1a0e',
              lineHeight: 1.05,
              opacity: 1,
            }}
          >
            <span style={{ display: 'block', opacity: 1 }}>The Problem</span>
            <span style={{ display: 'block', opacity: 1 }}>We Solved.</span>
          </h2>
        </div>

        <div
          style={{
            position: 'absolute',
            right: '3rem',
            top: '52%',
            maxWidth: '400px',
            zIndex: 20,
            opacity: 1,
          }}
        >
          <p
            className="s2-body"
            style={{
              margin: '0 0 2rem 0',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.88rem',
              color: 'rgba(45,26,14,0.75)',
              lineHeight: 1.85,
              opacity: 1,
            }}
          >
            Every year, thousands of international students land in Canada with no playbook. No one tells you how
            to open a bank account without a credit history, find housing before you have a job, or get a SIM card
            at 2am after a 20-hour flight. StudenzBit is the guide that should have existed.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {statPills.map((pill) => (
              <span
                key={pill}
                className="s2-pill"
                style={{
                  border: '1px solid rgba(45,26,14,0.2)',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.72rem',
                  color: 'rgba(45,26,14,0.65)',
                  background: 'rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(8px)',
                  opacity: 1,
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
