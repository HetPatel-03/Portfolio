import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MOBILE_BREAKPOINT = 768;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [bubbleStyle, setBubbleStyle] = useState({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
    opacity: 0,
  });

  const navRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobile && menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, isMobile]);

  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'universe',
      'projects',
      'experience',
      'education',
      'stack',
      'connect',
    ];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.15, rootMargin: '-10% 0px -10% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const bubbleTargetId = activeSection === 'hero' ? 'about' : activeSection;
    const activeLink = navRefs.current[bubbleTargetId];
    if (!activeLink) {
      setBubbleStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const parentRect = activeLink.closest('.nav-links-container')?.getBoundingClientRect();
    const rect = activeLink.getBoundingClientRect();
    if (!parentRect) return;
    setBubbleStyle({
      left: rect.left - parentRect.left - 10,
      width: rect.width + 20,
      top: rect.top - parentRect.top - 6,
      height: rect.height + 12,
      opacity: 1,
    });
  }, [activeSection, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const onResize = () => {
      const bubbleTargetId = activeSection === 'hero' ? 'about' : activeSection;
      const activeLink = navRefs.current[bubbleTargetId];
      if (!activeLink) return;
      const parentRect = activeLink.closest('.nav-links-container')?.getBoundingClientRect();
      const rect = activeLink.getBoundingClientRect();
      if (!parentRect) return;
      setBubbleStyle({
        left: rect.left - parentRect.left - 10,
        width: rect.width + 20,
        top: rect.top - parentRect.top - 6,
        height: rect.height + 12,
        opacity: 1,
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeSection, isMobile]);

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (!element) return;
    ScrollTrigger.refresh();
    const y = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top: Math.max(0, y),
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Universe', id: 'universe' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Stack', id: 'stack' },
    { label: 'Connect', id: 'connect' },
  ];

  const glassStyle = {
    borderRadius: isMobile ? '20px' : '50px',
    overflow: 'hidden' as const,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: scrolled
      ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  };

  const logoButton = (
    <button
      type="button"
      onClick={() => scrollToSection('hero')}
      className="flex items-center gap-2 min-w-0"
    >
      <span
        className={`${isMobile ? 'text-base' : 'text-lg'} tracking-tight truncate`}
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          color: 'var(--coral)',
        }}
      >
        hetppatel.dev
      </span>
      <span
        className="text-xs px-2 py-0.5 rounded-full shrink-0"
        style={{
          background: 'rgba(44, 43, 48, 0.7)',
          border: '1px solid rgba(240, 237, 232, 0.08)',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        v26
      </span>
    </button>
  );

  const navLinkButton = (item: (typeof navLinks)[0], stacked = false) => {
    const isActive =
      activeSection === item.id || (activeSection === 'hero' && item.id === 'about');
    return (
      <button
        key={item.id}
        type="button"
        ref={(el) => {
          if (!stacked) navRefs.current[item.id] = el;
        }}
        onClick={() => scrollToSection(item.id)}
        className={stacked ? 'w-full text-left py-3 text-base' : 'relative text-sm'}
        style={{
          position: 'relative',
          zIndex: 1,
          color: isActive ? '#F0EDE8' : '#A8A8B8',
          transition: 'color 0.3s ease',
          fontFamily: 'var(--font-body)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: stacked ? undefined : 0,
          borderBottom: stacked ? '1px solid rgba(255,255,255,0.06)' : undefined,
        }}
      >
        {item.label}
      </button>
    );
  };

  if (isMobile) {
    return (
      <nav className="fixed top-5 left-4 right-4 z-[100] max-w-full">
        <div className="w-full" style={glassStyle}>
          <div className="flex items-center justify-between gap-3 px-4 py-2.5">
            {logoButton}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#F0EDE8',
                fontSize: '20px',
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

          {menuOpen ? (
            <div
              className="w-full px-4 pb-4"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {navLinks.map((item) => navLinkButton(item, true))}
              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block w-full py-3 text-base"
                style={{
                  color: '#C8F135',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                resume
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('connect')}
                className="mt-4 w-full rounded-full px-5 py-2.5 text-sm"
                style={{
                  background: 'var(--coral)',
                  color: 'var(--bg-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Contact →
              </button>
            </div>
          ) : null}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-5 left-1/2 z-[100] max-w-[calc(100vw-2rem)] w-max -translate-x-1/2 transition-all duration-300">
      <div
        className={`flex items-center gap-8 px-6 py-3 ${scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : ''}`}
        style={glassStyle}
      >
        {logoButton}

        <div className="nav-links-container relative flex items-center gap-6">
          <div
            style={{
              position: 'absolute',
              background: 'rgba(255,255,255,0.09)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '999px',
              transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
              pointerEvents: 'none',
              zIndex: 0,
              left: bubbleStyle.left,
              width: bubbleStyle.width,
              top: bubbleStyle.top,
              height: bubbleStyle.height,
              opacity: bubbleStyle.opacity,
            }}
            aria-hidden
          />
          {navLinks.map((item) => navLinkButton(item))}
        </div>

        <a
          href="/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 whitespace-nowrap"
          style={{
            color: '#C8F135',
            fontFamily: 'inherit',
            fontSize: '13px',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            border: '1px solid rgba(200, 241, 53, 0.4)',
            padding: '6px 16px',
            borderRadius: '20px',
            background: 'rgba(200, 241, 53, 0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(200, 241, 53, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(200, 241, 53, 0.08)';
          }}
        >
          resume
        </a>

        <button
          type="button"
          onClick={() => scrollToSection('connect')}
          className="px-5 py-2 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            background: 'var(--coral)',
            color: 'var(--bg-primary)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
          }}
        >
          Contact →
        </button>
      </div>
    </nav>
  );
}
