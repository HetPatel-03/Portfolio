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

    const moonTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=220%',
        scrub: 2,
        pin: moonRef.current,
        pinSpacing: false,
      },
    });

    moonTl
      // Stage 1: gentle pulse + wobble
      .to(moonRef.current, {
        scale: 1.15,
        rotation: 5,
        boxShadow:
          '0 0 44px rgba(200,220,255,0.45), 0 0 92px rgba(150,180,255,0.22), 0 0 145px rgba(100,140,255,0.14)',
        duration: 4,
        ease: 'none',
      }, 0)
      // Stage 2: diagonal travel + brighter trails
      .to(moonRef.current, {
        top: '34vh',
        right: '34vw',
        rotation: 15,
        boxShadow:
          '0 0 65px rgba(210,230,255,0.55), 0 0 120px rgba(170,200,255,0.35), 0 0 180px rgba(120,160,255,0.2)',
        duration: 3,
        ease: 'none',
      }, 4)
      // Stage 3: settle + morph into warm sun
      .to(moonRef.current, {
        top: '8vh',
        right: '6vw',
        scale: 1,
        rotation: 0,
        background:
          'radial-gradient(circle at 35% 35%, #fff9e6 0%, #FCD34D 40%, rgba(252,180,50,0.6) 70%, rgba(252,140,40,0.25) 100%)',
        boxShadow:
          '0 0 80px rgba(252,211,77,0.8), 0 0 160px rgba(252,211,77,0.35), 0 0 220px rgba(252,180,50,0.2)',
        duration: 3,
        ease: 'none',
      }, 7);

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
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at 35% 35%, #e8e8e0 0%, #c8c8b8 25%, #a0a090 50%, #787868 75%, #505040 100%)',
          boxShadow:
            '0 0 40px rgba(200,220,255,0.4), 0 0 80px rgba(150,180,255,0.2), 0 0 120px rgba(100,140,255,0.1)',
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
          height: '100vh',
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/Studenzbit_1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
          }}
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '2.5rem',
            zIndex: 2,
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 400,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            color: 'rgba(255,255,255,0.5)',
            border: 'none',
            background: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
        >
          ← Portfolio
        </a>

        <div
          style={{
            position: 'absolute',
            top: '5rem',
            left: '2.5rem',
            zIndex: 3,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            TECHNICAL DEEP DIVE · 2024
          </p>
          <p
            style={{
              margin: '0.45rem 0 0 0',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Web · Affiliate · SEO · Content
          </p>
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
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
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
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              color: '#fff',
              lineHeight: 0.95,
            }}
          >
            unknown
          </span>
        </div>

        <p
          style={{
            position: 'absolute',
            bottom: '4rem',
            right: '2.5rem',
            margin: 0,
            maxWidth: '280px',
            textAlign: 'right',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: '0.85rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.65)',
            zIndex: 3,
          }}
        >
          A survival guide for international students landing in Canada
        </p>

        <button
          type="button"
          onClick={() => window.open('https://studenzbit.com', '_blank')}
          style={{
            position: 'absolute',
            bottom: '8.2rem',
            right: '2.5rem',
            zIndex: 3,
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '0.85rem 2rem',
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 24px rgba(0,0,0,0.2)',
            color: '#fff',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 400,
            fontSize: '0.82rem',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
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
