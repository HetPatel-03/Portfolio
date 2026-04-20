import { useState } from 'react';

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

export function Education() {
  const [algExpanded, setAlgExpanded] = useState(false);
  const [modalCert, setModalCert] = useState<Certification | null>(null);

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
            letterSpacing: '-1px',
          }}
        >
          Academic Foundation.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Algoma University Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setAlgExpanded((e) => !e)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setAlgExpanded((v) => !v);
              }
            }}
            className="education-liquid-card education-clickable p-8"
            aria-expanded={algExpanded}
          >
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
              {['2023', '2024'].map((year) => (
                <div key={year} className="education-deans-pill font-medium" style={{ fontFamily: 'var(--font-body)' }}>
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

            {algExpanded && (
              <div
                className="mt-6 pt-6 space-y-3 text-sm"
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <p>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Key courses: </span>
                  Data Structures, Web Development, Operating Systems, Algorithms, Database Management
                </p>
                <p>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Activities: </span>
                  Dean&apos;s List 2023 & 2024
                </p>
                <p>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Location: </span>
                  Sault Ste. Marie, ON
                </p>
              </div>
            )}

            {!algExpanded && (
              <p
                className="mt-6 text-xs"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(158, 156, 154, 0.75)',
                }}
              >
                // click to see more
              </p>
            )}
          </div>

          {/* Certifications Card */}
          <div className="education-liquid-card p-8">
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
