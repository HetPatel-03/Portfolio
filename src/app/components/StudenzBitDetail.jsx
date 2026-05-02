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

    gsap.to(moonRef.current, {
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top bottom',
        end: 'top top',
        scrub: 1.5,
      },
      top: '8vh',
      right: '6vw',
      boxShadow: '0 0 80px rgba(252,211,77,0.7), 0 0 160px rgba(252,211,77,0.3)',
      background: 'radial-gradient(circle, #fff9e6 0%, #FCD34D 40%, rgba(252,180,50,0.6) 70%, transparent 100%)',
      ease: 'none',
    });

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
      gsap.killTweensOf(moonRef.current);
      gsap.killTweensOf(heroTextRef.current);
    };
  }, []);

  const statPills = ['16+ Pages', '4 Blog Posts', 'Amazon Affiliate', 'Launched 2024'];

  return (
    <div style={{ position: 'relative', background: '#000' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@900&family=DM+Sans:wght@300;400&display=swap');
      `}</style>

      <div
        ref={moonRef}
        style={{
          position: 'fixed',
          top: '6vh',
          right: '6vw',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(13,148,136,0.95) 45%, rgba(13,148,136,0.8) 68%, rgba(13,148,136,0.1) 100%)',
          boxShadow: '0 0 60px rgba(13,148,136,0.6), 0 0 120px rgba(13,148,136,0.3)',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />

      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/Studenzbit_1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '2.5rem',
            zIndex: 3,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            TECHNICAL DEEP DIVE · 2024
          </p>
          <p
            style={{
              margin: '0.45rem 0 0 0',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            Web · Affiliate · SEO · Content
          </p>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
          }}
          style={{
            position: 'absolute',
            top: '2.5rem',
            right: '2.5rem',
            zIndex: 2,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.75rem',
            textDecoration: 'none',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          ← Portfolio
        </a>

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
            bottom: '4rem',
            left: '2.5rem',
            zIndex: 3,
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
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
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              color: '#fff',
              lineHeight: 0.95,
            }}
          >
            unknown
          </span>
          <p
            style={{
              margin: '1rem 0 0 0',
              maxWidth: '320px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            A survival guide for international students landing in Canada
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.open('https://studenzbit.com', '_blank')}
          style={{
            position: 'absolute',
            bottom: '4rem',
            right: '2.5rem',
            zIndex: 3,
            border: '1px solid rgba(255,255,255,0.4)',
            padding: '0.75rem 1.5rem',
            borderRadius: '2px',
            background: 'transparent',
            color: '#fff',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 400,
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
        >
          Visit StudenzBit ↗
        </button>

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
