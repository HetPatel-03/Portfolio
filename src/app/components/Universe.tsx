import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface GraphNode {
  id: string;
  label: string;
  type: 'center' | 'category' | 'detail' | 'trait';
  category?: string;
  description?: string;
  link?: string;
}

interface GraphLink {
  source: string;
  target: string;
}

export function Universe() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const nodes: GraphNode[] = [
      { id: 'center', label: 'Het Patel', type: 'center', description: 'Full Stack Software Engineer' },
      
      { id: 'engineer', label: 'Engineer', type: 'category', description: 'Building products from scratch' },
      { id: 'sales', label: 'Sales', type: 'category', description: 'Top performer nationally' },
      { id: 'education', label: 'Education', type: 'category', description: 'Computer Science background' },
      { id: 'projects', label: 'Projects', type: 'category', description: 'Shipped products' },
      
      { id: 'react', label: 'React', type: 'detail', category: 'engineer', description: 'Frontend framework of choice' },
      { id: 'node', label: 'Node.js', type: 'detail', category: 'engineer', description: 'Backend development' },
      { id: 'typescript', label: 'TypeScript', type: 'detail', category: 'engineer', description: 'Type-safe development' },
      { id: 'postgres', label: 'PostgreSQL', type: 'detail', category: 'engineer', description: 'Database management' },
      
      { id: 'rogers', label: 'Rogers', type: 'detail', category: 'sales', description: 'Top seller, Manager on Duty' },
      { id: 'staples', label: 'Staples', type: 'detail', category: 'sales', description: 'Top 150 Canada, Top 3 GTA' },
      { id: 'walmart', label: 'Walmart', type: 'detail', category: 'sales', description: 'Electronics sales associate' },
      { id: 'freelance', label: 'Freelance', type: 'detail', category: 'sales', description: 'Software developer' },
      
      { id: 'algoma', label: 'Algoma U', type: 'detail', category: 'education', description: 'Bachelor of CS, Dean\'s List' },
      { id: 'cs50', label: 'Harvard CS50', type: 'detail', category: 'education', description: 'Computer Science certification' },
      { id: 'cs50w', label: 'CS50 Web', type: 'detail', category: 'education', description: 'Web development certification' },
      { id: 'microsoft', label: 'Microsoft 365', type: 'detail', category: 'education', description: 'Platform certification' },
      
      { id: 'studenzbit', label: 'StudenzBit', type: 'detail', category: 'projects', description: 'World map platform', link: 'view →' },
      { id: 'recurlist', label: 'RecurList', type: 'detail', category: 'projects', description: 'Recurring task manager', link: 'view →' },
      { id: 'taskmanager', label: 'Task Manager', type: 'detail', category: 'projects', description: 'Kanban board app', link: 'view →' },
      
      { id: 'trilingual', label: 'Trilingual', type: 'trait', description: 'English, Hindi, Gujarati' },
      { id: 'location', label: 'Brampton ON', type: 'trait', description: 'Greater Toronto Area' },
      { id: 'performer', label: 'Top Performer', type: 'trait', description: 'Nationally ranked' },
      { id: 'available', label: 'Available 2026', type: 'trait', description: 'Open to opportunities' },
    ];

    const links: GraphLink[] = [
      { source: 'center', target: 'engineer' },
      { source: 'center', target: 'sales' },
      { source: 'center', target: 'education' },
      { source: 'center', target: 'projects' },
      
      { source: 'engineer', target: 'react' },
      { source: 'engineer', target: 'node' },
      { source: 'engineer', target: 'typescript' },
      { source: 'engineer', target: 'postgres' },
      
      { source: 'sales', target: 'rogers' },
      { source: 'sales', target: 'staples' },
      { source: 'sales', target: 'walmart' },
      { source: 'sales', target: 'freelance' },
      
      { source: 'education', target: 'algoma' },
      { source: 'education', target: 'cs50' },
      { source: 'education', target: 'cs50w' },
      { source: 'education', target: 'microsoft' },
      
      { source: 'projects', target: 'studenzbit' },
      { source: 'projects', target: 'recurlist' },
      { source: 'projects', target: 'taskmanager' },
    ];

    const width = svgRef.current.clientWidth;
    const height = 580;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g');

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links as any).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    const link = g.append('g')
      .selectAll('line')
      .data(links as any)
      .join('line')
      .attr('stroke', 'rgba(245, 143, 124, 0.15)')
      .attr('stroke-width', 1)
      .attr('class', 'graph-link');

    const node = g.append('g')
      .selectAll('g')
      .data(nodes as any)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event: any, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }) as any
      );

    node.append('circle')
      .attr('r', (d: any) => {
        if (d.type === 'center') return 30;
        if (d.type === 'category') return 20;
        if (d.type === 'detail') return 12;
        return 10;
      })
      .attr('fill', (d: any) => {
        if (d.type === 'center') return '#F58F7C';
        if (d.type === 'category') return '#F2C4CE';
        if (d.type === 'detail') return '#4F4F51';
        return 'transparent';
      })
      .attr('stroke', (d: any) => d.type === 'trait' ? '#F58F7C' : 'none')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', (d: any) => d.type === 'trait' ? '3,3' : '0')
      .style('cursor', 'pointer')
      .on('mouseenter', function(this: any) {
        d3.select(this).transition().duration(200).attr('transform', 'scale(1.3)');
      })
      .on('mouseleave', function(this: any) {
        d3.select(this).transition().duration(200).attr('transform', 'scale(1)');
      })
      .on('click', (event: any, d: any) => {
        const svgRect = svgRef.current!.getBoundingClientRect();
        setTooltipPosition({
          x: event.clientX - svgRect.left,
          y: event.clientY - svgRect.top
        });
        setSelectedNode(d);
      });

    if (nodes.find((n: GraphNode) => n.type === 'center')) {
      node.filter((d: any) => d.type === 'center')
        .append('circle')
        .attr('r', 30)
        .attr('fill', 'none')
        .attr('stroke', '#F58F7C')
        .attr('stroke-width', 2)
        .attr('opacity', 0.5)
        .append('animate')
        .attr('attributeName', 'r')
        .attr('from', '30')
        .attr('to', '40')
        .attr('dur', '2s')
        .attr('repeatCount', 'indefinite');
    }

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('font-size', (d: any) => {
        if (d.type === 'center') return '12px';
        if (d.type === 'category') return '10px';
        return '8px';
      })
      .attr('font-family', 'var(--font-heading)')
      .attr('font-weight', (d: any) => d.type === 'center' ? 800 : 700)
      .attr('fill', (d: any) => d.type === 'center' ? '#0C0C10' : d.type === 'category' ? '#0C0C10' : '#F0EDE8')
      .attr('pointer-events', 'none')
      .text((d: any) => d.label);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (svgRef.current && !svgRef.current.contains(event.target as globalThis.Node)) {
        setSelectedNode(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      simulation.stop();
    };
  }, []);

  return (
    <section id="universe" className="section-bg-universe py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <p 
          className="text-xs mb-4"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}
        >
          // 02 · universe
        </p>

        <h2 
          className="text-[52px] mb-2"
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-1px'
          }}
        >
          The full picture.
        </h2>

        <p 
          className="text-[13px] mb-12"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          Click any node to explore · Drag to rearrange
        </p>

        <div 
          className="rounded-3xl p-12 relative"
          style={{
            background: 'var(--bg-surface)',
            height: '580px'
          }}
        >
          <svg ref={svgRef} width="100%" height="100%" />

          {selectedNode && (
            <div
              className="absolute rounded-2xl p-4 z-50 pointer-events-none"
              style={{
                left: `${tooltipPosition.x + 20}px`,
                top: `${tooltipPosition.y - 20}px`,
                background: 'rgba(44, 43, 48, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(245, 143, 124, 0.25)',
                borderTop: '2px solid var(--coral)',
                boxShadow: '0 0 30px rgba(245, 143, 124, 0.2)',
                maxWidth: '250px'
              }}
            >
              <div 
                className="mb-1"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}
              >
                {selectedNode.label}
              </div>
              <div 
                className="text-xs"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-muted)'
                }}
              >
                {selectedNode.description}
              </div>
              {selectedNode.link && (
                <div 
                  className="text-xs mt-2"
                  style={{ color: 'var(--coral)', fontFamily: 'var(--font-body)' }}
                >
                  {selectedNode.link}
                </div>
              )}
            </div>
          )}

          {showHint && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] transition-opacity duration-500"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                opacity: showHint ? 1 : 0
              }}
            >
              drag · click · explore
            </div>
          )}
        </div>
      </div>
    </section>
  );
}