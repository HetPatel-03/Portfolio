export function Marquee() {
  const items = [
    'React',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Full Stack',
    'Problem Solver',
    'Top Performer',
    'Builder',
    'Supabase',
    'Vercel',
    'Git',
    'Python',
    'Java',
    'REST APIs',
    'AWS'
  ];

  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div
      className="section-bg-marquee w-full py-4 overflow-hidden"
      style={{
        borderTop: '1px solid rgba(240, 237, 232, 0.06)',
        borderBottom: '1px solid rgba(240, 237, 232, 0.06)',
      }}
    >
      <div 
        className="flex gap-8 animate-marquee hover:pause-marquee"
        style={{
          width: 'fit-content',
          animation: 'marquee 30s linear infinite'
        }}
      >
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8 whitespace-nowrap">
            <span 
              className="text-[13px]"
              style={{
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--coral)' }}>·</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .pause-marquee {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
