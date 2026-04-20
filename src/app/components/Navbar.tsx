import { useState, useEffect, useRef } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
          console.log('[Navbar IO]', id, {
            isIntersecting: entry.isIntersecting,
            ratio: entry.intersectionRatio,
          });
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
    const bubbleTargetId = activeSection === 'hero' ? 'about' : activeSection;
    const activeLink = navRefs.current[bubbleTargetId];
    console.log('[Navbar refs]', navRefs.current);
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
  }, [activeSection]);

  useEffect(() => {
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
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
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

  return (
    <nav className="fixed top-5 left-1/2 z-[100] max-w-[calc(100vw-2rem)] w-max -translate-x-1/2 transition-all duration-300">
      <div
        className={`flex items-center gap-8 px-6 py-3 ${
          scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : ''
        }`}
        style={{
          borderRadius: '50px',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow:
            '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2"
        >
          <span
            className="text-lg tracking-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              color: 'var(--coral)',
            }}
          >
            hetppatel.dev
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
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
          {navLinks.map((item) => {
            const isActive =
              activeSection === item.id || (activeSection === 'hero' && item.id === 'about');
            return (
              <button
                key={item.id}
                type="button"
                ref={(el) => {
                  navRefs.current[item.id] = el;
                }}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  color: isActive ? '#F0EDE8' : '#A8A8B8',
                  transition: 'color 0.3s ease',
                  fontFamily: 'var(--font-body)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

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
