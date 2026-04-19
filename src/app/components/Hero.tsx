import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import meHero from '../../assets/Me_Hero.png';

export function Hero() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const cycleWords = ['Builder.', 'Engineer.', 'Problem Solver.', 'Maker.'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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

          {/* Right Side - Hero image */}
          <div className="relative h-[600px] w-full">
            <div
              className="hero-image-container"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <img
                src={meHero}
                alt="Het Patel"
                style={{
                  height: '90%',
                  maxHeight: '600px',
                  width: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                  filter: 'drop-shadow(0 0 40px rgba(242,102,74,0.15))',
                  animation: 'heroFloat 3s ease-in-out infinite',
                }}
              />
            </div>
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