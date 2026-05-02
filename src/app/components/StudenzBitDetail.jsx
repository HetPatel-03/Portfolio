import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StudenzBitDetail() {
  const heroRef = useRef(null);
  const section2Ref = useRef(null);
  const moonRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    if (!moonRef.current || !section2Ref.current || !heroRef.current || !heroTextRef.current) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const startRight = window.innerWidth * 0.04;
    const moonWidth = 180;
    const endLeft = window.innerWidth * 0.04;
    const totalX = -(window.innerWidth - startRight - moonWidth - endLeft);

    gsap.set(moonRef.current, {
      position: 'fixed',
      top: '5vh',
      right: '4vw',
      left: 'auto',
      x: 0,
      y: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top 90%',
        end: 'top 10%',
        scrub: 2,
        onEnter: () => gsap.set(moonRef.current, { zIndex: 3 }),
        onLeaveBack: () => gsap.set(moonRef.current, { zIndex: 100 }),
      },
    });

    tl.to(moonRef.current, {
      x: totalX,
      y: 30,
      rotation: 120,
      background: 'radial-gradient(circle at 40% 40%, #fffde7 0%, #FDE68A 25%, #FCD34D 55%, rgba(252,180,50,0.7) 75%, transparent 100%)',
      boxShadow: '0 0 0 1px rgba(252,211,77,0.4), 0 0 50px rgba(252,211,77,0.8), 0 0 100px rgba(252,180,50,0.5), 0 0 180px rgba(252,150,30,0.25)',
      ease: 'none',
    });

    const terminator = moonRef.current.querySelector('.terminator');
    if (terminator) {
      tl.to(terminator, {
        opacity: 0,
        duration: 1,
        ease: 'none',
      }, '<');
    }

    gsap.to(heroTextRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'center top',
        end: 'bottom top',
        scrub: 1,
      },
      opacity: 0,
      y: -30,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const statPills = ['16+ Pages', '4 Blog Posts', 'Amazon Affiliate', 'Launched 2024'];

  return (
    <div style={{ position: 'relative', background: '#000', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@900&family=DM+Sans:wght@300;400;700&display=swap');
        html, body, #root {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
      `}</style>

      <div
        ref={moonRef}
        style={{
          position: 'fixed',
          top: '5vh',
          right: '4vw',
          left: 'auto',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at 35% 35%, #e8e8e0 0%, #c8c8b8 25%, #a0a090 50%, #787868 75%, #505040 100%)',
          boxShadow:
            '0 0 0 1px rgba(200,220,255,0.2), 0 0 40px rgba(180,200,255,0.5), 0 0 80px rgba(150,180,255,0.3), 0 0 140px rgba(120,160,255,0.15)',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '25%',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.15)',
            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '40%',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.15)',
            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '60%',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.15)',
            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)',
          }}
        />
        <div
          className="terminator"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 70% 50%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

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

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { value: '16+', label: 'Pages Built' },
              { value: '4', label: 'Blog Posts' },
              { value: '2024', label: 'Year Launched' },
            ].map((s, idx) => (
              <div key={s.label} style={{ marginBottom: idx === 2 ? 0 : '1.2rem' }}>
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
            zIndex: 10,
            right: '4rem',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '480px',
          }}
        >
          <p
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
              whiteSpace: 'pre-line',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: '#2d1a0e',
              lineHeight: 1.1,
            }}
          >
            {'10,000km from home.\nGooggling everything.'}
          </h2>

          <p
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
            {statPills.map((pill) => (
              <span
                key={pill}
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
      </section>
    </div>
  );
}
