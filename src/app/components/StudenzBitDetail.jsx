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

  const techCards = [
    { tech: 'Vanilla JS', desc: 'No framework overhead. Ships faster, Lighthouse scores higher.' },
    { tech: 'D3.js', desc: 'Interactive map rendering. Full SVG control over visualizations.' },
    { tech: 'Schema Markup', desc: 'JSON-LD + OpenGraph. Built for AI and search discoverability.' },
    { tech: 'Amazon Affiliate', desc: 'Monetization layer via Associates program. Revenue from day one.' },
    { tech: 'llms.txt', desc: 'AI search visibility. Structured for AI crawlers.' },
  ];

  return (
    <div ref={rootRef} style={{ position: 'relative', background: '#000', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;800;900&family=DM+Sans:wght@300;400;700&display=swap');
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
            inset: 0,
            background: 'rgba(0,0,0,0.38)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

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
            href="https://portfolio-gules-kappa-5g75m34zuy.vercel.app/#"
            style={{
              display: 'inline-block',
              marginBottom: '1.2rem',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
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
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                color: '#fff',
                marginBottom: '0.3rem',
              }}
            >
              TECHNICAL DEEP DIVE
            </p>
            <p
              style={{
                margin: '0 0 2rem 0',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              HTML · CSS · JS · D3.js · GSAP · Supabase
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
              {[
                {
                  value: '95+',
                  label: 'Lighthouse Score',
                  descriptor: '↳ No framework, zero bloat',
                },
                {
                  value: '30+',
                  label: 'Pages Engineered',
                  descriptor: '↳ All hand-coded, no CMS',
                },
                {
                  value: '2',
                  label: 'Monetization Streams',
                  descriptor: '↳ Affiliate + Digital Products',
                },
              ].map((s, idx) => (
                <div key={s.label}>
                  <div
                    ref={(el) => {
                      statRowRefs.current[idx] = el;
                    }}
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
                        marginBottom: '0.2rem',
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.35)',
                        fontStyle: 'italic',
                        marginBottom: 0,
                      }}
                    >
                      {s.descriptor}
                    </div>
                  </div>
                  {idx < 2 ? (
                    <div
                      style={{
                        width: '40px',
                        height: '1px',
                        background: 'rgba(255,255,255,0.1)',
                        margin: '0.8rem 0',
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={heroTextRef}
          style={{
            position: 'absolute',
            bottom: '6rem',
            right: '2.5rem',
            zIndex: 10,
            textAlign: 'left',
          }}
        >
          <span
            ref={heroLineIntoRef}
            style={{
              display: 'block',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '-0.8rem',
              letterSpacing: '0.02em',
              position: 'relative',
              zIndex: 2,
            }}
          >
            into the unknown
          </span>
          <span
            ref={heroLineUnknownRef}
            style={{
              display: 'block',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              position: 'relative',
              zIndex: 1,
            }}
          >
            STUDENZBIT
          </span>
          <p
            ref={heroSublineRef}
            style={{
              display: 'block',
              marginTop: '0.8rem',
              maxWidth: '280px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.82rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              zIndex: 10,
            }}
          >
            A survival guide for international students
            <br />
            landing in Canada
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
            zIndex: 10,
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
            zIndex: 10,
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15,10,30,0.6) 70%, rgba(15,10,30,0.85) 100%)',
            zIndex: 3,
            pointerEvents: 'none',
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
            inset: 0,
            background: 'rgba(255,255,255,0.18)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to bottom, rgba(15,10,30,0.85) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: 0,
            padding: '5rem 3rem 3rem 3rem',
            alignItems: 'start',
            zIndex: 10,
          }}
        >
          <div
            style={{
              gridColumn: 1,
              gridRow: 1,
              paddingRight: '2rem',
              paddingTop: '2rem',
            }}
          >
            <span
              style={{
                width: '50px',
                height: '1px',
                background: 'rgba(45,26,14,0.35)',
                marginBottom: '0.8rem',
                display: 'block',
              }}
            />
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: 'rgba(45,26,14,0.55)',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
                display: 'block',
              }}
            >
              PROBLEM STATEMENT
            </span>
            <div
              style={{
                fontFamily: 'Unbounded, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                color: '#2d1a0e',
                lineHeight: 1.05,
              }}
            >
              <span style={{ display: 'block' }}>The Problem</span>
              <span style={{ display: 'block' }}>I Solved.</span>
            </div>
          </div>

          <div
            style={{
              gridColumn: 2,
              gridRow: 1,
              paddingLeft: '2rem',
              paddingTop: '6rem',
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 300,
                fontSize: '0.88rem',
                color: 'rgba(45,26,14,0.75)',
                lineHeight: 1.85,
              }}
            >
              International students arriving in Canada face a fragmented information problem — SIM cards, banking,
              housing, and OHIP each require separate research across unreliable sources. No single platform existed
              targeting Canada-bound international students specifically.
              <br />
              <br />
              StudenzBit consolidates this into one curated platform: structured guides, character-driven blog content,
              and affiliate-monetized resource pages — built for discoverability from day one.
            </p>
          </div>

          <div
            style={{
              gridColumn: '1 / -1',
              gridRow: 2,
              marginTop: '2.5rem',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {techCards.map((card) => (
                <div
                  key={card.tech}
                  style={{
                    width: 'calc(20% - 0.75rem)',
                    minWidth: '160px',
                    flex: 1,
                    boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(45,26,14,0.15)',
                    borderRadius: '10px',
                    padding: '0.9rem 1rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.45)';
                    e.currentTarget.style.borderColor = 'rgba(45,26,14,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                    e.currentTarget.style.borderColor = 'rgba(45,26,14,0.15)';
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Unbounded, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      color: '#2d1a0e',
                      marginBottom: '0.3rem',
                      display: 'block',
                    }}
                  >
                    {card.tech}
                  </span>
                  <div
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.72rem',
                      color: 'rgba(45,26,14,0.6)',
                      lineHeight: 1.6,
                    }}
                  >
                    {card.desc}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '2rem',
                width: '100%',
                height: '1px',
                background:
                  'linear-gradient(to right, transparent 0%, rgba(45,26,14,0.25) 20%, rgba(45,26,14,0.25) 80%, transparent 100%)',
              }}
            />

            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <a
                href="https://github.com/studenzbit/studenzbit.git"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(45,26,14,0.08)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(45,26,14,0.2)',
                  borderRadius: '50px',
                  padding: '0.75rem 1.5rem',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  color: '#2d1a0e',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(45,26,14,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(45,26,14,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(45,26,14,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(45,26,14,0.2)';
                }}
              >
                View Source on GitHub ↗
              </a>
              <a
                href="https://studenzbit.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#0D9488',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.75rem 1.5rem',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(13,148,136,0.35)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0f9e92';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(13,148,136,0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0D9488';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(13,148,136,0.35)';
                }}
              >
                Visit Live Site ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
