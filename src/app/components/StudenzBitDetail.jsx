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

  const section2LineRef = useRef(null);
  const section2LabelRef = useRef(null);
  const section2HeadlineLine1Ref = useRef(null);
  const section2HeadlineLine2Ref = useRef(null);
  const section2BodyRef = useRef(null);
  const pillRefs = useRef([]);

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

      gsap.set(section2LineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(
        [
          section2LabelRef.current,
          section2HeadlineLine1Ref.current,
          section2HeadlineLine2Ref.current,
          section2BodyRef.current,
          ...pillRefs.current,
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

      gsap.fromTo(
        section2LineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        section2LabelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.6,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        section2HeadlineLine1Ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        section2HeadlineLine2Ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        section2BodyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        pillRefs.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );
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
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '0.3rem',
              }}
            >
              TECHNICAL DEEP DIVE · 2024
            </p>
            <p
              style={{
                margin: '0 0 2rem 0',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 300,
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.45)',
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
          style={{
            position: 'absolute',
            left: '1.5rem',
            top: '50%',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left top',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 400,
            fontSize: '0.5rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.4)',
            zIndex: 2,
          }}
        >
          SCROLL DOWN
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
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.15)), url('/Studenzbit_2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '4rem',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '480px',
          }}
        >
          <div style={{ position: 'relative', zIndex: 10 }}>
          <div
            ref={section2LineRef}
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(45,26,14,0.3)',
              marginBottom: '1rem',
            }}
          />

          <p
            ref={section2LabelRef}
            style={{
              margin: '0 0 1rem 0',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(80,40,20,0.7)',
            }}
          >
            THE PROBLEM
          </p>

          <h2
            style={{
              margin: '0 0 1.5rem 0',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: '#2d1a0e',
              lineHeight: 1.1,
            }}
          >
            <span
              ref={section2HeadlineLine1Ref}
              style={{ display: 'block', whiteSpace: 'pre-line' }}
            >
              10,000km from home.
            </span>
            <span
              ref={section2HeadlineLine2Ref}
              style={{ display: 'block', whiteSpace: 'pre-line' }}
            >
              Googgling everything.
            </span>
          </h2>

          <p
            ref={section2BodyRef}
            style={{
              margin: '0 0 2rem 0',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(45,26,14,0.75)',
              lineHeight: 1.8,
            }}
          >
            Every year, thousands of international students land in Canada with no playbook. No one tells you how
            to open a bank account without a credit history, find housing before you have a job, or get a SIM card
            at 2am after a 20-hour flight. StudenzBit is the guide that should have existed.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {statPills.map((pill, idx) => (
              <span
                key={pill}
                ref={(el) => {
                  pillRefs.current[idx] = el;
                }}
                style={{
                  border: '1px solid rgba(45,26,14,0.2)',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '20px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.72rem',
                  color: 'rgba(45,26,14,0.6)',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
