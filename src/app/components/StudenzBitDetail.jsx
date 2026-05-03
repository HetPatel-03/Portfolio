import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ARCH_NODES = [
  { id: 'google', x: 150, y: 60, label: 'Google Search', sub: 'SEO · Schema', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'ai', x: 400, y: 60, label: 'AI Search', sub: 'llms.txt', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'social', x: 650, y: 60, label: 'Social', sub: 'Instagram · Word', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'landing', x: 400, y: 180, label: 'Landing Page', sub: 'HTML · GSAP', color: '#0D9488', bg: '#CCFBF1' },
  { id: 'housing', x: 100, y: 300, label: 'Housing', sub: 'Category Page', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'banking', x: 300, y: 300, label: 'Banking', sub: 'Category Page', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'sim', x: 500, y: 300, label: 'SIM Cards', sub: 'Category Page', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'ohip', x: 700, y: 300, label: 'OHIP', sub: 'Category Page', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'map', x: 900, y: 300, label: 'D3.js Map', sub: 'Interactive SVG', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'blog', x: 400, y: 420, label: 'Arjun & Priya', sub: 'Blog System', color: '#B45309', bg: '#FEF3C7' },
  { id: 'schema', x: 150, y: 420, label: 'Schema Markup', sub: 'JSON-LD · OG', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'amazon', x: 250, y: 540, label: 'Amazon.ca', sub: 'Affiliate', color: '#B45309', bg: '#FEF3C7' },
  { id: 'ga4', x: 550, y: 540, label: 'GA4', sub: 'Analytics', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'supabase', x: 750, y: 540, label: 'Supabase', sub: 'Future · Auth', color: '#9CA3AF', bg: '#F3F4F6', dashed: true },
  { id: 'community', x: 900, y: 540, label: 'Community', sub: 'Future · Q&A', color: '#9CA3AF', bg: '#F3F4F6', dashed: true },
  { id: 'settled', x: 400, y: 660, label: 'Student Settled ✓', sub: 'Goal achieved', color: '#0D9488', bg: '#CCFBF1' },
];

const ARCH_EDGES = [
  { from: 'google', to: 'landing' },
  { from: 'ai', to: 'landing' },
  { from: 'social', to: 'landing' },
  { from: 'landing', to: 'housing' },
  { from: 'landing', to: 'banking' },
  { from: 'landing', to: 'sim' },
  { from: 'landing', to: 'ohip' },
  { from: 'landing', to: 'map' },
  { from: 'housing', to: 'blog' },
  { from: 'banking', to: 'blog' },
  { from: 'sim', to: 'blog' },
  { from: 'ohip', to: 'blog' },
  { from: 'schema', to: 'google' },
  { from: 'schema', to: 'ai' },
  { from: 'blog', to: 'schema' },
  { from: 'blog', to: 'amazon' },
  { from: 'amazon', to: 'settled' },
  { from: 'ga4', to: 'blog' },
  { from: 'supabase', to: 'community', dashed: true },
  { from: 'community', to: 'settled', dashed: true },
];

const ARCH_LEGEND = [
  { color: '#7C3AED', bg: '#EDE9FE', label: 'Discovery' },
  { color: '#0D9488', bg: '#CCFBF1', label: 'Frontend' },
  { color: '#0369A1', bg: '#E0F2FE', label: 'Content' },
  { color: '#B45309', bg: '#FEF3C7', label: 'Monetization' },
  { color: '#9CA3AF', bg: '#F3F4F6', label: 'Future Roadmap' },
];

const WHAT_BROKE_CARDS = [
  {
    number: '01',
    problem: 'D3.js map not rendering on mobile',
    cause:
      "SVG viewport wasn't respecting device width. The map was rendering off-screen on anything below 768px.",
    fix: 'Added viewport detection. Below 768px switches to a static image fallback. Above 768px loads the full D3 interactive map.',
    tag: 'Frontend Bug',
  },
  {
    number: '02',
    problem: 'Affiliate links flagged by Google',
    cause: "Raw affiliate links without proper attribution were being treated as manipulative by Google's crawler.",
    fix: "Added rel='sponsored' and rel='nofollow' to all affiliate links. Cleaned up anchor text to be descriptive not clickbait.",
    tag: 'SEO Fix',
  },
  {
    number: '03',
    problem: 'AI crawlers ignoring blog content',
    cause: 'Blog posts had inconsistent heading hierarchy. H1 → H4 jumps confused AI parsers.',
    fix: 'Restructured all headings H1 → H2 → H3 strictly. Added llms.txt with explicit content map and blog index.',
    tag: 'AI Visibility',
  },
];

const PASTEL_SWATCHES = [
  { hex: '#0D9488', name: 'Teal', role: 'Primary · Trust · Navigation' },
  { hex: '#F9A8D4', name: 'Blush', role: 'Warmth · Approachability' },
  { hex: '#FDE68A', name: 'Gold', role: 'Optimism · Highlights' },
  { hex: '#E9D5FF', name: 'Lavender', role: 'Calm · Secondary BG' },
  { hex: '#FFF7ED', name: 'Cream', role: 'Base · Breathing Room' },
];

const RESULTS_METRICS = [
  { number: '95+', label: 'Lighthouse Score', sub: 'Performance · SEO · Accessibility' },
  { number: '30+', label: 'Pages Engineered', sub: 'All hand-coded, no CMS' },
  { number: '10+', label: 'Blog Posts', sub: 'Arjun & Priya series' },
  { number: '2026', label: 'Year Launched', sub: 'Shipped and live' },
];

const RETRO_ITEMS = [
  {
    number: '01',
    title: 'Start with Supabase from day one',
    body: 'Adding authentication and user accounts after the fact is painful. The database schema needs to inform the content structure, not the other way around.',
  },
  {
    number: '02',
    title: 'Build the blog system before the static pages',
    body: 'Content should drive structure. I built the shell first and retrofitted the blog — it created inconsistencies in the heading hierarchy that hurt SEO early on.',
  },
  {
    number: '03',
    title: 'Add analytics on day one, not after launch',
    body: "I lost the first week of traffic data. That's the most valuable data — first visitors, first searches, first clicks. Never again.",
  },
];

const ROADMAP_ITEMS = [
  {
    tag: 'PHASE 2',
    title: 'User Accounts',
    body: 'Supabase Auth + Postgres. Students save checklists, track progress, resume where they left off.',
    color: '#0D9488',
  },
  {
    tag: 'PHASE 2',
    title: 'Document Marketplace',
    body: 'Student-created guides for sale. Supabase Storage + payment integration. Community monetization.',
    color: '#0D9488',
  },
  {
    tag: 'PHASE 3',
    title: 'Peer Q&A Community',
    body: 'Students helping students. Upvoting, verified answers, city-specific channels.',
    color: '#7C3AED',
  },
  {
    tag: 'PHASE 3',
    title: 'Affiliate Expansion',
    body: 'Canadian banks, telcos, housing platforms. Higher commission rates, sponsored placements.',
    color: '#7C3AED',
  },
];

const archNodeById = ARCH_NODES.reduce((acc, n) => {
  acc[n.id] = n;
  return acc;
}, {});

const ENGINEERING_DECISIONS = [
  {
    id: '1',
    ghost: '01',
    borderTop: '#0D9488',
    pill: {
      background: 'rgba(13,148,136,0.07)',
      border: '1px solid rgba(13,148,136,0.15)',
      color: '#0D9488',
    },
    title: 'Why Static HTML Over a Framework',
    tags: ['Static HTML', 'Vanilla JS', 'GSAP', 'Lighthouse'],
    impacts: [
      '95+ Lighthouse score',
      'Zero JS bundle overhead',
      'Full SEO crawlability',
      'No maintenance burden',
    ],
    paragraphs: [
      "When I started StudenzBit, the obvious choice for most developers in 2024 would have been React or Next.js. I knew both. I could have used either. I didn't.",
      'The product is a content platform — guides, blogs, resource pages. There is no dynamic state. There are no API calls on render. There is no user session to manage on the frontend. Reaching for React here would have been the same mistake junior developers make every time they start a project — defaulting to the familiar rather than choosing the appropriate.',
      "Static HTML meant zero JavaScript bundle overhead. Every page loaded in under a second. Google's crawler never had to wait for hydration. When I ran Lighthouse, the scores weren't optimized — they were just the natural result of not shipping unnecessary code. The constraint became the feature.",
    ],
  },
  {
    id: '2',
    ghost: '02',
    borderTop: '#7C3AED',
    pill: {
      background: 'rgba(124,58,237,0.07)',
      border: '1px solid rgba(124,58,237,0.15)',
      color: '#7C3AED',
    },
    title: 'How I Approached Discoverability',
    tags: ['JSON-LD', 'Schema', 'GA4', 'llms.txt', 'OpenGraph'],
    impacts: [
      'Indexed on Google + AI search',
      'Rich results via JSON-LD',
      'AI crawler ready via llms.txt',
      'Dual discovery channels',
    ],
    paragraphs: [
      "Most developers think about SEO as an afterthought — metadata tags added before deployment, a sitemap submitted to Search Console, and done. I treated discoverability as a core architectural decision because the product only has value if students can find it.",
      "There were two distinct audiences I needed to reach: Google's traditional crawler and the new generation of AI-powered search tools. These two systems have fundamentally different expectations. For Google, I implemented JSON-LD structured data on every page — WebPage schema on landing pages, Article schema on blog posts, FAQPage schema on resource guides.",
      "For AI search, I created an llms.txt file — an emerging standard that explicitly tells AI crawlers what the site contains, how it's structured, and which pages are most valuable. I also structured every blog post with a clear summary section at the top because AI systems extract and surface those summaries directly in search responses.",
    ],
  },
  {
    id: '3',
    ghost: '03',
    borderTop: '#B45309',
    pill: {
      background: 'rgba(180,83,9,0.07)',
      border: '1px solid rgba(180,83,9,0.15)',
      color: '#B45309',
    },
    title: 'The Character System as a Technical Strategy',
    tags: ['Blog System', 'Long-tail SEO', 'Arjun & Priya', 'Templates'],
    impacts: [
      'Low-competition keywords',
      'Consistent content structure',
      'Evergreen narrative',
      'Higher time-on-page signals',
    ],
    paragraphs: [
      "Arjun and Priya are not a gimmick. They are a content architecture decision. The core problem with information platforms is content decay — guides become outdated, pages lose relevance, and maintaining accuracy across dozens of pages becomes a maintenance burden no solo developer can sustain.",
      "Character-driven narrative solved three problems simultaneously. First, evergreen content — Arjun and Priya's experience of arriving in Canada is the same for every international student regardless of year. Second, SEO — character-driven content naturally generates long-tail keywords that face almost zero competition. Third, consistency — every blog post inherits the same HTML structure, schema markup, and OpenGraph format automatically.",
      "From a technical standpoint, I built a reusable blog template so every new post ships with full SEO setup out of the box. No manual meta tags. No forgotten schema. The system does it.",
    ],
  },
];

export default function StudenzBitDetail() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const section2Ref = useRef(null);
  const heroTextRef = useRef(null);
  const [archTooltip, setArchTooltip] = useState({ visible: false, label: '', x: 0, y: 0 });

  const portfolioLinkRef = useRef(null);
  const heroStampRef = useRef(null);
  const statRowRefs = useRef([]);
  const heroLineIntoRef = useRef(null);
  const heroLineUnknownRef = useRef(null);
  const heroSublineRef = useRef(null);
  const heroButtonsRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current || !heroRef.current || !section2Ref.current) return undefined;

    const ctx = gsap.context(() => {
      const heroBtns = heroButtonsRef.current
        ? Array.from(heroButtonsRef.current.querySelectorAll('button'))
        : [];

      gsap.set(
        [
          portfolioLinkRef.current,
          heroStampRef.current,
          ...statRowRefs.current,
          heroLineIntoRef.current,
          heroLineUnknownRef.current,
          heroSublineRef.current,
          ...heroBtns,
        ].filter(Boolean),
        { opacity: 0 }
      );

      const intro = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

      intro.fromTo(
        portfolioLinkRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0 },
        0.2
      );

      intro.fromTo(
        heroStampRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0 },
        0.4
      );

      intro.fromTo(
        statRowRefs.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.15 },
        0.5
      );

      intro.fromTo(
        heroLineIntoRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        0.6
      );

      intro.fromTo(
        heroLineUnknownRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        0.75
      );

      intro.fromTo(
        heroSublineRef.current,
        { opacity: 0 },
        { opacity: 1 },
        0.9
      );

      intro.fromTo(
        heroBtns,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1 },
        1.0
      );

      if (heroTextRef.current) {
        gsap.to(heroTextRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'center top',
            end: 'bottom top',
            scrub: 1,
          },
          opacity: 0,
          y: -40,
          ease: 'none',
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const techCards = [
    { tech: 'Vanilla JS', desc: 'No framework overhead. Ships faster, Lighthouse scores higher.' },
    { tech: 'D3.js', desc: 'Interactive map rendering. Full SVG control over visualizations.' },
    { tech: 'Schema Markup', desc: 'JSON-LD + OpenGraph. Built for AI and search discoverability.' },
    { tech: 'Amazon Affiliate', desc: 'Monetization layer via Associates program. Revenue from day one.' },
    { tech: 'llms.txt', desc: 'AI search visibility. Structured for AI crawlers.' },
  ];

  return (
    <div ref={rootRef} style={{ position: 'relative', background: '#000', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;800;900&family=DM+Sans:wght@300;400;700&display=swap');
        html, body, #root {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
      `}</style>

      <section
        ref={heroRef}
        style={{
          position: 'relative',
          top: 0,
          marginTop: 0,
          height: '100vh',
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/Studenzbit_1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.38)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '2.5rem',
            zIndex: 10,
          }}
        >
          <a
            ref={portfolioLinkRef}
            href="https://portfolio-gules-kappa-5g75m34zuy.vercel.app/#"
            style={{
              display: 'inline-block',
              marginBottom: '1.2rem',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
          >
            ← Portfolio
          </a>

          <div ref={heroStampRef}>
            <p
              style={{
                margin: 0,
                fontFamily: 'Unbounded, sans-serif',
                fontWeight: 800,
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                color: '#fff',
                marginBottom: '0.3rem',
              }}
            >
              TECHNICAL DEEP DIVE
            </p>
            <p
              style={{
                margin: '0 0 2rem 0',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              HTML · CSS · JS · D3.js · GSAP · Supabase
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
              {[
                {
                  value: '95+',
                  label: 'Lighthouse Score',
                  descriptor: '↳ No framework, zero bloat',
                },
                {
                  value: '30+',
                  label: 'Pages Engineered',
                  descriptor: '↳ All hand-coded, no CMS',
                },
                {
                  value: '2',
                  label: 'Monetization Streams',
                  descriptor: '↳ Affiliate + Digital Products',
                },
              ].map((s, idx) => (
                <div key={s.label}>
                  <div
                    ref={(el) => {
                      statRowRefs.current[idx] = el;
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'Unbounded, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.4rem',
                        color: '#fff',
                        lineHeight: 1.1,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.4)',
                        textTransform: 'uppercase',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.35)',
                        fontStyle: 'italic',
                        marginBottom: 0,
                      }}
                    >
                      {s.descriptor}
                    </div>
                  </div>
                  {idx < 2 ? (
                    <div
                      style={{
                        width: '40px',
                        height: '1px',
                        background: 'rgba(255,255,255,0.1)',
                        margin: '0.8rem 0',
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={heroTextRef}
          style={{
            position: 'absolute',
            bottom: '6rem',
            right: '2.5rem',
            zIndex: 10,
            textAlign: 'left',
          }}
        >
          <span
            ref={heroLineIntoRef}
            style={{
              display: 'block',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '-0.8rem',
              letterSpacing: '0.02em',
              position: 'relative',
              zIndex: 2,
            }}
          >
            into the unknown
          </span>
          <span
            ref={heroLineUnknownRef}
            style={{
              display: 'block',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              position: 'relative',
              zIndex: 1,
            }}
          >
            STUDENZBIT
          </span>
          <p
            ref={heroSublineRef}
            style={{
              display: 'block',
              marginTop: '0.8rem',
              maxWidth: '280px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.82rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              zIndex: 10,
            }}
          >
            A survival guide for international students
            <br />
            landing in Canada
          </p>
        </div>

        <div
          ref={heroButtonsRef}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '2.5rem',
            display: 'flex',
            gap: '1rem',
            zIndex: 10,
          }}
        >
          <button
            type="button"
            onClick={() => window.open('https://studenzbit.com', '_blank')}
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '50px',
              padding: '0.75rem 1.5rem',
              color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }}
          >
            Visit StudenzBit ↗
          </button>

          <button
            type="button"
            onClick={() => section2Ref.current?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: '#0D9488',
              border: 'none',
              borderRadius: '50px',
              padding: '0.75rem 1.5rem',
              color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              boxShadow: '0 0 20px rgba(13,148,136,0.4)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0f9e92';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(13,148,136,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0D9488';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(13,148,136,0.4)';
            }}
          >
            View Case Study ↓
          </button>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: '1px',
            height: '40px',
            background: 'rgba(255,255,255,0.3)',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15,10,30,0.6) 70%, rgba(15,10,30,0.85) 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      </section>

      <section
        ref={section2Ref}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          backgroundImage:
            "url('/Studenzbit_2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.18)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to bottom, rgba(15,10,30,0.85) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: 0,
            padding: '5rem 3rem 3rem 3rem',
            alignItems: 'start',
            zIndex: 10,
          }}
        >
          <div
            style={{
              gridColumn: 1,
              gridRow: 1,
              paddingRight: '2rem',
              paddingTop: '2rem',
            }}
          >
            <span
              style={{
                width: '50px',
                height: '1px',
                background: 'rgba(45,26,14,0.35)',
                marginBottom: '0.8rem',
                display: 'block',
              }}
            />
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: 'rgba(45,26,14,0.55)',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
                display: 'block',
              }}
            >
              PROBLEM STATEMENT
            </span>
            <div
              style={{
                fontFamily: 'Unbounded, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                color: '#2d1a0e',
                lineHeight: 1.05,
              }}
            >
              <span style={{ display: 'block' }}>The Problem</span>
              <span style={{ display: 'block' }}>I Solved.</span>
            </div>
          </div>

          <div
            style={{
              gridColumn: 2,
              gridRow: 1,
              paddingLeft: '2rem',
              paddingTop: '6rem',
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 300,
                fontSize: '0.88rem',
                color: 'rgba(45,26,14,0.75)',
                lineHeight: 1.85,
              }}
            >
              International students arriving in Canada face a fragmented information problem — SIM cards, banking,
              housing, and OHIP each require separate research across unreliable sources. No single platform existed
              targeting Canada-bound international students specifically.
              <br />
              <br />
              StudenzBit consolidates this into one curated platform: structured guides, character-driven blog content,
              and affiliate-monetized resource pages — built for discoverability from day one.
            </p>
          </div>

          <div
            style={{
              gridColumn: '1 / -1',
              gridRow: 2,
              marginTop: '2.5rem',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {techCards.map((card) => (
                <div
                  key={card.tech}
                  style={{
                    width: 'calc(20% - 0.75rem)',
                    minWidth: '160px',
                    flex: 1,
                    boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(45,26,14,0.15)',
                    borderRadius: '10px',
                    padding: '0.9rem 1rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.45)';
                    e.currentTarget.style.borderColor = 'rgba(45,26,14,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                    e.currentTarget.style.borderColor = 'rgba(45,26,14,0.15)';
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Unbounded, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      color: '#2d1a0e',
                      marginBottom: '0.3rem',
                      display: 'block',
                    }}
                  >
                    {card.tech}
                  </span>
                  <div
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.72rem',
                      color: 'rgba(45,26,14,0.6)',
                      lineHeight: 1.6,
                    }}
                  >
                    {card.desc}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '2rem',
                width: '100%',
                height: '1px',
                background:
                  'linear-gradient(to right, transparent 0%, rgba(45,26,14,0.25) 20%, rgba(45,26,14,0.25) 80%, transparent 100%)',
              }}
            />

            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <a
                href="https://github.com/studenzbit/studenzbit.git"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(45,26,14,0.08)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(45,26,14,0.2)',
                  borderRadius: '50px',
                  padding: '0.75rem 1.5rem',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  color: '#2d1a0e',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(45,26,14,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(45,26,14,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(45,26,14,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(45,26,14,0.2)';
                }}
              >
                View Source on GitHub ↗
              </a>
              <a
                href="https://studenzbit.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#0D9488',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.75rem 1.5rem',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(13,148,136,0.35)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0f9e92';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(13,148,136,0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0D9488';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(13,148,136,0.35)';
                }}
              >
                Visit Live Site ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="sb-s3-pad"
        style={{
          background: '#F0EBFF',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          padding: '6rem 4rem',
          opacity: 1,
        }}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1000px',
            margin: '0 auto 4rem auto',
            textAlign: 'left',
          }}
        >
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(13,148,136,0.7)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              display: 'block',
            }}
          >
            ENGINEERING DECISIONS
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(13,148,136,0.3)',
              marginBottom: '1.2rem',
            }}
          />
          <h2
            style={{
              margin: '0 0 0.8rem 0',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#1a0a3d',
              lineHeight: 1.05,
            }}
          >
            the thinking behind the build
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.92rem',
              color: 'rgba(26,10,61,0.5)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            Three decisions that shaped everything.
          </p>
        </div>

        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {ENGINEERING_DECISIONS.map((card) => (
            <div
              key={card.id}
              style={{
                background: 'white',
                borderRadius: '14px',
                boxShadow: '0 2px 20px rgba(26,10,61,0.07)',
                overflow: 'hidden',
                position: 'relative',
                borderTop: `3px solid ${card.borderTop}`,
              }}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '1.5rem',
                  fontFamily: 'Unbounded, sans-serif',
                  fontWeight: 900,
                  fontSize: '8rem',
                  color: 'rgba(13,148,136,0.04)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  lineHeight: 1,
                  zIndex: 0,
                }}
              >
                {card.ghost}
              </span>
              <div style={{ position: 'relative', zIndex: 1, padding: '2.2rem 2.4rem' }}>
                <div style={{ marginBottom: '1.8rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: card.pill.background,
                      border: card.pill.border,
                      borderRadius: '20px',
                      padding: '0.3rem 0.85rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.62rem',
                        letterSpacing: '0.12em',
                        color: card.pill.color,
                      }}
                    >
                      ENGINEERING DECISION · {card.ghost}
                    </span>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: 'Unbounded, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                      color: '#1a0a00',
                      lineHeight: 1.1,
                    }}
                  >
                    {card.title}
                  </h3>
                </div>

                <div
                  className="sb-s3-card-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '220px 1fr',
                    gap: '2.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(26,10,0,0.06)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: 'rgba(26,10,0,0.04)',
                            border: '1px solid rgba(26,10,0,0.08)',
                            borderRadius: '4px',
                            padding: '0.25rem 0.6rem',
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 400,
                            fontSize: '0.68rem',
                            color: 'rgba(26,10,0,0.5)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '1px',
                        background: 'rgba(26,10,0,0.06)',
                        marginBottom: '1.2rem',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        color: 'rgba(13,148,136,0.6)',
                        textTransform: 'uppercase',
                        marginBottom: '0.8rem',
                        display: 'block',
                      }}
                    >
                      WHAT THIS ENABLED
                    </span>
                    {card.impacts.map((line) => (
                      <div
                        key={line}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.4rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 400,
                            fontSize: '0.72rem',
                            color: '#0D9488',
                            flexShrink: 0,
                          }}
                        >
                          →
                        </span>
                        <span
                          style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 300,
                            fontSize: '0.75rem',
                            color: 'rgba(26,10,0,0.6)',
                            lineHeight: 1.5,
                          }}
                        >
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {card.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontWeight: 300,
                          fontSize: '0.88rem',
                          color: 'rgba(26,10,0,0.68)',
                          lineHeight: 2,
                          margin: '0 0 1.2rem 0',
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: '1000px',
            margin: '3rem auto 0 auto',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(13,148,136,0.15)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 600,
              fontSize: '1.1rem',
              color: '#0D9488',
              borderLeft: '3px solid #0D9488',
              paddingLeft: '1.2rem',
              lineHeight: 1.6,
            }}
          >
            These weren&apos;t the easiest decisions.
            <br />
            They were the right ones.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .sb-s3-pad, .sb-s4-pad, .sb-s5-pad, .sb-s6-pad, .sb-s7-pad, .sb-s8-pad, .sb-s9-pad, .sb-s10-pad {
            padding: 4rem 1.5rem !important;
          }
          .sb-s3-card-grid { grid-template-columns: 1fr !important; gap: 1.75rem !important; }
          .sb-s6-two-col { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .sb-s7-metrics { grid-template-columns: 1fr !important; max-width: 100% !important; }
          .sb-s9-roadmap { grid-template-columns: 1fr !important; }
          .sb-s5-cause-fix { grid-template-columns: 1fr !important; }
          .sb-s10-btns { flex-direction: column !important; align-items: stretch !important; }
        }
      `}</style>

      {/* Section 4 — Architecture */}
      <section
        className="sb-s4-pad"
        style={{
          background: '#F0EBFF',
          minHeight: '100vh',
          padding: '6rem 4rem',
          position: 'relative',
          opacity: 1,
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(88,28,220,0.5)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              display: 'block',
            }}
          >
            ARCHITECTURE
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(88,28,220,0.2)',
              marginBottom: '1.2rem',
            }}
          />
          <h2
            style={{
              margin: '0 0 0.5rem 0',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#1a0a3d',
            }}
          >
            how it all connects
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.88rem',
              color: 'rgba(26,10,61,0.55)',
              margin: '0 0 3rem 0',
              maxWidth: '520px',
            }}
          >
            From a student&apos;s first Google search
            <br />
            to becoming settled in Canada.
          </p>

          <svg
            width="100%"
            viewBox="0 0 1050 740"
            style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
            aria-label="StudenzBit architecture diagram"
          >
            <defs>
              <marker id="arrow-pastel" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="rgba(13,148,136,0.4)" />
              </marker>
            </defs>
            {ARCH_EDGES.map((edge) => {
              const from = archNodeById[edge.from];
              const to = archNodeById[edge.to];
              if (!from || !to) return null;
              const d = `M${from.x},${from.y} C${from.x},${(from.y + to.y) / 2} ${to.x},${(from.y + to.y) / 2} ${to.x},${to.y}`;
              const isDashed = edge.dashed;
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={d}
                  fill="none"
                  stroke={isDashed ? 'rgba(156,163,175,0.4)' : 'rgba(13,148,136,0.25)'}
                  strokeWidth="1.5"
                  strokeDasharray={isDashed ? '5 4' : undefined}
                  markerEnd={isDashed ? undefined : 'url(#arrow-pastel)'}
                />
              );
            })}
            {ARCH_NODES.map((node) => (
              <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                style={{ cursor: 'default' }}
                onMouseEnter={(e) => {
                  setArchTooltip({ visible: true, label: node.label, x: e.clientX, y: e.clientY });
                }}
                onMouseMove={(e) => {
                  setArchTooltip((prev) =>
                    prev.visible ? { ...prev, x: e.clientX, y: e.clientY } : prev
                  );
                }}
                onMouseLeave={() => setArchTooltip({ visible: false, label: '', x: 0, y: 0 })}
              >
                <rect
                  x={-55}
                  y={-22}
                  width={110}
                  height={44}
                  rx={8}
                  fill={node.bg}
                  stroke={node.color}
                  strokeWidth={node.dashed ? 1 : 1.5}
                  strokeDasharray={node.dashed ? '4 3' : undefined}
                />
                <text
                  y={-4}
                  fontFamily="Syne, sans-serif"
                  fontSize="10"
                  fontWeight="700"
                  fill={node.color}
                  textAnchor="middle"
                >
                  {node.label}
                </text>
                <text
                  y={9}
                  fontFamily="DM Sans, sans-serif"
                  fontSize="8"
                  fill={node.color}
                  opacity="0.6"
                  textAnchor="middle"
                >
                  {node.sub}
                </text>
              </g>
            ))}
          </svg>

          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {ARCH_LEGEND.map((item) => (
              <div
                key={item.label}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: item.bg,
                    border: `1.5px solid ${item.color}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.7rem',
                    color: 'rgba(26,10,0,0.5)',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {archTooltip.visible ? (
          <div
            style={{
              position: 'fixed',
              left: archTooltip.x + 12,
              top: archTooltip.y + 12,
              background: 'white',
              border: '1px solid rgba(13,148,136,0.2)',
              borderRadius: '8px',
              padding: '0.5rem 0.8rem',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.72rem',
              color: '#1a0a00',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          >
            {archTooltip.label}
          </div>
        ) : null}
      </section>

      {/* Section 5 — What broke */}
      <section
        className="sb-s5-pad"
        style={{
          background: '#F0FDF9',
          minHeight: '100vh',
          padding: '6rem 4rem',
          position: 'relative',
          opacity: 1,
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(13,148,136,0.7)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              display: 'block',
            }}
          >
            REAL TALK
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(13,148,136,0.4)',
              marginBottom: '1.2rem',
            }}
          />
          <h2
            style={{
              margin: '0 0 0.5rem 0',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#0a2620',
            }}
          >
            what broke along the way
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.92rem',
              color: 'rgba(10,38,32,0.55)',
              lineHeight: 1.8,
              maxWidth: '520px',
              margin: 0,
            }}
          >
            Shipping solo means debugging solo.
            <br />
            Here&apos;s what actually went wrong.
          </p>

          <div style={{ maxWidth: '800px', margin: '3rem auto 0' }}>
            {WHAT_BROKE_CARDS.map((card) => (
              <div
                key={card.number}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.8rem 2rem',
                  marginBottom: '1.2rem',
                  borderLeft: '3px solid #0D9488',
                  boxShadow: '0 2px 16px rgba(13,148,136,0.06)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Unbounded, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      background: '#CCFBF1',
                      color: '#0D9488',
                      borderRadius: '4px',
                      padding: '0.2rem 0.5rem',
                    }}
                  >
                    {card.number}
                  </span>
                  <span
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#0a2620',
                      flex: '1',
                      margin: '0 1rem',
                      minWidth: '200px',
                    }}
                  >
                    {card.problem}
                  </span>
                  <span
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.65rem',
                      background: 'rgba(13,148,136,0.08)',
                      border: '1px solid rgba(13,148,136,0.2)',
                      color: '#0D9488',
                      borderRadius: '20px',
                      padding: '0.2rem 0.7rem',
                    }}
                  >
                    {card.tag}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: '1.2rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                  }}
                  className="sb-s5-cause-fix"
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        color: 'rgba(10,38,32,0.4)',
                        textTransform: 'uppercase',
                        marginBottom: '0.4rem',
                      }}
                    >
                      WHAT HAPPENED
                    </div>
                    <p
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.82rem',
                        color: 'rgba(10,38,32,0.65)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {card.cause}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        color: 'rgba(13,148,136,0.7)',
                        textTransform: 'uppercase',
                        marginBottom: '0.4rem',
                      }}
                    >
                      HOW I FIXED IT
                    </div>
                    <p
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.82rem',
                        color: 'rgba(10,38,32,0.65)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {card.fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Why pastel */}
      <section
        className="sb-s6-pad"
        style={{
          background: '#FFF0F5',
          minHeight: '100vh',
          padding: '6rem 4rem',
          position: 'relative',
          opacity: 1,
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(190,24,93,0.5)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              display: 'block',
            }}
          >
            DESIGN THINKING
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(190,24,93,0.25)',
              marginBottom: '1.2rem',
            }}
          />
          <h2
            style={{
              margin: '0 0 0.5rem 0',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#3d0a1a',
            }}
          >
            why pastel?
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.92rem',
              color: 'rgba(61,10,26,0.55)',
              lineHeight: 1.8,
              maxWidth: '520px',
              margin: 0,
            }}
          >
            Design decisions aren&apos;t aesthetic —
            <br />
            they&apos;re product decisions.
          </p>

          <div
            className="sb-s6-two-col"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              marginTop: '3rem',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.9rem',
                  color: 'rgba(61,10,26,0.7)',
                  lineHeight: 1.85,
                  margin: '0 0 1.5rem 0',
                }}
              >
                International students are overwhelmed — new country, new systems, new everything. Most
                platforms respond with information overload. StudenzBit responded with calm.
              </p>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.9rem',
                  color: 'rgba(61,10,26,0.7)',
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                GenZ doesn&apos;t separate aesthetics from function. For this generation, how something
                looks is how it feels to use. A cold interface signals a cold experience. Pastel
                signals safety, approachability, and warmth — exactly what someone 10,000km from home
                needs.
              </p>
              <p
                style={{
                  fontFamily: 'Unbounded, sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#BE185D',
                  fontStyle: 'italic',
                  margin: '2rem 0 0 0',
                  paddingLeft: '1.2rem',
                  borderLeft: '3px solid #F9A8D4',
                }}
              >
                Calm and warm — because Canada is cold enough.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(61,10,26,0.4)',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                THE COLOUR SYSTEM
              </div>
              {PASTEL_SWATCHES.map((sw) => (
                <div
                  key={sw.hex}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      background: sw.hex,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.75rem',
                        color: 'rgba(61,10,26,0.5)',
                        marginBottom: '0.1rem',
                      }}
                    >
                      {sw.hex}
                    </div>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        color: '#3d0a1a',
                      }}
                    >
                      {sw.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.72rem',
                        color: 'rgba(61,10,26,0.45)',
                      }}
                    >
                      {sw.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Results */}
      <section
        className="sb-s7-pad"
        style={{
          background: '#FFF8EE',
          minHeight: '60vh',
          padding: '6rem 4rem',
          position: 'relative',
          opacity: 1,
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(180,83,9,0.6)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              display: 'block',
            }}
          >
            BY THE NUMBERS
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(180,83,9,0.25)',
              marginBottom: '1.2rem',
            }}
          />
          <h2
            style={{
              margin: 0,
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#1a0a00',
            }}
          >
            what shipped
          </h2>

          <div
            className="sb-s7-metrics"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem',
              marginTop: '3rem',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {RESULTS_METRICS.map((m) => (
              <div
                key={m.label}
                style={{
                  borderTop: '2px solid rgba(180,83,9,0.2)',
                  paddingTop: '1.2rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Unbounded, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    color: '#B45309',
                  }}
                >
                  {m.number}
                </div>
                <div
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: '#1a0a00',
                    marginTop: '0.3rem',
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.7rem',
                    color: 'rgba(26,10,0,0.45)',
                    marginTop: '0.2rem',
                  }}
                >
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 — Retrospective */}
      <section
        className="sb-s8-pad"
        style={{
          background: '#F0EBFF',
          minHeight: '80vh',
          padding: '6rem 4rem',
          position: 'relative',
          opacity: 1,
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(109,40,217,0.5)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              display: 'block',
            }}
          >
            RETROSPECTIVE
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(109,40,217,0.2)',
              marginBottom: '1.2rem',
            }}
          />
          <h2
            style={{
              margin: '0 0 0.5rem 0',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#1a0a3d',
            }}
          >
            if I built it again
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.92rem',
              color: 'rgba(26,10,61,0.5)',
              margin: 0,
            }}
          >
            Honest reflections. Not regrets.
          </p>

          <div style={{ maxWidth: '700px', margin: '3rem auto 0' }}>
            {RETRO_ITEMS.map((item) => (
              <div
                key={item.number}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid rgba(109,40,217,0.1)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Unbounded, sans-serif',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'rgba(109,40,217,0.3)',
                    flexShrink: 0,
                    width: '2rem',
                  }}
                >
                  {item.number}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: '#1a0a3d',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.title}
                  </div>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.85rem',
                      color: 'rgba(26,10,61,0.6)',
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9 — Roadmap */}
      <section
        className="sb-s9-pad"
        style={{
          background: '#F0FDF9',
          minHeight: '60vh',
          padding: '6rem 4rem',
          position: 'relative',
          opacity: 1,
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(13,148,136,0.6)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              display: 'block',
            }}
          >
            WHAT&apos;S NEXT
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(13,148,136,0.3)',
              marginBottom: '1.2rem',
            }}
          />
          <h2
            style={{
              margin: 0,
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#0a2620',
            }}
          >
            the roadmap
          </h2>

          <div
            className="sb-s9-roadmap"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginTop: '3rem',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {ROADMAP_ITEMS.map((item) => (
              <div
                key={item.title}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 12px rgba(13,148,136,0.06)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    background: 'rgba(13,148,136,0.08)',
                    color: item.color,
                    borderRadius: '20px',
                    padding: '0.2rem 0.6rem',
                    display: 'inline-block',
                    marginBottom: '0.8rem',
                  }}
                >
                  {item.tag}
                </span>
                <div
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#0a2620',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.title}
                </div>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.8rem',
                    color: 'rgba(10,38,32,0.6)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 — Next project */}
      <section
        className="sb-s10-pad"
        style={{
          background: '#FFF0F5',
          minHeight: '50vh',
          padding: '6rem 4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          opacity: 1,
        }}
      >
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '640px' }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(190,24,93,0.5)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              display: 'block',
            }}
          >
            THANKS FOR READING
          </span>
          <h2
            style={{
              margin: '0 0 0.5rem 0',
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#3d0a1a',
            }}
          >
            want to see more?
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(61,10,26,0.5)',
              margin: '0 0 2.5rem 0',
            }}
          >
            There&apos;s more where this came from.
          </p>
          <div
            className="sb-s10-btns"
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a
              href="https://portfolio-gules-kappa-5g75m34zuy.vercel.app/#"
              style={{
                background: 'transparent',
                border: '1px solid rgba(61,10,26,0.2)',
                borderRadius: '50px',
                padding: '0.85rem 2rem',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '0.82rem',
                color: '#3d0a1a',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(61,10,26,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              ← Back to Portfolio
            </a>
            <a
              href="#"
              style={{
                background: '#0D9488',
                border: 'none',
                borderRadius: '50px',
                padding: '0.85rem 2rem',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '0.82rem',
                color: 'white',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 0 20px rgba(13,148,136,0.3)',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0a7a70';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0D9488';
              }}
            >
              Next Project →
            </a>
          </div>
          <div
            style={{
              marginTop: '3rem',
              width: '60px',
              height: '1px',
              background: 'rgba(61,10,26,0.15)',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <p
            style={{
              margin: '1rem 0 0 0',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.7rem',
              color: 'rgba(61,10,26,0.35)',
            }}
          >
            Built by Het Patel · 2026
          </p>
        </div>
      </section>
    </div>
  );
}
