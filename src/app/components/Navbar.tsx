import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';

const NAV_SECTION_IDS = [
  'about',
  'universe',
  'projects',
  'experience',
  'education',
  'stack',
  'connect',
] as const;

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [bubble, setBubble] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const linkContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Partial<Record<string, HTMLButtonElement>>>({});

  const updateBubblePosition = useCallback(() => {
    const container = linkContainerRef.current;
    const btn = activeSection ? linkRefs.current[activeSection] : null;
    if (!container || !btn || !NAV_SECTION_IDS.includes(activeSection as (typeof NAV_SECTION_IDS)[number])) {
      setBubble((b) => ({ ...b, visible: false }));
      return;
    }

    const cr = container.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    setBubble({
      left: br.left - cr.left - 8,
      top: br.top - cr.top,
      width: br.width + 16,
      height: br.height,
      visible: true,
    });
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ratios = new Map<string, number>();

    const pickActive = () => {
      let bestId = '';
      let bestRatio = 0;
      for (const id of NAV_SECTION_IDS) {
        const r = ratios.get(id) ?? 0;
        if (r >= 0.5 && r > bestRatio) {
          bestRatio = r;
          bestId = id;
        }
      }
      setActiveSection(bestId);
    };

    const observers: IntersectionObserver[] = [];

    for (const id of NAV_SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;

      const obs = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (e) ratios.set(id, e.intersectionRatio);
          pickActive();
        },
        { threshold: THRESHOLDS }
      );

      obs.observe(el);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useLayoutEffect(() => {
    updateBubblePosition();
  }, [updateBubblePosition]);

  useEffect(() => {
    const onResize = () => updateBubblePosition();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateBubblePosition]);

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
        {/* Logo */}
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

        {/* Nav Links */}
        <div ref={linkContainerRef} className="relative flex items-center gap-6">
          <div
            style={{
              position: 'absolute',
              left: bubble.left,
              top: bubble.top,
              width: bubble.visible ? bubble.width : 0,
              height: bubble.visible ? bubble.height : 0,
              opacity: bubble.visible ? 1 : 0,
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '999px',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            aria-hidden
          />
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                ref={(el) => {
                  if (el) linkRefs.current[link.id] = el;
                  else delete linkRefs.current[link.id];
                }}
                onClick={() => scrollToSection(link.id)}
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
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Contact Button */}
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
