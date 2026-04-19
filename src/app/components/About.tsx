export function About() {
  const stats = [
    { number: '3+', label: 'Shipped Products' },
    { number: 'Top 150', label: 'Nationally' },
    { number: 'Top 3', label: 'GTA' },
    { number: "Dean's List", label: 'Algoma University 2023 & 2024' },
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
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:items-start">
          {/* Left column — 55% */}
          <div className="w-full min-w-0 lg:w-[55%] lg:shrink-0">
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
              className="mb-8"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-1px',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
              }}
            >
              Software Engineer. Problem Solver. Product Minded.
            </h2>

            <p
              className="text-xl mb-8"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              Full Stack Engineer who builds products people actually use.
            </p>

            <div className="mb-10 space-y-6">
              {[
                "Throughout my software development journey, I've shown a strong commitment to innovation and creative problem-solving — from building live platforms to integrating real APIs used by real users.",
                'My analytical approach helps me break down complex challenges quickly. I thrive in fast-moving environments where shipping matters and business impact is the goal.',
                "Beyond code — I'm a nationally ranked sales professional. Top 150 in Canada and Top 3 in the GTA at Rogers and Staples, which means I understand business, customers, and commercial impact, not just technical execution.",
              ].map((text, index) => (
                <p
                  key={index}
                  className="flex gap-3 text-[15px] leading-relaxed"
                  style={{
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.8,
                  }}
                >
                  <span style={{ color: '#F2664A' }}>→</span>
                  <span>{text}</span>
                </p>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
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
          <div className="w-full min-w-0 lg:w-[45%] lg:shrink-0">
            {/* Terminal card */}
            <div
              style={{
                background: 'rgba(20, 20, 28, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#FF5F57',
                  }}
                />
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#FEBC2E',
                  }}
                />
                <div
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
              <div style={{ lineHeight: '1.8' }}>
                <div>
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>name </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> &quot;Het Patel&quot;</span>
                </div>
                <div>
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>role </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> &quot;Full Stack Engineer&quot;</span>
                </div>
                <div>
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>location </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> &quot;Brampton, ON 🍁&quot;</span>
                </div>
                <div>
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>stack </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> [&quot;React&quot;,&quot;Node&quot;,&quot;TypeScript&quot;]</span>
                </div>
                <div>
                  <span style={{ color: '#60A5FA' }}>const </span>
                  <span style={{ color: '#F0EDE8' }}>status </span>
                  <span style={{ color: '#F0EDE8' }}>=</span>
                  <span style={{ color: '#C8F135' }}> &quot;Available 2026 ✅&quot;</span>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ color: 'rgba(240,237,232,0.4)' }}>
                    // trilingual: English · Hindi · Gujarati
                  </span>
                </div>
                <div>
                  <span style={{ color: 'rgba(240,237,232,0.4)' }}>
                    // top 150 canada · top 3 GTA
                  </span>
                </div>
                <div style={{ marginTop: '4px' }}>
                  <span style={{ color: '#F2664A' }}>█</span>
                </div>
              </div>
            </div>

            {/* Stat cards 2×2 */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="about-stat-card">
                  <div className="about-stat-number">{stat.number}</div>
                  <div className="about-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
