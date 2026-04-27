import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';

type CertId = 'cs50x' | 'cs50web' | 'm365';

type Certification = {
  id: CertId;
  name: string;
  issuer: string;
  year: string;
  icon: string;
};

const certItemClass: Record<CertId, string> = {
  cs50x: 'education-cert-item education-cert-item--cs50x education-clickable',
  cs50web: 'education-cert-item education-cert-item--cs50web education-clickable',
  m365: 'education-cert-item education-cert-item--m365 education-clickable',
};

const deanListPillBase = {
  display: 'inline-block' as const,
  borderRadius: '20px',
  padding: '4px 12px',
  fontSize: '12px',
  fontWeight: 500 as const,
  fontFamily: 'var(--font-body)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
};

/** Pastel teal/cyan (2023) and amber/yellow (2024) — front + back consistent */
const deanListPillByYear = {
  '2023': {
    ...deanListPillBase,
    background: 'rgba(95, 180, 172, 0.15)',
    border: '1px solid rgba(95, 180, 172, 0.4)',
    color: '#A8D5CF',
  },
  '2024': {
    ...deanListPillBase,
    background: 'rgba(218, 175, 95, 0.15)',
    border: '1px solid rgba(218, 175, 95, 0.4)',
    color: '#E5D4A8',
  },
} as const;

/** Glass pill — Algoma flip hint (front) and ↩ flip back (back) */
const flipGlassPillStyle = {
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  gap: '8px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '999px',
  padding: '6px 16px',
  color: '#A8A8B8',
  fontSize: '12px',
  fontFamily: 'JetBrains Mono, var(--font-mono)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  transform: 'translateY(0)',
};

function flipGlassPillMouseEnter(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = 'translateY(-2px)';
  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
  e.currentTarget.style.color = '#F0EDE8';
}

function flipGlassPillMouseLeave(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)';
  e.currentTarget.style.color = '#A8A8B8';
}

const courses = [
  { name: 'Data Structures', bg: 'rgba(97,218,251,0.10)', border: 'rgba(97,218,251,0.25)', color: '#61DAFB' },
  { name: 'Algorithms', bg: 'rgba(200,241,53,0.10)', border: 'rgba(200,241,53,0.25)', color: '#C8F135' },
  { name: 'Web Development', bg: 'rgba(242,102,74,0.10)', border: 'rgba(242,102,74,0.25)', color: '#F2664A' },
  { name: 'Operating Systems', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.25)', color: '#A78BFA' },
  { name: 'Database Management', bg: 'rgba(62,207,142,0.10)', border: 'rgba(62,207,142,0.25)', color: '#3ECF8E' },
  { name: 'Software Engineering', bg: 'rgba(251,191,36,0.10)', border: 'rgba(251,191,36,0.25)', color: '#FBBF24' },
  { name: 'Artificial Intelligence', bg: 'rgba(249,168,212,0.10)', border: 'rgba(249,168,212,0.25)', color: '#F9A8D4' },
] as const;

export function Education() {
  const [flipped, setFlipped] = useState(false);
  const [modalCert, setModalCert] = useState<Certification | null>(null);
  const [flipHeight, setFlipHeight] = useState(380);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const front = frontRef.current;
    const back = backRef.current;
    if (!front || !back) return;

    const measure = () => {
      const h = Math.max(380, Math.ceil(front.scrollHeight), Math.ceil(back.scrollHeight));
      setFlipHeight(h);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(front);
    ro.observe(back);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const certifications: Certification[] = [
    {
      id: 'cs50x',
      name: 'Harvard CS50x',
      issuer: 'Harvard University',
      year: '2024',
      icon: '🎓',
    },
    {
      id: 'cs50web',
      name: 'Harvard CS50 Web',
      issuer: 'Harvard University',
      year: '2024',
      icon: '🌐',
    },
    {
      id: 'm365',
      name: 'Microsoft 365',
      issuer: 'Microsoft',
      year: '2023',
      icon: '💼',
    },
  ];

  return (
    <section id="education" className="section-bg-education relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <p
          className="text-xs mb-4"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
        >
          // 05 · education
        </p>

        <h2
          className="text-[clamp(34px,8vw,52px)] mb-10 md:mb-12"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-1px',
          }}
        >
          Academic Foundation.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Algoma University — flip card */}
          <div className="flip-container" style={{ height: flipHeight }}>
            <div
              role="button"
              tabIndex={0}
              className={`flip-card${flipped ? ' flipped' : ''}`}
              onClick={() => setFlipped((f) => !f)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFlipped((f) => !f);
                }
              }}
              aria-expanded={flipped}
              aria-label="Algoma University — click to flip for more details"
            >
              <div ref={frontRef} className="flip-front">
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(200, 241, 53, 0.12)',
                    border: '2px solid rgba(200, 241, 53, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Clash Display, sans-serif',
                    fontWeight: '700',
                    fontSize: '18px',
                    color: '#C8F135',
                    marginBottom: '16px',
                  }}
                >
                  AU
                </div>

                <h3
                  className="text-2xl mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                  }}
                >
                  Algoma University
                </h3>

                <p
                  className="text-base mb-3"
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                  }}
                >
                  Bachelor of Computer Science
                </p>

                <p
                  className="text-sm mb-6"
                  style={{
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Sept 2021 – Dec 2025
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(['2023', '2024'] as const).map((year) => (
                    <div key={year} style={deanListPillByYear[year]}>
                      Dean&apos;s List {year}
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      color: 'var(--coral)',
                    }}
                  >
                    3.1
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    / 4.0 GPA
                  </span>
                </div>

                <span
                  className="mt-6"
                  style={flipGlassPillStyle}
                  onMouseEnter={flipGlassPillMouseEnter}
                  onMouseLeave={flipGlassPillMouseLeave}
                >
                  // Click to flip
                </span>
              </div>

              <div ref={backRef} className="flip-back">
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(200,241,53,0.6)',
                    fontFamily: 'JetBrains Mono, var(--font-mono)',
                    marginBottom: '8px',
                  }}
                >
                  // algoma university · details
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#F0EDE8',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Bachelor of Computer Science
                </div>
                <div style={{ fontSize: '13px', color: '#A8A8B8', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                  Jan 2023 – Dec 2025 · Brampton, ON
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'rgba(200,241,53,0.7)',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Key Courses
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {courses.map((course) => (
                      <span
                        key={course.name}
                        style={{
                          background: course.bg,
                          border: `1px solid ${course.border}`,
                          color: course.color,
                          borderRadius: '20px',
                          padding: '4px 12px',
                          fontSize: '12px',
                          fontFamily: 'DM Sans',
                          fontWeight: '500',
                        }}
                      >
                        {course.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={deanListPillByYear['2023']}>Dean&apos;s List 2023</span>
                  <span style={deanListPillByYear['2024']}>Dean&apos;s List 2024</span>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#C8F135', marginTop: '8px', fontFamily: 'var(--font-heading)' }}>
                  3.1{' '}
                  <span style={{ fontSize: '13px', color: '#A8A8B8', fontWeight: 400, fontFamily: 'var(--font-body)' }}>/ 4.0 GPA</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlipped(false);
                  }}
                  style={{
                    ...flipGlassPillStyle,
                    display: 'flex',
                    marginTop: 'auto',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={flipGlassPillMouseEnter}
                  onMouseLeave={flipGlassPillMouseLeave}
                >
                  ↩ flip back
                </button>
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="education-liquid-card p-6 md:p-8">
            <h3
              className="text-2xl mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)',
              }}
            >
              Certifications
            </h3>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  role="button"
                  tabIndex={0}
                  className={certItemClass[cert.id]}
                  onClick={() => setModalCert(cert)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setModalCert(cert);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(245, 143, 124, 0.1)',
                        border: '1px solid rgba(245, 143, 124, 0.2)',
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
                          color: 'var(--text-primary)',
                        }}
                      >
                        {cert.name}
                      </h4>
                      <p
                        className="text-sm"
                        style={{
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-body)',
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

      {modalCert && (
        <div
          className="education-cert-modal-overlay"
          role="presentation"
          onClick={() => setModalCert(null)}
        >
          <div
            className="education-cert-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="education-cert-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-lg text-lg leading-none transition-colors hover:bg-white/10"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              onClick={() => setModalCert(null)}
              aria-label="Close certificate details"
            >
              ×
            </button>

            <h2
              id="education-cert-modal-title"
              className="text-2xl pr-10 mb-3"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--text-primary)',
              }}
            >
              {modalCert.name}
            </h2>

            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Issuer: </span>
              {modalCert.issuer}
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Year completed: </span>
              {modalCert.year}
            </p>

            <p
              className="text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(158, 156, 154, 0.75)',
              }}
            >
              // certificate image coming soon
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
