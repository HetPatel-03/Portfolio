import { useState } from 'react';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

function XLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hetppatel.cs@gmail.com',
      href: 'mailto:hetppatel.cs@gmail.com'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/hetpatel',
      href: 'https://linkedin.com/in/hetpatel'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@hetpatel',
      href: 'https://github.com/hetpatel'
    },
    {
      icon: Twitter,
      label: 'X',
      value: '@hetpatel',
      href: 'https://twitter.com/hetpatel'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/hetpatel', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/hetpatel', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/hetpatel', label: 'X' },
  ];

  return (
    <section id="connect" className="section-bg-connect relative py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p 
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
            >
              // 08 · connect
            </p>
            <h2 
              className="text-[52px]"
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-1px'
              }}
            >
              Get In Touch
            </h2>
          </div>
          <p 
            className="text-xs pt-12"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            // replies within 24h
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div
            className="rounded-[20px] p-10"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(12px) saturate(120%)',
              WebkitBackdropFilter: 'blur(12px) saturate(120%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              borderRadius: '20px',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label 
                    className="block text-sm mb-2"
                    style={{ 
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#F0EDE8',
                      fontFamily: 'DM Sans',
                      fontSize: '14px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(242,102,74,0.4)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm mb-2"
                    style={{ 
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#F0EDE8',
                      fontFamily: 'DM Sans',
                      fontSize: '14px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(242,102,74,0.4)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ 
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: '#F0EDE8',
                    fontFamily: 'DM Sans',
                    fontSize: '14px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(242,102,74,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {/* Message */}
              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ 
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: '#F0EDE8',
                    fontFamily: 'DM Sans',
                    fontSize: '14px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(242,102,74,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-full transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: '#F2664A',
                  color: '#0C0C10',
                  fontFamily: 'DM Sans',
                  fontWeight: 500
                }}
              >
                Send message ✈
              </button>

              {/* Footer Note */}
              <p 
                className="text-[11px] text-center mt-2"
                style={{
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                // form is not wired to a backend — portfolio demo
              </p>
            </form>
          </div>

          {/* Contact Methods */}
          <div>
            <div
              className="rounded-[20px] p-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px) saturate(120%)',
                WebkitBackdropFilter: 'blur(12px) saturate(120%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                borderRadius: '20px',
              }}
            >
              <h3 
                className="text-2xl mb-6"
                style={{
                  fontFamily: 'Clash Display, sans-serif',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}
              >
                Or say hi directly
              </h3>

              <div className="space-y-3">
                {contactMethods.map((method) => {
                  const Component = 'a';
                  const Icon = method.icon;
                  
                  return (
                    <Component
                      key={method.label}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:border-[var(--coral)]"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'rgba(242,102,74,0.12)',
                          border: '1px solid rgba(242,102,74,0.28)'
                        }}
                      >
                        {method.label === 'X' ? (
                          <XLogoIcon />
                        ) : (
                          <Icon size={20} style={{ color: 'var(--coral)' }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div 
                          className="text-xs mb-1"
                          style={{
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-body)'
                          }}
                        >
                          {method.label}
                        </div>
                        <div 
                          className="text-sm truncate"
                          style={{
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500
                          }}
                        >
                          {method.value}
                        </div>
                      </div>
                    </Component>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.open('/Resume.pdf', '_blank')}
              className="w-full mt-4"
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(161,230,206,0.12)',
                border: '1px solid rgba(161,230,206,0.35)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#A1E6CE',
                fontFamily: 'JetBrains Mono',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(161,230,206,0.2)';
                e.currentTarget.style.borderColor = 'rgba(161,230,206,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(161,230,206,0.12)';
                e.currentTarget.style.borderColor = 'rgba(161,230,206,0.35)';
              }}
            >
              ↓ Download Resume
            </button>
          </div>
        </div>

        <div className="w-full mt-[60px] flex flex-col md:flex-row items-stretch gap-6">
          <div
            style={{ flex: '0 0 60%', height: '480px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}
            className="w-full md:w-auto h-[280px] md:h-[480px]"
          >
            <img
              src="/Map.png"
              alt="GTA Map"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center bottom',
                opacity: 0.85,
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(40px, 7vw, 100px)',
                color: 'rgba(255,255,255,0.12)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.2em',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 2,
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              TORONTO
            </div>
            <div
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, #0C0C10, transparent)', pointerEvents: 'none', zIndex: 1 }}
            />
            <div
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, #0C0C10, transparent)', pointerEvents: 'none', zIndex: 1 }}
            />
            <div
              style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, #0C0C10, transparent)', pointerEvents: 'none', zIndex: 1 }}
            />
            <div
              style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, #0C0C10, transparent)', pointerEvents: 'none', zIndex: 1 }}
            />

            <div className="absolute" style={{ left: '22%', top: '45%', transform: 'translate(-50%, -50%)', zIndex: 3 }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(242,102,74,0.25)',
                  border: '1.5px solid #F2664A',
                  position: 'relative',
                  animation: 'connectPinPulse 2s infinite',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    background: '#F2664A',
                    borderRadius: '50%',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '-60px',
                  transform: 'translateX(-50%)',
                  background: 'rgba(12,12,16,0.85)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(242,102,74,0.3)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{ color: '#F0EDE8', fontSize: '12px', fontFamily: 'DM Sans' }}>Toronto, ON · GTA</div>
                <div style={{ color: '#A8A8B8', fontSize: '11px', fontFamily: 'DM Sans' }}>Open to On-site &amp; Remote</div>
              </div>
            </div>
          </div>

          <div
            style={{ flex: '0 0 calc(40% - 24px)', height: '480px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}
            className="w-full md:w-auto h-[360px] md:h-[480px]"
          >
            <img
              src="/Footer_Image.png"
              alt="Het Patel - Toronto Waterfront"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
            />
            <div
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to top, rgba(12,12,16,0.92) 0%, transparent 100%)', pointerEvents: 'none' }}
            />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 800, fontSize: '20px', color: '#F0EDE8', marginBottom: '6px' }}>Het Patel</div>
              <div style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#A8A8B8', marginBottom: '10px' }}>Toronto, ON · GTA</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(200,241,53,0.12)', border: '1px solid rgba(200,241,53,0.3)', borderRadius: '999px', padding: '4px 12px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8F135' }} />
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#C8F135' }}>Open to work · 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div style={{ fontFamily: 'Clash Display, sans-serif', fontSize: '14px', color: '#F2664A' }}>
            hetppatel.dev
          </div>
          <div style={{ color: '#A8A8B8', fontSize: '12px', fontFamily: 'DM Sans', textAlign: 'center' }}>
            © 2025 Het Patel. Built with React + TypeScript.
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:border-[var(--coral)]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                <Icon size={15} style={{ color: '#F0EDE8' }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
