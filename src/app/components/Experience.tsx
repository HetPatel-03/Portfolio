import { getTechTagPillStyle } from '../lib/techTagPill';

const experienceCardAccent: Record<
  string,
  { left: string; roleBadge: { background: string; border: string; color: string } }
> = {
  'Rogers Communications': {
    left: '#F2664A',
    roleBadge: {
      background: 'rgba(242,102,74,0.12)',
      border: '1px solid rgba(242,102,74,0.3)',
      color: '#F2664A',
    },
  },
  Freelance: {
    left: '#C8F135',
    roleBadge: {
      background: 'rgba(200,241,53,0.12)',
      border: '1px solid rgba(200,241,53,0.3)',
      color: '#C8F135',
    },
  },
  'Staples Canada ULC': {
    left: '#60A5FA',
    roleBadge: {
      background: 'rgba(96,165,250,0.12)',
      border: '1px solid rgba(96,165,250,0.3)',
      color: '#60A5FA',
    },
  },
  'Walmart Canada': {
    left: '#FBBF24',
    roleBadge: {
      background: 'rgba(251,191,36,0.12)',
      border: '1px solid rgba(251,191,36,0.3)',
      color: '#FBBF24',
    },
  },
};

export function Experience() {
  const experiences = [
    {
      company: 'Rogers Communications',
      role: 'Sales Associate / Manager on Duty',
      period: 'Sept 2024 – Present',
      current: true,
      highlight: '🏆 Top Seller · Rogers Mastercard',
      bullets: [
        'Acting Store Manager on rotation — staff management, inventory, daily targets for team of 8+',
        'Promoted Rogers Fido Chatr — top placement in wireless activations',
        'Ranked Top Seller for Rogers Mastercard regionally',
        'Designed Excel performance tracking dashboard — automated KPI reporting and trend visualization',
        'Bridged commercial instincts with technical mindset'
      ],
      tags: ['Team Leadership', 'Rogers', 'Fido', 'Chatr', 'Excel Automation', 'KPI Tracking'],
      color: '#F2664A',
      featured: true
    },
    {
      company: 'Freelance',
      role: 'Software Developer',
      period: 'May 2024 – Sept 2024',
      bullets: [
        'Built full-stack Laundry Management System — React, Node.js, PostgreSQL, real-time booking and payment tracking',
        'Delivered 3+ client websites using React and Tailwind, deployed on Vercel',
        'Built React Native mobile apps for small business clients',
        'Managed full project lifecycle solo — discovery to deployment'
      ],
      tags: ['React', 'Node.js', 'PostgreSQL', 'React Native', 'Vercel', 'Full Stack'],
      color: '#C8F135'
    },
    {
      company: 'Staples Canada ULC',
      role: 'Wireless Sales Consultant',
      period: 'Dec 2023 – May 2024',
      highlight: '🏆 Top 150 Canada · Top 3 GTA',
      bullets: [
        'Ranked Top 150 nationally and Top 3 GTA for wireless',
        'Supervisor on Duty managing daily operations',
        'Trained new hire associates on wireless portfolio and CRM',
        'Managed activations across Rogers Bell Telus'
      ],
      tags: ['Wireless Sales', 'Team Leadership', 'Training', 'CRM'],
      color: '#60A5FA'
    },
    {
      company: 'Walmart Canada',
      role: 'Electronics Sales Associate',
      period: 'June 2023 – Dec 2023',
      bullets: [
        'Top performer for Mastercard and Protection Plans',
        'Consultative electronics selling across 50+ SKUs',
        'Guided customers through complex tech decisions'
      ],
      tags: ['Consultative Sales', 'Electronics', 'Retail Operations'],
      color: '#FBBF24'
    }
  ];

  return (
    <section id="experience" className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <p 
          className="text-xs mb-4"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
        >
          // 04 · experience
        </p>

        <h2 
          className="text-[52px] mb-20"
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-1px'
          }}
        >
          Where I've made an impact.
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-0.5"
            style={{
              background: 'linear-gradient(180deg, #F58F7C 0%, #F2C4CE 50%, transparent 100%)'
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="relative pl-16"
              >
                {/* Timeline Node */}
                <div 
                  className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full border-2"
                  style={{
                    borderColor: exp.color,
                    background: 'var(--bg-primary)',
                    top: '24px'
                  }}
                >
                  {exp.current && (
                    <>
                      <div 
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: exp.color, opacity: 0.75 }}
                      />
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{ background: exp.color }}
                      />
                    </>
                  )}
                </div>

                {/* Card */}
                <div
                  className={`rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 ${
                    exp.featured ? 'scale-[1.02]' : ''
                  }`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: `3px solid ${experienceCardAccent[exp.company].left}`,
                    boxShadow:
                      '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs"
                          style={{
                            ...experienceCardAccent[exp.company].roleBadge,
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500
                          }}
                        >
                          {exp.role}
                        </span>
                        {exp.current && (
                          <div className="flex items-center gap-1.5">
                            <span 
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{ background: 'var(--sage-green)' }}
                            />
                            <span 
                              className="text-xs"
                              style={{ color: 'var(--sage-green)', fontFamily: 'var(--font-body)' }}
                            >
                              Current
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 
                        className="text-xl mb-1"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 800,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {exp.company}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {exp.period}
                      </p>
                    </div>

                    {exp.highlight && (
                      <div
                        className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap"
                        style={{
                          background: 'linear-gradient(135deg, rgba(245, 143, 124, 0.2), rgba(242, 196, 206, 0.2))',
                          border: '1px solid rgba(245, 143, 124, 0.3)',
                          color: 'var(--coral)',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 500
                        }}
                      >
                        {exp.highlight}
                      </div>
                    )}
                  </div>

                  {/* Bullets */}
                  <ul className="experience-card__bullets mb-4">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} style={getTechTagPillStyle(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
