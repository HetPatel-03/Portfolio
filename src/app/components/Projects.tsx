import { getTechTagPillStyle } from '../lib/techTagPill';

export function Projects() {
  const projects = [
    {
      id: 'PROJ / 01',
      name: 'StudenzBit',
      description:
        'A resource hub for international students moving to Canada. Built with React, D3.js interactive world map, affiliate monetization, and deployed on Vercel. Targeting Gen Z students with a pastel-first design system.',
      tags: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
      gradient: 'linear-gradient(135deg, #F2664A 0%, #F9A8D4 100%)',
      status: 'live',
      views: '214',
    },
    {
      id: 'PROJ / 02',
      name: 'RecurList',
      description:
        'A smart grocery and habits app with a recurring rules engine. Built with React frontend, Node.js backend, PostgreSQL database, and Supabase. Designed to make recurring tasks feel effortless.',
      tags: ['TypeScript', 'Express', 'Supabase'],
      gradient: 'linear-gradient(135deg, #6366F1 0%, #2DD4BF 100%)',
      status: 'live',
      views: '187',
    },
    {
      id: 'PROJ / 03',
      name: 'Task Manager',
      description:
        'A Kanban-style task management app with drag-and-drop interface, real-time sync, and keyboard-first editing. Built with React, Tailwind CSS, and Firebase.',
      tags: ['React', 'Tailwind', 'Firebase'],
      gradient: 'linear-gradient(135deg, #C8F135 0%, #60A5FA 100%)',
      status: 'live',
      views: '156',
    },
  ];

  return (
    <section id="projects" className="section-bg-projects relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-start mb-10 md:mb-12 gap-3">
          <div>
            <p 
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
            >
              // 03 · projects
            </p>
            <h2 
              className="text-[clamp(34px,8vw,52px)]"
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
            className="text-xs pt-0 md:pt-12"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            // 3 of 3
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project) => (
            <div key={project.id} className="project-card group">
              {/* Visual Area */}
              <div
                className="project-card__media h-[180px] relative overflow-hidden"
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

              {/* Card Body — liquid glass (gradient block above unchanged) */}
              <div className="project-card__body p-5 md:p-6">
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
                    <span key={tag} style={getTechTagPillStyle(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Name */}
                <h3 
                  className="text-[20px] md:text-[22px] mb-3"
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
                  className="mb-6 text-[13px] leading-relaxed"
                  style={{
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
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
                    inspect →
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
