import { Github, Linkedin, Twitter } from 'lucide-react';
import { WarmGlassCard } from './WarmGlassCard';

export function About() {
  const stats = [
    { number: '3+', label: 'Shipped Products' },
    { number: 'Top 150', label: 'Nationally at Rogers & Staples' },
    { number: 'Top 3', label: 'GTA Sales Ranking' },
    { number: "Dean's List", label: 'Algoma University 2023 & 2024' }
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
    <section id="about" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <p 
          className="text-xs mb-4"
          style={{ 
            fontFamily: 'var(--font-mono)', 
            color: 'var(--coral)' 
          }}
        >
          // 01 · about
        </p>

        {/* Heading */}
        <h2 
          className="text-[52px] mb-16"
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-1px'
          }}
        >
          Engineer. Builder. Top Performer.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-3">
            <p 
              className="text-xl mb-8"
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}
            >
              Full Stack Engineer who builds products people actually use.
            </p>

            <div className="space-y-6 mb-10">
              {[
                "Throughout my software development journey, I've shown a strong commitment to innovation and creative problem-solving — from building live platforms to integrating real APIs used by real users.",
                "My analytical approach helps me break down complex challenges quickly. I thrive in fast-moving environments where shipping matters and business impact is the goal.",
                "Beyond code — I'm a nationally ranked sales professional. Top 150 in Canada and Top 3 in the GTA at Rogers and Staples, which means I understand business, customers, and commercial impact, not just technical execution."
              ].map((text, index) => (
                <p 
                  key={index}
                  className="text-[15px] leading-relaxed flex gap-3"
                  style={{ 
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.8
                  }}
                >
                  <span style={{ color: 'var(--coral)' }}>→</span>
                  <span>{text}</span>
                </p>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => scrollToSection('connect')}
                className="px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--coral)',
                  color: 'var(--bg-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500
                }}
              >
                Contact Me
              </button>
              <button
                className="px-6 py-3 rounded-full transition-all duration-200 hover:border-[var(--coral)]"
                style={{
                  background: 'rgba(44, 43, 48, 0.7)',
                  border: '1px solid rgba(240, 237, 232, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                View Resume
              </button>
            </div>

            {/* Social Icons */}
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
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:border-[var(--coral)]"
                  style={{
                    background: 'rgba(44, 43, 48, 0.7)',
                    border: '1px solid rgba(240, 237, 232, 0.08)'
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--text-primary)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderTop: '2px solid var(--coral)'
                  }}
                >
                  <div 
                    className="text-2xl mb-2"
                    style={{ 
                      fontFamily: 'var(--font-heading)', 
                      fontWeight: 800,
                      color: 'var(--coral)'
                    }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-xs leading-tight"
                    style={{ 
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
