import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Stack', id: 'stack' },
    { label: 'Location', id: 'location' },
    { label: 'Connect', id: 'connect' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      className="py-12 px-8 border-t"
      style={{ borderColor: 'rgba(240, 237, 232, 0.06)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left - Nav Links */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm transition-colors duration-200 hover:text-[var(--coral)]"
                style={{
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Center - Copyright */}
          <div 
            className="text-sm text-center"
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)'
            }}
          >
            Built by Het Patel · hetppatel.dev · 2026
          </div>

          {/* Right - Social Icons */}
          <div className="flex gap-3">
            {[
              { icon: Github, href: 'https://github.com/hetpatel' },
              { icon: Linkedin, href: 'https://linkedin.com/in/hetpatel' },
              { icon: Twitter, href: 'https://twitter.com/hetpatel' }
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:border-[var(--coral)]"
                style={{
                  background: 'rgba(44, 43, 48, 0.5)',
                  border: '1px solid rgba(240, 237, 232, 0.08)'
                }}
              >
                <Icon size={16} style={{ color: 'var(--text-muted)' }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
