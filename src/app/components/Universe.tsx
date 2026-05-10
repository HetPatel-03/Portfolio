import React, { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { forceCollide, forceLink, forceManyBody, forceSimulation, type SimulationNodeDatum } from 'd3-force';

type NodeType = 'center' | 'category' | 'sub' | 'leaf';

interface Node {
  id: string;
  label: string;
  type: NodeType;
  parent?: string;
  color: string;
  size: number;
  description?: string;
  /** Opens in new tab on click (Presence). */
  openUrl?: string;
  /** Do not open detail panel on click. */
  skipDetail?: boolean;
  /** No visible mesh / not raycast — position only for label (e.g. Learning quote). */
  labelAnchorOnly?: boolean;
  /** Overlay label uses italic multi-line quote text instead of `label`. */
  quoteText?: string;
}

interface SimNode extends SimulationNodeDatum {
  id: string;
  type: NodeType;
  parent?: string;
  color: string;
  size: number;
  label: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  openUrl?: string;
  skipDetail?: boolean;
  labelAnchorOnly?: boolean;
  quoteText?: string;
}

interface SceneNode {
  data: SimNode;
  root: THREE.Object3D;
  mesh: THREE.Mesh;
  ringMesh?: THREE.Mesh;
}

const CAT_RADIUS = 120;
const SUB_RADIUS = 58;
const LEAF_RADIUS = 20;

/** Evenly spaced points on a circle in the XY plane (z = 0). */
function fibonacciCirclePoints(count: number, radius: number): THREE.Vector3[] {
  if (count <= 0) return [];
  if (count === 1) return [new THREE.Vector3(radius, 0, 0)];
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
  }
  return points;
}

const PRESENCE_URLS: Record<string, string> = {
  'sub-presence-linkedin': 'https://linkedin.com/in/hetppatel',
  'sub-presence-github': 'https://github.com/hetpatel',
  'sub-presence-x': 'https://x.com/hetpatel37',
  'sub-presence-hetppatel-dev': 'https://hetppatel.dev',
};

const CATEGORY_TOOLTIP: Record<string, string> = {
  education: 'Academic background',
  experience: 'Work history',
  startups: "Things I'm building",
  projects: 'Technical builds',
  skills: 'Tech stack',
  achievements: 'Rankings & recognition',
  languages: 'Human languages',
  location: 'Based in GTA',
  presence: 'Find me online',
  learning: 'Growth mindset',
};

type DetailKind = 'experience' | 'education' | 'project' | 'skill' | 'achievement' | 'language' | 'default';

function detailKindForSub(node: Node): DetailKind {
  const p = node.parent ?? '';
  if (p === 'experience') return 'experience';
  if (p === 'education') return 'education';
  if (p === 'startups' || p === 'projects') return 'project';
  if (p === 'skills') return 'skill';
  if (p === 'achievements') return 'achievement';
  if (p === 'languages') return 'language';
  return 'default';
}

/** Curated copy for detail panel — keyed by sub node id where stable. */
const SUB_DETAIL: Record<
  string,
  {
    badge?: string;
    dates?: string;
    title?: string;
    bullets?: string[];
    tech?: string[];
    institution?: string;
    year?: string;
    body?: string;
    description?: string;
    liveUrl?: string;
    fluency?: string;
    flag?: string;
    context?: string;
    skillLevel?: 'Production Ready' | 'Learning';
    usedIn?: string[];
  }
> = {
  'sub-experience-staples-canada': {
    badge: 'Wireless Sales',
    dates: '',
    title: 'Staples Canada',
    bullets: [
      'Wireless Sales Consultant · Promoted Bell, Virgin Plus and Lucky Mobile. Ranked Top 3 in GTA and Top 150 nationally for wireless sales. Star Employee 3x.',
    ],
    tech: [],
  },
  'sub-experience-rogers-communications': {
    badge: 'Wireless Sales',
    dates: '',
    title: 'Rogers Communications',
    bullets: [
      'Wireless Sales Consultant & Acting MOD · Promoted Rogers, Fido and Chatr. Ranked Top 3 GTA, Top 150 Canada. Ran store operations as Manager on Duty.',
    ],
    tech: [],
  },
  'sub-experience-walmart-canada': {
    badge: 'Wireless Sales',
    dates: '',
    title: 'Walmart Canada',
    bullets: [
      'Wireless Sales Consultant · Fast-paced floor sales — helped customers navigate devices, plans and accessories. Hit 100% of Protection Plan targets.',
    ],
    tech: [],
  },
  'sub-experience-freelance': {
    badge: 'Engineering',
    dates: '',
    title: 'Freelance',
    bullets: [
      'Software Engineer · Building full-stack web and mobile products independently. React, Next.js, Supabase, React Native, Claude API.',
    ],
    tech: [],
  },
  'sub-education-cs-degree': {
    institution: 'Bachelor of Science, Computer Science · Algoma University',
    year: 'Graduated December 2025',
    body:
      "Dean's List 2023 & 2024 (scholarship recipient) · Focus: software engineering, data structures, algorithms and collaborative projects.",
  },
  'sub-education-cs50x': {
    institution: 'Harvard CS50x',
    year: 'Certificate',
    body:
      "Harvard's Introduction to Computer Science. Covered C, Python, SQL, web development and algorithms.",
  },
  'sub-education-cs50w': {
    institution: 'Harvard CS50W',
    year: 'Certificate',
    body:
      "Harvard's Web Programming with Python and JavaScript. Built full-stack apps with Django, React and SQL.",
  },
  'sub-education-microsoft-365': {
    institution: 'Microsoft 365 Certified',
    year: 'Certification',
    body: 'Covers productivity tools, cloud collaboration and enterprise software.',
  },
  'sub-startups-studenzbit': {
    description:
      'Canada-first content platform helping international students navigate life in Canada. Affiliate monetized, SEO-optimized, 16+ blog pages.',
    tech: ['Next.js', 'Supabase', 'GA4', 'Amazon Associates'],
    liveUrl: 'https://studenzbit.com',
  },
  'sub-startups-digifixr': {
    description:
      'GTA-focused web agency targeting local businesses. AI-powered lead generation pipeline using Claude API, n8n and cold outreach automation.',
    tech: ['Claude API', 'n8n'],
  },
  'sub-projects-studenzbit': {
    description:
      'Full-stack content platform for international students in Canada. Built with Next.js, Supabase, GA4 and Amazon Associates.',
    tech: ['Next.js', 'Supabase', 'GA4'],
    liveUrl: 'https://studenzbit.com',
  },
  'sub-projects-recurlist': {
    description:
      'React Native grocery app with recurring lists, Canadian price comparison across 9 stores and a credit card rewards engine.',
    tech: ['React Native', 'Expo', 'Supabase'],
  },
  'sub-projects-fixxo': {
    description:
      'Human-powered AI task concierge for the GTA. One text — we handle the rest. Built with WhatsApp Business API.',
    tech: ['WhatsApp Business API'],
  },
  'sub-projects-task-manager': {
    description:
      'Brutalist-designed mobile task app. Zero friction capture, recurring schedules, Brain Dump and 4 views. React Native + Supabase.',
    tech: ['React Native', 'Supabase'],
  },
  'sub-projects-sentrymind': {
    description:
      'AI-powered SRE tool for Vercel/Supabase/Next.js stacks. Uses Claude API for incident detection and automated fix suggestions.',
    tech: ['Next.js', 'Claude API', 'Supabase'],
  },
  'sub-projects-whatsapp-clone': {
    description:
      'Full-stack real-time messaging app with auth, chat rooms and live updates. Built with React, Node.js and WebSockets.',
    tech: ['React', 'Node.js', 'WebSockets'],
  },
  'sub-projects-twitter-bot': {
    description:
      'Automated content bot that posts daily CS/Python concepts. Built with Python and Twitter API v2.',
    tech: ['Python', 'Twitter API v2'],
  },
  'sub-projects-portfolio-website': {
    description:
      'This site. Built with React, Vite, TypeScript, Tailwind, Three.js knowledge graph and GSAP animations.',
    tech: ['React', 'Vite', 'TypeScript', 'Three.js', 'GSAP'],
  },
  'sub-skills-frontend': {
    skillLevel: 'Production Ready',
    description: 'UI development — web and mobile interfaces with modern frameworks.',
  },
  'sub-skills-backend': {
    skillLevel: 'Production Ready',
    description: 'Server-side development — APIs, databases, auth and serverless functions.',
  },
  'sub-skills-database': {
    skillLevel: 'Production Ready',
    description: 'Relational and realtime databases — schema design, migrations and queries.',
  },
  'sub-skills-devops': {
    skillLevel: 'Production Ready',
    description: 'Deployment, automation and AI-powered workflow tooling.',
  },
  /* Internal copy for Currently Learning nodes — not shown in UI when skipDetail is set */
  'sub-learning-aws': { description: 'Cloud fundamentals — EC2, S3, Lambda, IAM and deployment pipelines.' },
  'sub-learning-system-design': {
    description: 'Scalable architecture patterns, distributed systems and real-world design interviews.',
  },
  'sub-learning-machine-learning': {
    description: 'Supervised/unsupervised learning, model training, evaluation and real-world applications.',
  },
  'sub-learning-artificial-intelligence': {
    description: 'LLMs, prompt engineering, AI tool integration and applied AI development.',
  },
  'sub-achievements-top-150-canada': {
    context:
      'Ranked Top 150 Wireless Sales Associate Nationally — achieved in Q4 2023 and Q1 2024 at Staples Canada.',
  },
  'sub-achievements-top-3-gta': {
    context:
      'Ranked Top 3 Wireless Sales Associate in the GTA District at Staples Canada — for wireless sales across Bell, Virgin Plus and Lucky Mobile.',
  },
  'sub-achievements-top-seller-rogers': {
    context:
      'Top performer at Rogers Communications for wireless sales across Rogers, Fido and Chatr brands — including top Rogers Mastercard activations.',
  },
  'sub-achievements-acting-manager': {
    context:
      'MOD (Manager on Duty) · Ran daily store operations, supervised team, managed scheduling and handled escalations at Rogers Communications.',
  },
  'sub-achievements-dean-s-list': {
    context:
      "Dean's List recipient 2023 & 2024 at Algoma University · Awarded Dean's List Scholarship both years for academic excellence.",
  },
  'sub-languages-english': {
    flag: '🇬🇧',
    fluency: 'Fluent · Primary language for all professional and academic work',
  },
  'sub-languages-hindi': { flag: '🇮🇳', fluency: 'Fluent · Native language, spoken at home and in community' },
  'sub-languages-gujarati': {
    flag: '🇮🇳',
    fluency: 'Fluent · Native language, spoken in family and cultural settings',
  },
  'sub-languages-french': { flag: '🇫🇷', fluency: 'Beginner · Currently learning basics' },
};

const LEAF_DETAIL: Record<
  string,
  { level: 'Production Ready' | 'Learning'; usedIn: string[] }
> = {
  'leaf-sub-skills-backend-node-js': { level: 'Production Ready', usedIn: ['APIs', 'Services'] },
  'leaf-sub-skills-backend-python': { level: 'Production Ready', usedIn: ['Bots', 'Automation'] },
  'leaf-sub-skills-backend-rest-apis': { level: 'Production Ready', usedIn: ['StudenzBit', 'APIs'] },
  'leaf-sub-skills-backend-express': { level: 'Production Ready', usedIn: ['Node services'] },
  'leaf-sub-skills-backend-supabase': { level: 'Production Ready', usedIn: ['StudenzBit', 'RecurList'] },
  'leaf-sub-skills-backend-edge-functions': { level: 'Production Ready', usedIn: ['Supabase'] },
  'leaf-sub-skills-frontend-react': { level: 'Production Ready', usedIn: ['StudenzBit', 'Portfolio'] },
  'leaf-sub-skills-frontend-next-js': { level: 'Production Ready', usedIn: ['StudenzBit', 'SentryMind'] },
  'leaf-sub-skills-frontend-typescript': { level: 'Production Ready', usedIn: ['All active repos'] },
  'leaf-sub-skills-frontend-tailwind-css': { level: 'Production Ready', usedIn: ['Portfolio', 'Web'] },
  'leaf-sub-skills-frontend-react-native': { level: 'Production Ready', usedIn: ['RecurList', 'Task Manager'] },
  'leaf-sub-skills-frontend-vite': { level: 'Production Ready', usedIn: ['Portfolio'] },
  'leaf-sub-skills-database-postgresql': { level: 'Production Ready', usedIn: ['StudenzBit'] },
  'leaf-sub-skills-database-supabase': { level: 'Production Ready', usedIn: ['StudenzBit', 'RecurList'] },
  'leaf-sub-skills-database-firebase': { level: 'Production Ready', usedIn: ['Mobile / sync'] },
  'leaf-sub-skills-database-sql': { level: 'Production Ready', usedIn: ['Reporting'] },
  'leaf-sub-skills-database-realtime-db': { level: 'Production Ready', usedIn: ['Live data'] },
  'leaf-sub-skills-devops-git': { level: 'Production Ready', usedIn: ['All projects'] },
  'leaf-sub-skills-devops-github': { level: 'Production Ready', usedIn: ['Version control', 'CI'] },
  'leaf-sub-skills-devops-vercel': { level: 'Production Ready', usedIn: ['Deploys'] },
  'leaf-sub-skills-devops-eas': { level: 'Production Ready', usedIn: ['Expo builds'] },
  'leaf-sub-skills-devops-n8n': { level: 'Production Ready', usedIn: ['Digifixr automation'] },
  'leaf-sub-skills-devops-claude-api': { level: 'Production Ready', usedIn: ['AI tooling'] },
};

const pillStyle: CSSProperties = {
  display: 'inline-block',
  fontSize: '10px',
  padding: '4px 8px',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  marginRight: 6,
  marginTop: 6,
  fontFamily: 'DM Sans, sans-serif',
  color: '#A8A8B8',
};

function UniverseDetailBody({ node, byId }: { node: Node; byId: Map<string, Node> }) {
  const parent = node.parent ? byId.get(node.parent) : undefined;
  const category =
    node.type === 'leaf' && parent?.type === 'sub' && parent.parent
      ? byId.get(parent.parent)
      : parent?.type === 'category'
        ? parent
        : undefined;
  const catColor = category?.color ?? '#A8A8B8';
  const kind = node.type === 'leaf' ? 'skill' : detailKindForSub(node);
  const subOrLeafDetail = node.type === 'leaf' ? undefined : SUB_DETAIL[node.id];
  const heading = { fontFamily: 'Clash Display, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 12px' };
  const muted = { color: '#A8A8B8', fontSize: 12, fontFamily: 'DM Sans, sans-serif', lineHeight: 1.5 };

  if (node.type === 'leaf') {
    const ld = LEAF_DETAIL[node.id];
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: `1px solid ${catColor}55`,
            }}
          />
          <div>
            <p style={heading}>{node.label}</p>
            <span
              style={{
                ...pillStyle,
                background: `${catColor}22`,
                borderColor: `${catColor}44`,
                color: catColor,
              }}
            >
              {ld?.level ?? 'Learning'}
            </span>
          </div>
        </div>
        <p style={muted}>Used in:</p>
        <div style={{ marginTop: 4 }}>
          {(ld?.usedIn ?? ['Portfolio']).map((t) => (
            <span key={t} style={{ ...pillStyle, borderColor: `${catColor}33` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'experience' && subOrLeafDetail && 'bullets' in subOrLeafDetail && subOrLeafDetail.bullets) {
    const d = subOrLeafDetail;
    return (
      <div>
        <p style={{ ...muted, marginBottom: 8 }}>
          {d.badge ? (
            <span
              style={{
                ...pillStyle,
                background: `${catColor}22`,
                color: catColor,
                borderColor: `${catColor}44`,
              }}
            >
              {d.badge}
            </span>
          ) : null}
          {d.dates ? (
            <>
              {' '}
              · {d.dates}
            </>
          ) : null}
        </p>
        <p style={heading}>{d.title ?? node.label}</p>
        <ul style={{ ...muted, paddingLeft: 18, margin: '0 0 12px' }}>
          {(d.bullets ?? []).map((b) => (
            <li key={b} style={{ marginBottom: 4 }}>
              {b}
            </li>
          ))}
        </ul>
        <div>
          {(d.tech ?? []).map((t) => (
            <span key={t} style={pillStyle}>
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'education' && subOrLeafDetail && 'institution' in subOrLeafDetail) {
    const d = subOrLeafDetail;
    return (
      <div>
        <p style={heading}>{d.institution}</p>
        <p style={{ ...muted, marginBottom: 8 }}>{d.year}</p>
        <p style={muted}>{d.body}</p>
      </div>
    );
  }

  if (kind === 'project' && subOrLeafDetail && 'description' in subOrLeafDetail) {
    const d = subOrLeafDetail;
    return (
      <div>
        <p style={heading}>{node.label}</p>
        <p style={{ ...muted, marginBottom: 12 }}>{d.description}</p>
        <div style={{ marginBottom: 12 }}>
          {(d.tech ?? []).map((t) => (
            <span key={t} style={pillStyle}>
              {t}
            </span>
          ))}
        </div>
        {d.liveUrl ? (
          <a
            href={d.liveUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: catColor,
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: 8,
              border: `1px solid ${catColor}55`,
            }}
          >
            ↗ live link
          </a>
        ) : null}
      </div>
    );
  }

  if (kind === 'skill' && subOrLeafDetail && 'skillLevel' in subOrLeafDetail) {
    const d = subOrLeafDetail;
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: `1px solid ${catColor}44`,
            }}
          />
          <div>
            <p style={heading}>{node.label}</p>
            <span style={{ ...pillStyle, color: catColor, borderColor: `${catColor}44` }}>{d.skillLevel}</span>
          </div>
        </div>
        {d.description ? <p style={{ ...muted, marginBottom: 12 }}>{d.description}</p> : null}
        {(d.usedIn ?? []).length > 0 ? (
          <>
            <p style={muted}>Used in:</p>
            <div>
              {(d.usedIn ?? []).map((t) => (
                <span key={t} style={pillStyle}>
                  {t}
                </span>
              ))}
            </div>
          </>
        ) : null}
      </div>
    );
  }

  if (kind === 'achievement' && subOrLeafDetail && 'context' in subOrLeafDetail) {
    const d = subOrLeafDetail;
    return (
      <div>
        <p style={{ ...heading, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span aria-hidden>🏆</span> {node.label}
        </p>
        <p style={muted}>{d.context}</p>
      </div>
    );
  }

  if (kind === 'language' && subOrLeafDetail && 'fluency' in subOrLeafDetail) {
    const d = subOrLeafDetail;
    return (
      <div>
        <p style={heading}>
          {d.flag} {node.label}
        </p>
        <p style={muted}>{d.fluency}</p>
      </div>
    );
  }

  return (
    <div>
      <p style={heading}>{node.label}</p>
      {category ? (
        <span style={{ ...pillStyle, color: catColor, borderColor: `${catColor}44` }}>{category.label}</span>
      ) : null}
      <p style={{ ...muted, marginTop: 12 }}>
        {node.description ?? 'Tap another node on the graph to keep exploring.'}
      </p>
    </div>
  );
}

function subOneLineBlurb(node: Node): string {
  const d = SUB_DETAIL[node.id];
  if (node.openUrl) return node.openUrl;
  return (
    d?.description ??
    d?.body ??
    d?.bullets?.[0] ??
    'Part of this cluster — open the graph to see how it connects.'
  );
}

function UniverseSimpleSubDetail({ node, byId }: { node: Node; byId: Map<string, Node> }) {
  const parent = node.parent ? byId.get(node.parent) : undefined;
  const heading: CSSProperties = {
    fontFamily: 'Clash Display, sans-serif',
    fontSize: 16,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 12px',
  };
  return (
    <div>
      <p style={heading}>{node.label}</p>
      {parent ? (
        <span
          style={{
            ...pillStyle,
            color: parent.color,
            borderColor: `${parent.color}66`,
            background: `${parent.color}22`,
          }}
        >
          {parent.label}
        </span>
      ) : null}
      <p
        style={{
          marginTop: 16,
          color: '#A8A8B8',
          fontSize: 13,
          fontFamily: 'DM Sans, sans-serif',
          lineHeight: 1.5,
        }}
      >
        {subOneLineBlurb(node)}
      </p>
    </div>
  );
}

const SUB_MESH_BASE_COLOR = 0x4a5568;

export function Universe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsLayerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rafRef = useRef<number>(0);

  const [focusedCategoryId, setFocusedCategoryId] = useState<string | null>(null);
  const [detailPanel, setDetailPanel] = useState<{
    node: Node;
    x: number;
    y: number;
    quickSub?: boolean;
  } | null>(null);
  const resetFocusHandlerRef = useRef<(() => void) | null>(null);
  const focusCatRef = useRef<string | null>(null);
  const setFocusRef = useRef(setFocusedCategoryId);
  const setDetailRef = useRef(setDetailPanel);
  setFocusRef.current = setFocusedCategoryId;
  setDetailRef.current = setDetailPanel;
  focusCatRef.current = focusedCategoryId;

  const nodes = useMemo<Node[]>(() => {
    const base: Node[] = [
      { id: 'het', label: 'Het Patel', type: 'center', color: '#F2664A', size: 42 },
      { id: 'education', label: 'Education', type: 'category', parent: 'het', color: '#C8F135', size: 16 },
      { id: 'experience', label: 'Experience', type: 'category', parent: 'het', color: '#60A5FA', size: 16 },
      { id: 'startups', label: 'Startups', type: 'category', parent: 'het', color: '#FBBF24', size: 16 },
      { id: 'projects', label: 'Projects', type: 'category', parent: 'het', color: '#A78BFA', size: 16 },
      { id: 'skills', label: 'Skills', type: 'category', parent: 'het', color: '#2DD4BF', size: 16 },
      { id: 'achievements', label: 'Achievements', type: 'category', parent: 'het', color: '#F59E0B', size: 16 },
      { id: 'languages', label: 'Languages', type: 'category', parent: 'het', color: '#F9A8D4', size: 16 },
      { id: 'location', label: 'Location', type: 'category', parent: 'het', color: '#86EFAC', size: 16 },
      { id: 'presence', label: 'Presence', type: 'category', parent: 'het', color: '#94A3B8', size: 16 },
      { id: 'learning', label: 'Currently Learning', type: 'category', parent: 'het', color: '#FB923C', size: 16 },
    ];

    const subGroups: Record<string, string[]> = {
      education: ['CS Degree', 'CS50x', 'CS50W', 'Microsoft 365'],
      experience: ['Staples Canada', 'Rogers Communications', 'Walmart Canada', 'Freelance'],
      startups: ['StudenzBit', 'Digifixr'],
      projects: [
        'StudenzBit',
        'RecurList',
        'FIXXO',
        'Task Manager',
        'SentryMind',
        'WhatsApp Clone',
        'Twitter Bot',
        'Portfolio Website',
      ],
      skills: ['Frontend', 'Backend', 'Database', 'DevOps'],
      achievements: ['Top 150 Canada', 'Top 3 GTA', 'Top Seller Rogers', 'Acting Manager', "Dean's List"],
      languages: ['English', 'Hindi', 'Gujarati', 'French'],
      location: ['Brampton ON', 'GTA, Ontario', 'Remote', 'Open to Relocation'],
      presence: ['GitHub', 'LinkedIn', 'X', 'hetppatel.dev'],
      learning: ['AWS', 'System Design', 'Machine Learning', 'Artificial Intelligence'],
    };

    Object.entries(subGroups).forEach(([categoryId, labels]) => {
      labels.forEach((label) => {
        const id = `sub-${categoryId}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        const isCsDegree = categoryId === 'education' && label === 'CS Degree';
        base.push({
          id,
          label,
          type: 'sub',
          parent: categoryId,
          color: '#A8A8B8',
          size: isCsDegree ? 12 : 8,
          ...(PRESENCE_URLS[id] ? { openUrl: PRESENCE_URLS[id] } : {}),
          ...(categoryId === 'learning' || categoryId === 'location' ? { skipDetail: true } : {}),
        });
      });
    });

    base.push({
      id: 'sub-learning-einstein-quote',
      label: '',
      type: 'sub',
      parent: 'learning',
      color: '#A8A8B8',
      size: 2,
      skipDetail: true,
      labelAnchorOnly: true,
      quoteText: '"The more I learn, the more I realize how much I don\'t know." — Einstein',
    });

    const leafGroups: Record<string, string[]> = {
      'sub-skills-backend': ['Node.js', 'Python', 'REST APIs', 'Express', 'Supabase', 'Edge Functions'],
      'sub-skills-frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Vite'],
      'sub-skills-database': ['PostgreSQL', 'Supabase', 'Firebase', 'SQL', 'Realtime DB'],
      'sub-skills-devops': ['Git', 'GitHub', 'Vercel', 'EAS', 'n8n', 'Claude API'],
    };

    Object.entries(leafGroups).forEach(([parent, labels]) => {
      labels.forEach((label) => {
        base.push({
          id: `leaf-${parent}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          label,
          type: 'leaf',
          parent,
          color: '#9CA3AF',
          size: 5,
        });
      });
    });

    return base;
  }, []);

  const nodeByIdForUi = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const closeDetailPanel = useCallback(() => {
    setDetailPanel(null);
  }, []);

  useEffect(() => {
    if (!detailPanel || !panelRef.current) return;
    gsap.fromTo(panelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
  }, [detailPanel]);

  useEffect(() => {
    if (!detailPanel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetailPanel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [detailPanel, closeDetailPanel]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c || !detailPanel) return;
    const down = (e: MouseEvent) => {
      if (panelRef.current?.contains(e.target as globalThis.Node)) return;
      if ((e.target as HTMLElement).closest('[data-universe-back]')) return;
      closeDetailPanel();
    };
    c.addEventListener('mousedown', down);
    return () => c.removeEventListener('mousedown', down);
  }, [detailPanel, closeDetailPanel]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !labelsLayerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const labelsLayer = labelsLayerRef.current;

    const nodeById = new Map(nodes.map((n) => [n.id, n]));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0c10);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000);
    camera.position.set(0, 0, 320);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableRotate = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    controls.minDistance = 80;
    controls.maxDistance = 450;
    controls.target.set(0, 0, 0);
    controls.update();

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    const categoryNodes = nodes.filter((n) => n.type === 'category');
    const childrenByParent = new Map<string, Node[]>();
    nodes.forEach((n) => {
      if (!n.parent) return;
      const list = childrenByParent.get(n.parent) ?? [];
      list.push(n);
      childrenByParent.set(n.parent, list);
    });

    const categoryTargets = fibonacciCirclePoints(categoryNodes.length, CAT_RADIUS);
    const initialPositions = new Map<string, THREE.Vector3>();
    initialPositions.set('het', new THREE.Vector3(0, 0, 0));
    categoryNodes.forEach((node, i) => {
      initialPositions.set(node.id, categoryTargets[i]);
    });

    categoryNodes.forEach((cat) => {
      const subs = (childrenByParent.get(cat.id) ?? []).filter((n) => n.type === 'sub');
      const subTargets = fibonacciCirclePoints(subs.length, SUB_RADIUS);
      const catPos = initialPositions.get(cat.id) ?? new THREE.Vector3();
      subs.forEach((sub, i) => {
        initialPositions.set(sub.id, catPos.clone().add(subTargets[i]));
      });
    });

    nodes
      .filter((n) => n.type === 'sub' && n.parent?.includes('skills'))
      .forEach((sub) => {
        const leaves = (childrenByParent.get(sub.id) ?? []).filter((n) => n.type === 'leaf');
        const leafTargets = fibonacciCirclePoints(leaves.length, LEAF_RADIUS);
        const subPos = initialPositions.get(sub.id) ?? new THREE.Vector3();
        leaves.forEach((leaf, i) => {
          initialPositions.set(leaf.id, subPos.clone().add(leafTargets[i]));
        });
      });

    const simNodes: SimNode[] = nodes.map((node) => {
      const p = initialPositions.get(node.id) ?? new THREE.Vector3();
      return {
        ...node,
        x: p.x,
        y: p.y,
        z: p.z,
        vx: 0,
        vy: 0,
        vz: 0,
        targetX: p.x,
        targetY: p.y,
        targetZ: p.z,
      };
    });

    const simLinks = nodes
      .filter((n) => n.parent)
      .map((n) => ({ source: n.parent as string, target: n.id }));

    const simulation = forceSimulation(simNodes)
      .force('charge', forceManyBody<SimNode>().strength(-45))
      .force(
        'link',
        forceLink<SimNode, { source: string | SimNode; target: string | SimNode }>(simLinks)
          .id((d) => d.id)
          .distance((d) => {
            const target = d.target as SimNode;
            if (target.type === 'category') return CAT_RADIUS;
            if (target.type === 'sub') return SUB_RADIUS;
            return LEAF_RADIUS;
          })
          .strength(0.25),
      )
      .force('collision', forceCollide<SimNode>().radius((d) => d.size + 4))
      .force('x', (alpha) => {
        simNodes.forEach((n) => {
          n.vx += (n.targetX - n.x) * 0.018 * alpha;
        });
      })
      .force('y', (alpha) => {
        simNodes.forEach((n) => {
          n.vy += (n.targetY - n.y) * 0.018 * alpha;
        });
      })
      .stop();

    for (let i = 0; i < 300; i += 1) {
      simulation.tick();
      simNodes.forEach((n) => {
        n.z = n.targetZ;
      });
    }

    const simById = new Map(simNodes.map((n) => [n.id, n]));
    const positionById = new Map<string, THREE.Vector3>();
    simById.forEach((n, id) => {
      positionById.set(id, new THREE.Vector3(n.x, n.y, n.z));
    });

    const sceneNodesById = new Map<string, SceneNode>();
    const categoryMeshes: THREE.Mesh[] = [];
    const subMeshes: THREE.Mesh[] = [];
    const leafMeshes: THREE.Mesh[] = [];
    const subsByCategory = new Map<string, string[]>();
    nodes
      .filter((n) => n.type === 'sub' && n.parent)
      .forEach((s) => {
        const list = subsByCategory.get(s.parent!) ?? [];
        list.push(s.id);
        subsByCategory.set(s.parent!, list);
      });
    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];
    const disposableTextures: THREE.Texture[] = [];
    const lineObjects: THREE.Line[] = [];

    const textureLoader = new THREE.TextureLoader();

    simNodes.forEach((node) => {
      let root: THREE.Object3D;
      let mesh: THREE.Mesh;
      let ringMesh: THREE.Mesh | undefined;

      if (node.type === 'center') {
        const group = new THREE.Group();
        const geometry = new THREE.CircleGeometry(node.size, 64);
        disposableGeometries.push(geometry);
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        disposableMaterials.push(material);
        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1, 1, 1);
        mesh.userData = { id: node.id, nodeId: node.id, type: node.type };
        textureLoader.load('/Me_Memoji_Laptop.png', (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.center.set(0.5, 0.5);
          tex.repeat.set(1, 1);
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          disposableTextures.push(tex);
          material.map = tex;
          material.needsUpdate = true;
          renderer.render(scene, camera);
        });

        const ringGeometry = new THREE.RingGeometry(44, 48, 64);
        disposableGeometries.push(ringGeometry);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0xf2664a,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        disposableMaterials.push(ringMaterial);
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.scale.set(1, 1, 1);
        ring.position.z = 0.02;
        ringMesh = ring;

        group.add(mesh);
        group.add(ring);
        root = group;
      } else if (node.type === 'category') {
        const group = new THREE.Group();
        const r = node.size;
        const geometry = new THREE.CircleGeometry(r, 64);
        disposableGeometries.push(geometry);
        const material = new THREE.MeshBasicMaterial({
          color: node.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1,
        });
        disposableMaterials.push(material);
        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1, 1, 1);
        mesh.userData = { id: node.id, nodeId: node.id, type: node.type };

        const ringGeometry = new THREE.RingGeometry(r + 2, r + 5, 64);
        disposableGeometries.push(ringGeometry);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        disposableMaterials.push(ringMaterial);
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.scale.set(1, 1, 1);
        ring.position.z = 0.02;
        ringMesh = ring;

        group.add(mesh);
        group.add(ring);
        root = group;
        categoryMeshes.push(mesh);
      } else {
        const anchorOnly = node.type === 'sub' && node.labelAnchorOnly === true;
        const radius = anchorOnly ? 0.08 : node.size;
        const geometry = new THREE.CircleGeometry(Math.max(radius, 0.08), 64);
        disposableGeometries.push(geometry);
        const material = new THREE.MeshBasicMaterial({
          color: node.type === 'sub' ? SUB_MESH_BASE_COLOR : node.color,
          side: THREE.DoubleSide,
          transparent: node.type === 'sub' || node.type === 'leaf',
          opacity: anchorOnly ? 0 : 0,
        });
        disposableMaterials.push(material);
        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1, 1, 1);
        root = mesh;
        mesh.userData = {
          id: node.id,
          nodeId: node.id,
          parentId: node.parent,
          type: node.type,
        };
        if (anchorOnly) {
          mesh.visible = false;
        } else if (node.type === 'sub') {
          subMeshes.push(mesh);
        } else {
          leafMeshes.push(mesh);
        }
      }

      root.position.set(node.x, node.y, node.z);
      mesh.visible = node.labelAnchorOnly
        ? false
        : node.type === 'center' || node.type === 'category';
      graphGroup.add(root);
      sceneNodesById.set(node.id, { data: node, root, mesh, ringMesh });
    });

    const lineMaterial = (color: string, opacity: number) => {
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        depthWrite: false,
        depthTest: false,
      });
      disposableMaterials.push(mat);
      return mat;
    };

    const drawLine = (from: THREE.Vector3, to: THREE.Vector3, color: string, opacity: number) => {
      const points = [from.clone(), to.clone()];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      disposableGeometries.push(geometry);
      const line = new THREE.Line(geometry, lineMaterial(color, opacity));
      scene.add(line);
      lineObjects.push(line);
    };

    const centerPosition = positionById.get('het');
    if (centerPosition) {
      nodes
        .filter((n) => n.type === 'category')
        .forEach((cat) => {
          const categoryPosition = positionById.get(cat.id);
          if (categoryPosition) drawLine(centerPosition, categoryPosition, cat.color, 0.5);
        });
    }

    nodes
      .filter((n) => n.type === 'sub')
      .forEach((sub) => {
        const cat = sub.parent ? nodeById.get(sub.parent) : undefined;
        const categoryPosition = sub.parent ? positionById.get(sub.parent) : undefined;
        const subPosition = positionById.get(sub.id);
        if (cat && categoryPosition && subPosition) {
          drawLine(categoryPosition, subPosition, cat.color, 0.3);
        }
      });

    nodes
      .filter((n) => n.type === 'leaf')
      .forEach((leaf) => {
        const sub = leaf.parent ? nodeById.get(leaf.parent) : undefined;
        const cat = sub?.parent ? nodeById.get(sub.parent) : undefined;
        const subPosition = leaf.parent ? positionById.get(leaf.parent) : undefined;
        const leafPosition = positionById.get(leaf.id);
        if (cat && subPosition && leafPosition) {
          drawLine(subPosition, leafPosition, cat.color, 0.15);
        }
      });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const scaleTargets = new Map<string, number>();
    nodes.forEach((n) => scaleTargets.set(n.id, 1));
    let hoveredCategoryId: string | null = null;
    let hoveredSubId: string | null = null;

    const tmp = new THREE.Vector3();
    const world = new THREE.Vector3();
    const labelBelowScratch = new THREE.Vector3();

    const applyCategoryDim = (focusedId: string | null) => {
      sceneNodesById.forEach((sn) => {
        if (sn.data.type !== 'category') return;
        const disc = sn.mesh.material as THREE.MeshBasicMaterial;
        const ringMat = sn.ringMesh?.material as THREE.MeshBasicMaterial | undefined;
        if (!focusedId) {
          disc.opacity = 1;
          if (ringMat) ringMat.opacity = 0.5;
          return;
        }
        if (sn.data.id === focusedId) {
          disc.opacity = 1;
          if (ringMat) ringMat.opacity = 0.5;
        } else {
          disc.opacity = 0.15;
          if (ringMat) ringMat.opacity = 0.12;
        }
      });
    };

    const particleBurst = (origin: THREE.Vector3, colorHex: string) => {
      for (let i = 0; i < 8; i += 1) {
        const geo = new THREE.CircleGeometry(2, 8);
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(colorHex),
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const m = new THREE.Mesh(geo, mat);
        m.position.copy(origin);
        m.lookAt(camera.position);
        scene.add(m);
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, (Math.random() - 0.5) * 0.15).normalize();
        const dist = 36 + Math.random() * 48;
        gsap.to(m.position, {
          x: origin.x + dir.x * dist,
          y: origin.y + dir.y * dist,
          z: origin.z + dir.z * dist,
          duration: 0.6,
          ease: 'power2.out',
        });
        gsap.to(mat, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            scene.remove(m);
            geo.dispose();
            mat.dispose();
          },
        });
      }
    };

    const clampPanelPos = (x: number, y: number, panelW: number, panelH: number) => {
      const pad = 12;
      const maxX = Math.max(pad, container.clientWidth - panelW - pad);
      const maxY = Math.max(pad, container.clientHeight - panelH - pad);
      return {
        x: Math.min(Math.max(pad, x), maxX),
        y: Math.min(Math.max(pad, y), maxY),
      };
    };

    const updateMouse = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const openDetailAtWorld = (n: Node, worldPos: THREE.Vector3, quickSub = false) => {
      tmp.copy(worldPos).project(camera);
      let px = (tmp.x * 0.5 + 0.5) * container.clientWidth + 28;
      let py = (-tmp.y * 0.5 + 0.5) * container.clientHeight - 28;
      const c = clampPanelPos(px, py, 280, 320);
      setDetailRef.current?.({ node: n, x: c.x, y: c.y, quickSub });
    };

    const onCanvasClick = (event: MouseEvent) => {
      updateMouse(event);
      raycaster.setFromCamera(mouse, camera);

      const leafHit = raycaster.intersectObjects(leafMeshes, false)[0];
      if (leafHit) {
        const id = (leafHit.object.userData.nodeId ?? leafHit.object.userData.id) as string;
        const hitNode = nodeById.get(id);
        if (hitNode?.type === 'leaf') {
          leafHit.object.getWorldPosition(world);
          openDetailAtWorld(hitNode, world, false);
        }
        return;
      }

      const subHit = raycaster.intersectObjects(subMeshes, false)[0];
      if (subHit) {
        const id = (subHit.object.userData.nodeId ?? subHit.object.userData.id) as string;
        const hitNode = nodeById.get(id);
        if (hitNode?.type === 'sub') {
          if (hitNode.openUrl) {
            window.open(hitNode.openUrl, '_blank', 'noopener,noreferrer');
            return;
          }
          if (hitNode.skipDetail) return;
          subHit.object.getWorldPosition(world);
          openDetailAtWorld(hitNode, world, true);
        }
        return;
      }

      const catHit = raycaster.intersectObjects(categoryMeshes, false)[0];
      if (!catHit) return;

      setDetailRef.current(null);
      const id = (catHit.object.userData.nodeId ?? catHit.object.userData.id) as string;
      const simN = simById.get(id);
      if (!simN) return;

      focusCatRef.current = id;
      setFocusRef.current(id);

      catHit.object.getWorldPosition(world);
      particleBurst(world.clone(), simN.color);

      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(controls.target);

      const nodePosition = { x: simN.x, y: simN.y, z: simN.z };
      gsap.to(camera.position, {
        x: nodePosition.x * 0.5,
        y: nodePosition.y * 0.5,
        z: 160,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.to(controls.target, {
        x: nodePosition.x,
        y: nodePosition.y,
        z: 0,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => controls.update(),
      });

      applyCategoryDim(id);

      const subIds = subsByCategory.get(id) ?? [];
      nodes
        .filter((x) => x.type === 'sub' && x.parent !== id)
        .forEach((s) => {
          const sn = sceneNodesById.get(s.id);
          if (!sn) return;
          sn.mesh.visible = false;
          sn.root.scale.set(1, 1, 1);
          const m = sn.mesh.material as THREE.MeshBasicMaterial;
          m.opacity = 0;
        });

      subIds.forEach((sid) => {
        const sn = sceneNodesById.get(sid);
        if (!sn) return;
        sn.root.visible = true;
        sn.mesh.visible = true;
        sn.root.scale.set(1, 1, 1);
        const m = sn.mesh.material as THREE.MeshBasicMaterial;
        m.opacity = 1;
      });
    };

    resetFocusHandlerRef.current = () => {
      focusCatRef.current = null;
      setFocusRef.current(null);
      setDetailRef.current(null);
      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(controls.target);
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 320,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.to(controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => controls.update(),
      });
      applyCategoryDim(null);
    };

    const centerRingMeshForPulse = sceneNodesById.get('het')?.ringMesh ?? null;
    if (centerRingMeshForPulse) {
      gsap.to(centerRingMeshForPulse.scale, {
        x: 1.08,
        y: 1.08,
        z: 1,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    renderer.domElement.addEventListener('mousemove', updateMouse);
    renderer.domElement.addEventListener('click', onCanvasClick);

    if (hintRef.current) {
      gsap.to(hintRef.current, { opacity: 0, delay: 3, duration: 1, ease: 'power1.out' });
    }

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      controls.update();

      sceneNodesById.forEach(({ root }) => {
        root.lookAt(camera.position);
      });

      raycaster.setFromCamera(mouse, camera);
      const pickTargets = [...subMeshes, ...categoryMeshes];
      const pickHits = raycaster.intersectObjects(pickTargets, false);
      hoveredSubId = null;
      hoveredCategoryId = null;
      if (pickHits.length > 0) {
        const u = pickHits[0].object.userData;
        if (u.type === 'sub') hoveredSubId = (u.nodeId ?? u.id) as string;
        else if (u.type === 'category') hoveredCategoryId = (u.nodeId ?? u.id) as string;
      }

      const cameraDistance = camera.position.length();
      let nearestCategoryId: string | null = null;
      if (cameraDistance >= 100 && cameraDistance <= 200) {
        let minDist = Number.POSITIVE_INFINITY;
        categoryMeshes.forEach((mesh) => {
          mesh.getWorldPosition(world);
          const dist = world.distanceTo(camera.position);
          if (dist < minDist) {
            minDist = dist;
            nearestCategoryId = mesh.userData.id as string;
          }
        });
      }

      const fid = focusCatRef.current;

      sceneNodesById.forEach(({ data, mesh }) => {
        if (data.type === 'category') {
          scaleTargets.set(data.id, hoveredCategoryId === data.id ? 1.2 : 1);
        }

        if (data.type === 'sub' || data.type === 'leaf') {
          const material = mesh.material as THREE.MeshBasicMaterial;
          let targetOpacity = 0;
          let shouldBeVisible = false;

          if (data.type === 'sub' && data.labelAnchorOnly) {
            mesh.visible = false;
            material.opacity = 0;
            return;
          }

          if (fid) {
            if (data.type === 'sub') {
              if (data.parent === fid) {
                shouldBeVisible = true;
                targetOpacity = 1;
              } else {
                shouldBeVisible = false;
                targetOpacity = 0;
              }
            } else if (data.type === 'leaf') {
              const underSkills = data.parent?.startsWith('sub-skills') ?? false;
              if (fid === 'skills' && underSkills) {
                shouldBeVisible = cameraDistance < 130;
                targetOpacity = shouldBeVisible ? 1 : 0;
              } else {
                shouldBeVisible = false;
                targetOpacity = 0;
              }
            }
          } else if (data.type === 'sub') {
            if (cameraDistance > 350) {
              shouldBeVisible = false;
            } else if (cameraDistance > 200) {
              shouldBeVisible = true;
              targetOpacity = 0.25;
            } else if (cameraDistance > 100) {
              shouldBeVisible = true;
              targetOpacity = data.parent === nearestCategoryId ? 1 : 0.3;
            } else {
              shouldBeVisible = true;
              targetOpacity = data.parent === nearestCategoryId ? 1 : 0.4;
            }
            if (hoveredCategoryId && data.parent === hoveredCategoryId) {
              shouldBeVisible = true;
              targetOpacity = Math.max(targetOpacity, 0.3);
            }
          } else if (data.type === 'leaf') {
            shouldBeVisible = cameraDistance < 100;
            targetOpacity = shouldBeVisible ? 1 : 0;
          }

          mesh.visible = shouldBeVisible;
          material.opacity += (targetOpacity - material.opacity) * 0.12;
        }
      });

      sceneNodesById.forEach(({ data, mesh }) => {
        if (data.type !== 'sub') return;
        if (data.labelAnchorOnly) return;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        const pid = data.parent;
        const cat = pid ? nodeById.get(pid) : undefined;
        if (hoveredSubId === data.id && cat) {
          mat.color.set(cat.color);
        } else {
          mat.color.setHex(SUB_MESH_BASE_COLOR);
        }
      });

      const HOVER_MAX_SCALE = 1.2;

      sceneNodesById.forEach(({ data, root, mesh, ringMesh }) => {
        if (data.type === 'category' || data.type === 'center') {
          const target = scaleTargets.get(data.id) ?? 1;
          let next = THREE.MathUtils.lerp(root.scale.x, target, 0.15);
          next = Math.min(HOVER_MAX_SCALE, Math.max(1, next));
          if (!Number.isFinite(next)) next = 1;
          root.scale.set(next, next, next);
          mesh.scale.set(1, 1, 1);
          if (ringMesh && data.type === 'category') ringMesh.scale.set(1, 1, 1);
          return;
        }
        if (data.type === 'sub') {
          if (data.labelAnchorOnly) return;
          const hovered = hoveredSubId === data.id && mesh.visible;
          let h = hovered ? 1.15 : 1;
          h = Math.min(HOVER_MAX_SCALE, h);
          if (!Number.isFinite(h)) h = 1;
          root.scale.set(h, h, h);
          return;
        }
        if (data.type === 'leaf') {
          root.scale.set(1, 1, 1);
        }
      });

      sceneNodesById.forEach(({ data, root, mesh, ringMesh }) => {
        if (Math.abs(root.scale.x - root.scale.y) > 1e-4 || Math.abs(root.scale.x - root.scale.z) > 1e-4) {
          const u = (root.scale.x + root.scale.y + root.scale.z) / 3;
          root.scale.set(u, u, u);
        }
        if (data.type === 'sub' || data.type === 'leaf') {
          const hovered = data.type === 'sub' && hoveredSubId === data.id && mesh.visible;
          if (!hovered && (Math.abs(root.scale.x - 1) > 1e-4 || Math.abs(root.scale.y - 1) > 1e-4)) {
            root.scale.set(1, 1, 1);
          }
        }
        if (data.type === 'category' || data.type === 'center') {
          mesh.scale.set(1, 1, 1);
          if (ringMesh && data.type === 'category') ringMesh.scale.set(1, 1, 1);
        }
      });

      const tt = tooltipRef.current;
      if (tt) {
        if (!fid && hoveredCategoryId) {
          const sn = sceneNodesById.get(hoveredCategoryId);
          if (sn) {
            sn.mesh.getWorldPosition(tmp);
            tmp.project(camera);
            const tx = (tmp.x * 0.5 + 0.5) * container.clientWidth;
            const ty = (-tmp.y * 0.5 + 0.5) * container.clientHeight;
            tt.style.display = 'block';
            tt.textContent = CATEGORY_TOOLTIP[hoveredCategoryId] ?? '';
            tt.style.left = `${tx}px`;
            tt.style.top = `${ty - 32}px`;
            tt.style.transform = 'translate(-50%, -100%)';
          }
        } else {
          tt.style.display = 'none';
        }
      }

      nodes.forEach((node) => {
        const label = labelRefs.current[node.id];
        const sceneNode = sceneNodesById.get(node.id);
        if (!label || !sceneNode) return;

        const cw = container.clientWidth;
        const ch = container.clientHeight;

        sceneNode.mesh.getWorldPosition(world);
        tmp.copy(world);
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * cw;

        labelBelowScratch.copy(world);
        labelBelowScratch.y -= node.size;
        labelBelowScratch.project(camera);
        const yBelow = (-labelBelowScratch.y * 0.5 + 0.5) * ch + 10;

        const inFront = tmp.z >= -1 && tmp.z <= 1;
        let visMesh = node.type === 'center' || node.type === 'category' ? true : sceneNode.mesh.visible;
        if (node.quoteText) {
          visMesh =
            focusCatRef.current === 'learning' ||
            (!focusCatRef.current && nearestCategoryId === 'learning' && cameraDistance < 260);
        }
        const visible = inFront && visMesh;

        label.style.display = visible ? 'block' : 'none';
        if (!visible) return;

        label.style.left = `${x}px`;
        label.style.top = `${yBelow}px`;
        label.style.transform = 'translateX(-50%)';
        label.style.filter = 'none';

        if (node.type === 'sub') {
          if (node.quoteText) {
            label.style.opacity = visMesh ? '0.95' : '0';
          } else {
            label.style.opacity = cameraDistance < 200 ? '0.8' : '0';
          }
          label.style.color = hoveredSubId === node.id && node.parent ? (nodeById.get(node.parent)?.color ?? '#A8A8B8') : '#A8A8B8';
        } else {
          label.style.opacity = '1';
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(controls.target);
      if (centerRingMeshForPulse) gsap.killTweensOf(centerRingMeshForPulse.scale);
      resetFocusHandlerRef.current = null;
      controls.dispose();
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', updateMouse);
      renderer.domElement.removeEventListener('click', onCanvasClick);
      simulation.stop();

      lineObjects.forEach((l) => scene.remove(l));
      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      disposableTextures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [nodes]);

  return (
    <section id="universe" className="section-bg-universe relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}>
          // 02 · universe
        </p>

        <h2
          className="text-[clamp(34px,8vw,52px)] mb-2"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-1px',
          }}
        >
          The full picture.
        </h2>

        <p className="text-[13px] mb-8 md:mb-12" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Click any node to explore · Drag to rearrange.
        </p>

        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: 'clamp(420px, 70vh, 700px)',
            borderRadius: '20px',
            overflow: 'hidden',
            background: '#0C0C10',
            position: 'relative',
          }}
        >
          {focusedCategoryId ? (
            <button
              type="button"
              data-universe-back
              onClick={() => resetFocusHandlerRef.current?.()}
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 8,
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 12,
                color: '#A8A8B8',
                padding: '8px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(12,12,16,0.55)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              ← universe
            </button>
          ) : null}
          <div
            ref={tooltipRef}
            style={{
              display: 'none',
              position: 'absolute',
              zIndex: 7,
              pointerEvents: 'none',
              background: 'rgba(12,12,16,0.85)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '6px 12px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              color: '#A8A8B8',
              whiteSpace: 'nowrap',
            }}
          />
          {detailPanel ? (
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                left: detailPanel.x,
                top: detailPanel.y,
                width: 'min(280px, calc(100vw - 32px))',
                zIndex: 10,
                background: 'rgba(12,12,16,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 40px rgba(0,0,0,0.4)',
              }}
            >
              {detailPanel.quickSub ? (
                <UniverseSimpleSubDetail node={detailPanel.node} byId={nodeByIdForUi} />
              ) : (
                <UniverseDetailBody node={detailPanel.node} byId={nodeByIdForUi} />
              )}
            </div>
          ) : null}
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 1 }} />
          <div
            ref={labelsLayerRef}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {nodes.map((node) => {
              const baseLabel: CSSProperties = {
                position: 'absolute',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                transform: 'translateX(-50%)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: '#F0EDE8',
                fontWeight: 600,
                textShadow: '0 2px 8px rgba(0,0,0,1), 0 0 12px rgba(0,0,0,0.9)',
                opacity: 1,
                filter: 'none',
              };

              if (node.type === 'category') {
                return (
                  <div
                    key={node.id}
                    ref={(el) => {
                      labelRefs.current[node.id] = el;
                    }}
                    style={{
                      ...baseLabel,
                      fontSize: '13px',
                      color: node.color,
                      fontWeight: 700,
                    }}
                  >
                    {node.label}
                  </div>
                );
              }

              if (node.type === 'center') {
                return (
                  <div
                    key={node.id}
                    ref={(el) => {
                      labelRefs.current[node.id] = el;
                    }}
                    style={{
                      ...baseLabel,
                      color: '#F0EDE8',
                    }}
                  >
                    {node.label}
                  </div>
                );
              }

              if (node.type === 'sub') {
                return (
                  <div
                    key={node.id}
                    ref={(el) => {
                      labelRefs.current[node.id] = el;
                    }}
                    style={{
                      ...baseLabel,
                      ...(node.quoteText
                        ? {
                            fontSize: '11px',
                            color: '#9CA3AF',
                            fontStyle: 'italic',
                            fontWeight: 500,
                            whiteSpace: 'normal',
                            maxWidth: 220,
                            lineHeight: 1.35,
                          }
                        : {
                            fontSize: '10px',
                            color: '#A8A8B8',
                            fontWeight: 600,
                            transition: 'opacity 0.3s ease',
                          }),
                    }}
                  >
                    {node.quoteText ?? node.label}
                  </div>
                );
              }

              return (
                <div
                  key={node.id}
                  ref={(el) => {
                    labelRefs.current[node.id] = el;
                  }}
                  style={{
                    ...baseLabel,
                    fontSize: '12px',
                    color: '#F0EDE8',
                  }}
                >
                  {node.label}
                </div>
              );
            })}
          </div>
          <div
            ref={hintRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 3,
              fontFamily: 'JetBrains Mono, monospace',
              color: '#A8A8B8',
              fontSize: '11px',
              opacity: 1,
            }}
          >
            hover to discover · click to explore
          </div>
        </div>
      </div>
    </section>
  );
}