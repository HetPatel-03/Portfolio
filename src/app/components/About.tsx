const stats = [
  {
    number: '3+ Years',
    label: 'BUILDING & SHIPPING REAL PRODUCTS',
    variant: 'coral' as const,
  },
  {
    number: 'Top 150',
    label: 'WIRELESS SALES · STAPLES CANADA',
    variant: 'blue' as const,
  },
  {
    number: 'Full Stack',
    label: 'FRONTEND · BACKEND · DATABASE · DEVOPS',
    variant: 'lime' as const,
  },
  {
    number: 'Harvard',
    label: 'CERTIFIED · CS50X & CS50W',
    variant: 'violet' as const,
  },
];

export function About() {

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
    <section id="about" className="section-bg-about relative overflow-hidden py-32 px-8">
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Clash Display', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(200px, 35vw, 420px)',
          color: 'rgba(255,255,255,0.022)',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.04em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        {`>_`}
      </div>
      <div className="max-w-7xl mx-auto relative z-[1]">
        <div className="relative z-[1] flex flex-col gap-12 lg:flex-row lg:gap-16 lg:items-start">
          {/* Left column — 55% */}
          <div className="relative z-[1] w-full min-w-0 lg:w-[55%] lg:shrink-0">
            {/* Section Tag */}
            <p
              className="text-xs mb-4"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--coral)',
              }}
            >
              // 01 · about
            </p>

            {/* Heading */}
            <h2
              data-about-reveal
              className="mb-8"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-1px',
                fontSize: 'clamp(20px, 2.5vw, 32px)',
                opacity: 0,
                transform: 'translateX(-40px)',
              }}
            >
              Software Engineer. Problem Solver. Product Minded.
            </h2>

            <p
              data-about-reveal
              className="text-xl mb-8"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: '#D0D0E0',
                opacity: 0,
                transform: 'translateX(-40px)',
              }}
            >
              Full Stack Engineer who builds products people actually use.
            </p>

            <div className="relative z-[1] mb-10 space-y-6">
              {[
                "Throughout my software development journey, I've shown a strong commitment to innovation and creative problem-solving — from building live platforms to integrating real APIs used by real users.",
                'My analytical approach helps me break down complex challenges quickly. I thrive in fast-moving environments where shipping matters and business impact is the goal.',
                'I build full-stack applications end-to-end — designing REST APIs, structuring database schemas, and deploying to cloud infrastructure. Every project I ship is live, documented, and built with real users in mind.',
              ].map((text, index) => (
                <p
                  data-about-line
                  key={index}
                  className="flex gap-3 text-[15px] leading-relaxed"
                  style={{
                    color: '#A8A8B8',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.8,
                    opacity: 0,
                    transform: 'translateY(40px)',
                  }}
                >
                  <span style={{ color: '#F2664A' }}>→</span>
                  <span>{text}</span>
                </p>
              ))}
            </div>

            {/* CTAs */}
            <div
              data-about-reveal
              className="relative z-[1] flex flex-wrap gap-4"
              style={{ opacity: 0, transform: 'translateX(-40px)' }}
            >
              <button
                type="button"
                onClick={() => scrollToSection('connect')}
                className="px-6 py-3 transition-all duration-200 hover:scale-105"
                style={{
                  background: '#F2664A',
                  color: 'var(--bg-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  borderRadius: '50px',
                  border: 'none',
                }}
              >
                Contact Me
              </button>
              <button
                type="button"
                className="px-6 py-3 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F0EDE8',
                  fontFamily: 'var(--font-body)',
                  borderRadius: '50px',
                }}
              >
                View Resume
              </button>
            </div>
          </div>

          {/* Right column — 45% */}
          <div className="relative z-[1] w-full min-w-0 lg:w-[45%] lg:shrink-0">
            {/* Terminal card */}
            <div
              data-about-terminal
              className="relative z-[1]"
              style={{
                background: 'rgba(20, 20, 28, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                marginBottom: '16px',
                opacity: 0,
                transform: 'translateY(60px)',
              }}
            >
              <div
                className="relative z-[1]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '16px',
                }}
              >
                <div
                  className="relative z-[1]"
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#FF5F57',
                  }}
                />
                <div
                  className="relative z-[1]"
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#FEBC2E',
                  }}
                />
                <div
                  className="relative z-[1]"
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#28C840',
                  }}
                />
                <span
                  style={{
                    marginLeft: '8px',
                    color: 'rgba(240,237,232,0.4)',
                    fontSize: '11px',
                  }}
                >
                  het@portfolio ~ %
                </span>
              </div>
              <div className="relative z-[1]" style={{ lineHeight: '1.8' }}>
                <div className="relative z-[1]">
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>name </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> &quot;Het Patel&quot;</span>
                </div>
                <div className="relative z-[1]">
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>role </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> &quot;Full Stack Engineer&quot;</span>
                </div>
                <div className="relative z-[1]">
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>location </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> &quot;Brampton, ON 🍁&quot;</span>
                </div>
                <div className="relative z-[1]">
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>stack </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> [&quot;React&quot;,&quot;Node&quot;,&quot;TypeScript&quot;]</span>
                </div>
                <div className="relative z-[1]">
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>status </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> &quot;Available 2026 ✅&quot;</span>
                </div>
                <div className="relative z-[1]" style={{ marginTop: '8px' }}>
                  <span style={{ color: 'rgba(240,237,232,0.4)' }}>
                    // trilingual: English · Hindi · Gujarati
                  </span>
                </div>
                <div className="relative z-[1]">
                  <span style={{ color: 'rgba(240,237,232,0.4)' }}>
                    // top 150 canada · top 3 GTA
                  </span>
                </div>
                <div className="relative z-[1]" style={{ marginTop: '4px' }}>
                  <span style={{ color: '#F2664A' }}>█</span>
                </div>
              </div>
            </div>

            {/* Stat cards 2×2 */}
            <div className="relative z-[1] grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  data-about-stat
                  key={index}
                  className={`about-stat-card about-stat-card--${stat.variant} relative z-[1]`}
                  style={{ opacity: 0, transform: 'translateY(60px)' }}
                >
                  <div className="about-stat-number relative z-[1]">{stat.number}</div>
                  <div className="about-stat-label relative z-[1]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
