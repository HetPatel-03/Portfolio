export function Projects() {
  const projects = [
    {
      id: 'PROJ / 01',
      name: 'StudenzBit',
      description: 'Global student connection platform with interactive world map visualization, real-time chat, and location-based discovery.',
      tags: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
      gradient: 'linear-gradient(135deg, #F58F7C 0%, #F2C4CE 100%)',
      status: 'live',
      views: '214'
    },
    {
      id: 'PROJ / 02',
      name: 'RecurList',
      description: 'Smart recurring task manager with intelligent scheduling engine, automated reminders, and productivity analytics.',
      tags: ['TypeScript', 'Express', 'Supabase'],
      gradient: 'linear-gradient(135deg, #F2C4CE 0%, #A8C5A0 100%)',
      status: 'live',
      views: '187'
    },
    {
      id: 'PROJ / 03',
      name: 'Task Manager',
      description: 'Collaborative kanban board with drag-and-drop interface, team workflows, and real-time synchronization.',
      tags: ['React', 'Tailwind', 'Firebase'],
      gradient: 'linear-gradient(135deg, #F58F7C 0%, #4F4F51 100%)',
      status: 'live',
      views: '156'
    }
  ];

  return (
    <section id="work" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p 
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
            >
              // 03 · work
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
              Things I've shipped from scratch.
            </h2>
          </div>
          <p 
            className="text-xs pt-12"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            // 3 of 3
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_40px_rgba(245,143,124,0.25)] cursor-pointer group"
              style={{
                background: 'rgba(44, 43, 48, 0.7)',
                backdropFilter: 'blur(20px) saturate(160%)',
                border: '1px solid rgba(240, 237, 232, 0.08)',
                borderTop: '2px solid rgba(245, 143, 124, 0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            >
              {/* Visual Area */}
              <div 
                className="h-[180px] relative overflow-hidden"
                style={{ background: project.gradient }}
              >
                {/* Abstract SVG illustration */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  {project.name === 'StudenzBit' && (
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="2" />
                      <path d="M 20 60 L 100 60 M 60 20 L 60 100" stroke="white" strokeWidth="1" />
                      <circle cx="60" cy="60" r="3" fill="white" />
                      <circle cx="80" cy="45" r="2" fill="white" />
                      <circle cx="40" cy="70" r="2" fill="white" />
                    </svg>
                  )}
                  {project.name === 'RecurList' && (
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <rect x="20" y="20" width="60" height="12" rx="2" fill="white" opacity="0.8" />
                      <rect x="20" y="40" width="60" height="12" rx="2" fill="white" opacity="0.6" />
                      <rect x="20" y="60" width="60" height="12" rx="2" fill="white" opacity="0.4" />
                      <circle cx="28" cy="26" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                  {project.name === 'Task Manager' && (
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <rect x="10" y="20" width="25" height="60" rx="3" fill="white" opacity="0.4" />
                      <rect x="40" y="20" width="25" height="60" rx="3" fill="white" opacity="0.6" />
                      <rect x="70" y="20" width="25" height="60" rx="3" fill="white" opacity="0.8" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Top Row */}
                <div className="flex justify-between items-center mb-3">
                  <span 
                    className="text-[11px]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                  >
                    {project.id}
                  </span>
                  <span 
                    className="text-[11px]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                  >
                    ● {project.views}
                  </span>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{
                        background: 'rgba(44, 43, 48, 0.7)',
                        border: '1px solid rgba(240, 237, 232, 0.15)',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Name */}
                <h3 
                  className="text-[22px] mb-3"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    color: 'var(--text-primary)'
                  }}
                >
                  {project.name}
                </h3>

                {/* Description */}
                <p 
                  className="text-[13px] leading-relaxed mb-6 line-clamp-3"
                  style={{
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  {project.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <span 
                    className="text-sm group-hover:translate-x-1 transition-transform duration-200"
                    style={{ color: 'var(--coral)', fontFamily: 'var(--font-body)' }}
                  >
                    view case →
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--sage-green)' }} />
                    <span 
                      className="text-xs"
                      style={{ color: 'var(--sage-green)', fontFamily: 'var(--font-body)' }}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
