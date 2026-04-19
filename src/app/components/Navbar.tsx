import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Detect active section
      const sections = ['hero', 'about', 'universe', 'work', 'experience', 'education', 'stack', 'location', 'connect'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Stack', id: 'stack' },
    { label: 'Location', id: 'location' },
    { label: 'Connect', id: 'connect' },
  ];

  return (
    <nav 
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : ''
      }`}
      style={{
        background: 'rgba(28, 27, 31, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(240, 237, 232, 0.08)',
        borderRadius: '50px',
      }}
    >
      <div className="flex items-center gap-8 px-6 py-3">
        {/* Logo */}
        <button 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2"
        >
          <span 
            className="text-lg tracking-tight"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800,
              color: 'var(--coral)'
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
              fontFamily: 'var(--font-mono)'
            }}
          >
            v26
          </span>
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
              style={{
                color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-body)'
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <span 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: 'var(--coral)' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Contact Button */}
        <button
          onClick={() => scrollToSection('connect')}
          className="px-5 py-2 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            background: 'var(--coral)',
            color: 'var(--bg-primary)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500
          }}
        >
          Contact →
        </button>
      </div>
    </nav>
  );
}
