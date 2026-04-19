export function Education() {
  const certifications = [
    {
      name: 'Harvard CS50x',
      issuer: 'Harvard University',
      icon: '🎓'
    },
    {
      name: 'Harvard CS50 Web',
      issuer: 'Harvard University',
      icon: '🌐'
    },
    {
      name: 'Microsoft 365',
      issuer: 'Microsoft',
      icon: '💼'
    }
  ];

  return (
    <section id="education" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <p 
          className="text-xs mb-4"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
        >
          // 05 · education
        </p>

        <h2 
          className="text-[52px] mb-12"
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-1px'
          }}
        >
          Academic Foundation.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Algoma University Card */}
          <div
            className="rounded-[20px] p-8"
            style={{
              background: 'rgba(44, 43, 48, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(240, 237, 232, 0.08)',
              borderTop: '2px solid rgba(245, 143, 124, 0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            {/* University Logo Placeholder */}
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{
                background: 'linear-gradient(135deg, #F58F7C, #F2C4CE)',
              }}
            >
              <span className="text-3xl">🎓</span>
            </div>

            <h3 
              className="text-2xl mb-2"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }}
            >
              Algoma University
            </h3>

            <p 
              className="text-base mb-3"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500
              }}
            >
              Bachelor of Computer Science
            </p>

            <p 
              className="text-sm mb-6"
              style={{
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              Sept 2021 – Dec 2025
            </p>

            {/* Dean's List Badges */}
            <div className="flex gap-2 mb-4">
              {['2023', '2024'].map((year) => (
                <div
                  key={year}
                  className="px-3 py-1.5 rounded-lg"
                  style={{
                    background: 'rgba(168, 197, 160, 0.15)',
                    border: '1px solid rgba(168, 197, 160, 0.3)',
                    color: 'var(--sage-green)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  Dean's List {year}
                </div>
              ))}
            </div>

            {/* GPA */}
            <div className="flex items-baseline gap-2">
              <span 
                className="text-3xl"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: 'var(--coral)'
                }}
              >
                3.1
              </span>
              <span 
                className="text-sm"
                style={{
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                / 4.0 GPA
              </span>
            </div>
          </div>

          {/* Certifications Card */}
          <div
            className="rounded-[20px] p-8"
            style={{
              background: 'rgba(44, 43, 48, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(240, 237, 232, 0.08)',
              borderTop: '2px solid rgba(245, 143, 124, 0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <h3 
              className="text-2xl mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }}
            >
              Certifications
            </h3>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl transition-all duration-200 hover:translate-x-1"
                  style={{
                    background: 'rgba(58, 57, 62, 0.5)',
                    border: '1px solid rgba(240, 237, 232, 0.06)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(245, 143, 124, 0.1)',
                        border: '1px solid rgba(245, 143, 124, 0.2)'
                      }}
                    >
                      <span className="text-lg">{cert.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="text-base mb-1"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {cert.name}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        {cert.issuer}
                      </p>
                    </div>
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
