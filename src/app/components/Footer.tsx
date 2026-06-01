import React, { useRef, useLayoutEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const [isMobile, setIsMobile] = React.useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const skylineRef = useRef<HTMLImageElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Stack', id: 'stack' },
    { label: 'Connect', id: 'connect' },
  ];

  const XIcon = ({ size = 15 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const scrollConfig = {
        trigger: footerRef.current,
        toggleActions: 'play none none none',
      };

      gsap.from(portraitRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { ...scrollConfig, start: 'top 85%' },
      });

      gsap.from(rightColRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { ...scrollConfig, start: 'top 80%' },
      });

      gsap.from(skylineRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.4,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { ...scrollConfig, start: 'top 70%' },
      });

      gsap.from(bottomBarRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { ...scrollConfig, start: 'top 60%' },
      });

      ScrollTrigger.refresh();
    }, footerRef);

    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        background: 'var(--bg-primary)',
        overflow: 'hidden',
        paddingTop: 'clamp(48px, 8vh, 80px)',
        paddingLeft: 'clamp(24px, 5vw, 64px)',
        paddingRight: 'clamp(24px, 5vw, 64px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
        }}
      >
        <div style={{ flex: isMobile ? '1 1 100%' : '0 0 40%', width: isMobile ? '100%' : undefined, display: 'flex', alignItems: 'flex-end', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <img
            ref={portraitRef}
            src="/sketch-potrait.PNG"
            alt="Het Patel sketch portrait"
            loading="lazy"
            decoding="async"
            style={{
              height: 'clamp(280px, 35vh, 420px)',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              objectPosition: isMobile ? 'bottom center' : 'bottom left',
              display: 'block',
              mixBlendMode: 'luminosity',
              filter: 'drop-shadow(0 20px 40px rgba(242,102,74,0.15))',
            }}
          />
        </div>

        <div
          ref={rightColRef}
          style={{
            flex: isMobile ? '1 1 100%' : '0 0 60%',
            paddingLeft: isMobile ? '0px' : 'clamp(32px, 5vw, 80px)',
            textAlign: isMobile ? 'center' : 'left',
            marginTop: isMobile ? '20px' : '0',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--coral)',
              fontSize: '13px',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            // software engineer
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(48px, 7vw, 96px)',
              color: 'var(--text-primary)',
              letterSpacing: '-3px',
              lineHeight: 0.9,
              marginBottom: '20px',
            }}
          >
            HET PATEL.
          </h2>

          <p style={{ marginBottom: '40px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 'clamp(16px, 2vw, 24px)',
                color: 'rgba(240,237,232,0.6)',
              }}
            >
              Code is versioned
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(16px, 2vw, 24px)',
                color: 'var(--coral)',
                marginLeft: '8px',
                marginRight: '8px',
              }}
            >
              ∞
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 'clamp(16px, 2vw, 24px)',
                color: 'rgba(240,237,232,0.6)',
              }}
            >
              Impact is forever
            </span>
          </p>

          <button
            onClick={() => scrollToSection('connect')}
            style={{
              background: 'var(--coral)',
              color: 'var(--bg-primary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              padding: '12px 28px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              width: 'fit-content',
              transition: 'opacity 0.2s ease',
              margin: isMobile ? '0 auto' : '0',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Let&apos;s Connect →
          </button>
        </div>
      </div>

      <img
        ref={skylineRef}
        src="/toronto-skyline3.png"
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          marginTop: '-60px',
          opacity: 0.13,
          filter: 'invert(1)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={bottomBarRef}
        style={{
          borderTop: '1px solid rgba(240,237,232,0.06)',
          padding: '20px clamp(24px, 5vw, 64px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '15px',
            color: 'var(--coral)',
          }}
        >
          hetppatel.dev
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0px 20px', justifyContent: 'center' }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--coral)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {[
            { icon: Github, href: 'https://github.com/HetPatel-03' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/hetppatel' },
            { icon: XIcon, href: 'https://x.com/hetpatel37?s=21' },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(44,43,48,0.5)',
                border: '1px solid rgba(240,237,232,0.08)',
                color: 'var(--text-muted)',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(242,102,74,0.4)';
                e.currentTarget.style.color = 'var(--coral)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(240,237,232,0.08)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <Icon size={15} />
            </a>
          ))}
          <span
            style={{
              color: 'rgba(240,237,232,0.25)',
              fontSize: '12px',
              fontFamily: 'var(--font-body)',
              marginLeft: '12px',
            }}
          >
            © 2026 Het Patel
          </span>
        </div>
      </div>
    </footer>
  );
}
