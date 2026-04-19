import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const cycleWords = ['Builder.', 'Engineer.', 'Problem Solver.', 'Maker.'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const techIcons = [
    { name: 'React', color: '#61DAFB', position: { top: '15%', left: '10%' }, duration: 4 },
    { name: 'Node.js', color: '#68A063', position: { bottom: '25%', left: '5%' }, duration: 5 },
    { name: 'Python', color: '#3776AB', position: { top: '10%', right: '15%' }, duration: 6 },
    { name: 'TypeScript', color: '#3178C6', position: { top: '40%', right: '10%' }, duration: 4.5 },
    { name: 'Git', color: '#F05032', position: { bottom: '20%', right: '8%' }, duration: 5.5 },
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 65% 50%, rgba(245,143,124,0.06) 0%, transparent 50%)'
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div className="relative z-10">
            {/* Availability badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(44, 43, 48, 0.7)',
                border: '1px solid rgba(240, 237, 232, 0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--sage-green)' }} />
              <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                Available for opportunities · Summer 2026
              </span>
            </div>

            {/* Watermark */}
            <div 
              className="absolute -left-8 top-32 pointer-events-none select-none"
              style={{
                fontSize: '280px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'rgba(240, 237, 232, 0.02)',
                lineHeight: 1,
                zIndex: -1
              }}
            >
              {'</>'}
            </div>

            {/* Greeting */}
            <p 
              className="text-[22px] mb-2"
              style={{ 
                color: 'rgba(240, 237, 232, 0.4)', 
                fontFamily: 'var(--font-body)',
                fontWeight: 400
              }}
            >
              Hi, I'm
            </p>

            {/* Name */}
            <h1 
              className="mb-4"
              style={{
                fontSize: '96px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-3px',
                lineHeight: 0.95
              }}
            >
              Het Patel.
            </h1>

            {/* Cycling text */}
            <div className="h-[100px] flex items-start mb-6 relative overflow-hidden">
              {cycleWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === cycleIndex ? 1 : 0,
                    y: index === cycleIndex ? 0 : 20
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute"
                  style={{
                    fontSize: '72px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    color: 'var(--coral)',
                    letterSpacing: '-2px'
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Description */}
            <p 
              className="text-base mb-8 max-w-xl"
              style={{ 
                color: 'var(--text-muted)', 
                fontFamily: 'var(--font-body)' 
              }}
            >
              I build end-to-end products. Engineer. Product thinker. Top performer.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => scrollToSection('connect')}
                className="px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--coral)',
                  color: 'var(--bg-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  height: '48px'
                }}
              >
                Contact Me →
              </button>
              <button
                onClick={() => scrollToSection('work')}
                className="px-6 py-3 rounded-full transition-all duration-200 hover:border-[var(--coral)]"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(240, 237, 232, 0.15)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  height: '48px'
                }}
              >
                Explore My Work
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
                  className="w-[38px] h-[38px] rounded-lg flex items-center justify-center transition-all duration-200 hover:border-[var(--coral)]"
                  style={{
                    background: 'rgba(44, 43, 48, 0.7)',
                    border: '1px solid rgba(240, 237, 232, 0.08)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--text-primary)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Character & Tech Icons */}
          <div className="relative h-[600px] flex items-end justify-center">
            {/* Developer visual card */}
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-[340px] rounded-[24px] overflow-hidden"
                style={{
                  background: 'rgba(44, 43, 48, 0.8)',
                  border: '1px solid rgba(240, 237, 232, 0.1)',
                  borderTop: '2px solid rgba(245, 143, 124, 0.4)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(245,143,124,0.08)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Terminal header */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ borderBottom: '1px solid rgba(240,237,232,0.06)' }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#28CA41' }} />
                  <span className="ml-2 text-[11px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    het@portfolio ~ %
                  </span>
                </div>
                {/* Terminal body */}
                <div className="p-6 space-y-3">
                  {[
                    { label: 'name', value: '"Het Patel"', color: '#F2C4CE' },
                    { label: 'role', value: '"Full Stack Engineer"', color: '#F58F7C' },
                    { label: 'location', value: '"Brampton, ON 🍁"', color: '#A8C5A0' },
                    { label: 'stack', value: '["React","Node","TypeScript"]', color: '#61DAFB' },
                    { label: 'status', value: '"Available 2026 ✅"', color: '#A8C5A0' },
                  ].map((line, i) => (
                    <div key={i} className="flex gap-2 text-[13px]" style={{ fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>const</span>
                      <span style={{ color: '#F58F7C' }}>{line.label}</span>
                      <span style={{ color: 'var(--text-muted)' }}>=</span>
                      <span style={{ color: line.color }}>{line.value}</span>
                    </div>
                  ))}
                  <div className="flex gap-2 text-[13px] mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--coral)', opacity: 0.6 }}>▋</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Tech Icons */}
            {techIcons.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="absolute w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  ...tech.position,
                  background: 'rgba(28, 27, 31, 0.9)',
                  border: '1px solid rgba(240, 237, 232, 0.1)',
                  boxShadow: `0 0 20px ${tech.color}40`
                }}
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: tech.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              >
                <span style={{ color: tech.color, fontSize: '20px' }}>
                  {tech.name === 'React' && '⚛'}
                  {tech.name === 'Node.js' && '⬢'}
                  {tech.name === 'Python' && '🐍'}
                  {tech.name === 'TypeScript' && 'TS'}
                  {tech.name === 'Git' && '⎇'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div 
        className="absolute bottom-0 left-0 right-0 py-8 border-t"
        style={{ borderColor: 'rgba(240, 237, 232, 0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-8">
          {[
            { number: '3+', label: 'Shipped Products' },
            { number: 'Top 150', label: 'Nationally at Rogers' },
            { number: "Dean's List", label: '2023 & 2024' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-[28px] mb-1"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontWeight: 800,
                  color: 'var(--coral)' 
                }}
              >
                {stat.number}
              </div>
              <div 
                className="text-[11px] uppercase tracking-wider"
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
    </section>
  );
}