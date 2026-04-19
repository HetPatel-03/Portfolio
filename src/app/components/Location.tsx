import { motion } from 'motion/react';

export function Location() {
  return (
    <section id="location" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <p 
          className="text-xs mb-4"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
        >
          // 07 · location
        </p>

        <h2 
          className="text-[52px] mb-3"
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-1px'
          }}
        >
          Based in the Greater Toronto Area.
        </h2>

        <p 
          className="text-base mb-12"
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)'
          }}
        >
          Brampton, ON · Open to remote & relocation
        </p>

        {/* Map Container */}
        <div
          className="rounded-3xl p-12 relative overflow-hidden"
          style={{
            background: 'var(--bg-surface)',
            height: '500px'
          }}
        >
          {/* Stylized SVG Map */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 800 400"
            className="opacity-70"
          >
            {/* Highway 401 */}
            <path 
              d="M 50 250 Q 400 230 750 240" 
              stroke="rgba(245, 143, 124, 0.15)" 
              strokeWidth="3" 
              fill="none"
            />
            {/* Highway 410 */}
            <path 
              d="M 300 50 L 350 350" 
              stroke="rgba(245, 143, 124, 0.15)" 
              strokeWidth="2" 
              fill="none"
            />
            {/* Highway 427 */}
            <path 
              d="M 400 50 L 450 350" 
              stroke="rgba(245, 143, 124, 0.15)" 
              strokeWidth="2" 
              fill="none"
            />
            {/* Highway 400 */}
            <path 
              d="M 250 50 L 280 350" 
              stroke="rgba(245, 143, 124, 0.15)" 
              strokeWidth="2" 
              fill="none"
            />

            {/* Topographic contour lines */}
            <ellipse cx="350" cy="200" rx="150" ry="100" stroke="rgba(158, 156, 154, 0.03)" strokeWidth="1" fill="none" />
            <ellipse cx="350" cy="200" rx="200" ry="130" stroke="rgba(158, 156, 154, 0.03)" strokeWidth="1" fill="none" />
            <ellipse cx="350" cy="200" rx="250" ry="160" stroke="rgba(158, 156, 154, 0.03)" strokeWidth="1" fill="none" />

            {/* City Labels */}
            <text x="500" y="260" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--text-muted)' }}>Toronto</text>
            <text x="420" y="230" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--text-muted)' }}>Mississauga</text>
            <text x="320" y="180" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--text-muted)' }}>Brampton</text>
            <text x="280" y="140" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--text-muted)' }}>Vaughan</text>
            <text x="550" y="200" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--text-muted)' }}>Markham</text>
          </svg>

          {/* Brampton Pin with Pulse */}
          <motion.div
            className="absolute"
            style={{
              top: '35%',
              left: '38%'
            }}
          >
            {/* Pulsing rings */}
            <motion.div
              className="absolute w-12 h-12 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                border: '2px solid var(--coral)',
                opacity: 0.6
              }}
              animate={{
                scale: [1, 2, 2],
                opacity: [0.6, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute w-12 h-12 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                border: '2px solid var(--coral)',
                opacity: 0.6
              }}
              animate={{
                scale: [1, 2, 2],
                opacity: [0.6, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5
              }}
            />
            {/* Center dot */}
            <div
              className="absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'var(--coral)',
                boxShadow: '0 0 20px rgba(245, 143, 124, 0.6)'
              }}
            />
          </motion.div>

          {/* Info Cards */}
          <div
            className="absolute top-8 right-8 p-4 rounded-2xl max-w-xs"
            style={{
              background: 'rgba(44, 43, 48, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(240, 237, 232, 0.08)',
              borderTop: '2px solid rgba(245, 143, 124, 0.2)'
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-xl">📍</span>
              <div>
                <h4 
                  className="text-sm mb-1"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  Brampton, ON
                </h4>
                <p 
                  className="text-xs"
                  style={{
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  Available on-site across GTA
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-xl">✈</span>
              <div>
                <h4 
                  className="text-sm mb-1"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  Open to Relocation
                </h4>
                <p 
                  className="text-xs"
                  style={{
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  Remote-first preferred
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
