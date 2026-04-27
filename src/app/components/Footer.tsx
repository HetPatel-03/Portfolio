import { useRef, useLayoutEffect } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const skylineRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Stack', id: 'stack' },
    { label: 'Connect', id: 'connect' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(skylineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        background: 'var(--bg-primary)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(240,237,232,0.06)',
      }}
    >
      <div
        ref={headingRef}
        style={{
          textAlign: 'center',
          paddingTop: 'clamp(48px, 8vh, 80px)',
          paddingLeft: '24px',
          paddingRight: '24px',
          opacity: 0,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--coral)',
          fontSize: '12px',
          letterSpacing: '0.1em',
          marginBottom: '12px',
        }}>
          // based in
        </p>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: 'clamp(40px, 8vw, 96px)',
          color: 'var(--text-primary)',
          letterSpacing: '-3px',
          lineHeight: 0.95,
          marginBottom: '8px',
        }}>
          TORONTO
        </h2>
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 'clamp(14px, 2vw, 22px)',
          color: 'rgba(240,237,232,0.3)',
          letterSpacing: '0.15em',
        }}>
          BUILDING FOR THE WEB
        </p>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        marginTop: 'clamp(24px, 4vh, 48px)',
        lineHeight: 0,
      }}>
        <img
          ref={skylineRef}
          src="/toronto-skyline.png"
          alt="Toronto skyline"
          style={{
            width: '100%',
            height: 'auto',
            opacity: 0,
            display: 'block',
            filter: 'opacity(0.12)',
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
          pointerEvents: 'none',
        }} />
      </div>

      <div
        ref={contentRef}
        style={{
          borderTop: '1px solid rgba(240,237,232,0.06)',
          padding: 'clamp(20px, 3vh, 28px) clamp(24px, 5vw, 64px)',
          opacity: 0,
        }}
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '16px',
            color: 'var(--coral)',
          }}>
            hetppatel.dev
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', justifyContent: 'center' }}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: '2px 0',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--coral)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {[
              { icon: Github, href: 'https://github.com/HetPatel-03' },
              { icon: Linkedin, href: 'https://linkedin.com/in/hetpatel' },
              { icon: Twitter, href: 'https://twitter.com/hetpatel' },
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
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(242,102,74,0.4)';
                  e.currentTarget.style.color = 'var(--coral)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(240,237,232,0.08)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                <Icon size={15} />
              </a>
            ))}
            <span style={{
              color: 'rgba(240,237,232,0.25)',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              marginLeft: '8px',
            }}>
              © 2026 Het Patel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
