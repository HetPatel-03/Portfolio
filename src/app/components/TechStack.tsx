export function TechStack() {
  const technologies = [
    {
      name: 'React',
      icon: '⚛',
      color: '#61DAFB',
      useCase: "Built StudenzBit's frontend and interactive D3 world map"
    },
    {
      name: 'Node.js + Express',
      icon: '⬢',
      color: '#68A063',
      useCase: "Powered RecurList's recurring rules engine"
    },
    {
      name: 'TypeScript',
      icon: 'TS',
      color: '#3178C6',
      useCase: 'Type-safe development across all recent projects'
    },
    {
      name: 'PostgreSQL / Supabase',
      icon: '🐘',
      color: '#336791',
      useCase: 'Database layer for 3 production projects'
    },
    {
      name: 'Python',
      icon: '🐍',
      color: '#3776AB',
      useCase: 'Scripting, automation and backend API development'
    },
    {
      name: 'Tailwind CSS',
      icon: '🎨',
      color: '#06B6D4',
      useCase: 'Styled every frontend project with mobile-first approach'
    },
    {
      name: 'Git / GitHub',
      icon: '⎇',
      color: '#F05032',
      useCase: 'Version control across all personal and freelance work'
    },
    {
      name: 'Vercel / Docker',
      icon: '▲',
      color: '#000000',
      useCase: 'Deployed and containerized production applications'
    }
  ];

  return (
    <section id="stack" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p 
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
            >
              // 06 · stack
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
              Tools I reach for.
            </h2>
          </div>
          <p 
            className="text-xs pt-12"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            // proof over self-rating
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,143,124,0.2)] group"
              style={{
                background: 'rgba(44, 43, 48, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(240, 237, 232, 0.08)',
                borderTop: '2px solid rgba(245, 143, 124, 0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
                style={{
                  background: `${tech.color}15`,
                  border: `1px solid ${tech.color}30`,
                }}
              >
                <span 
                  className="text-2xl transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    color: tech.color,
                    filter: 'drop-shadow(0 0 8px currentColor)'
                  }}
                >
                  {tech.icon}
                </span>
              </div>

              {/* Name */}
              <h3 
                className="text-lg mb-3"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}
              >
                {tech.name}
              </h3>

              {/* Use Case */}
              <p 
                className="text-[13px] leading-relaxed italic"
                style={{
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                {tech.useCase}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
