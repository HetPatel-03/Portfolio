import { useState } from 'react';
import { Mail, Linkedin, Github, Twitter, MapPin } from 'lucide-react';

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
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Brampton, ON · open to relocation',
      href: null
    }
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
              Have something worth building?
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
            className="rounded-[20px] p-8"
            style={{
              background: 'rgba(44, 43, 48, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(240, 237, 232, 0.08)',
              borderTop: '2px solid rgba(245, 143, 124, 0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-2 gap-4">
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
                      background: 'rgba(44, 43, 48, 0.6)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--coral)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
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
                      background: 'rgba(44, 43, 48, 0.6)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--coral)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
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
                    background: 'rgba(44, 43, 48, 0.6)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--coral)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
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
                    background: 'rgba(44, 43, 48, 0.6)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--coral)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-full transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: 'var(--coral)',
                  color: 'var(--bg-primary)',
                  fontFamily: 'var(--font-body)',
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
            <h3 
              className="text-2xl mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}
            >
              Or say hi directly
            </h3>

            <div className="space-y-3">
              {contactMethods.map((method) => {
                const Component = method.href ? 'a' : 'div';
                const Icon = method.icon;
                
                return (
                  <Component
                    key={method.label}
                    {...(method.href ? { href: method.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:border-[var(--coral)]"
                    style={{
                      background: 'rgba(44, 43, 48, 0.7)',
                      border: '1px solid rgba(240, 237, 232, 0.08)',
                      cursor: method.href ? 'pointer' : 'default'
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(245, 143, 124, 0.1)',
                        border: '1px solid rgba(245, 143, 124, 0.2)'
                      }}
                    >
                      <Icon size={20} style={{ color: 'var(--coral)' }} />
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
        </div>
      </div>
    </section>
  );
}
