export default function ResumePage() {
  const resumeUrl =
    'https://uwtsybsinrhuofbhacxk.supabase.co/storage/v1/object/public/resume/Het_Patel_SWE_Resume.pdf';

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        background: '#0C0C10',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          background: '#0C0C10',
          borderBottom: '1px solid #222',
        }}
      >
        <a
          href="/"
          style={{
            color: '#F2664A',
            fontFamily: 'monospace',
            fontSize: '13px',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          ← back
        </a>
        <span
          style={{
            color: '#888',
            fontFamily: 'monospace',
            fontSize: '12px',
            letterSpacing: '0.08em',
          }}
        >
          HET PATEL — RESUME
        </span>
        <a
          href={resumeUrl}
          download
          style={{
            color: '#C8F135',
            fontFamily: 'monospace',
            fontSize: '12px',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            border: '1px solid #C8F135',
            padding: '6px 14px',
          }}
        >
          download ↓
        </a>
      </div>
      <iframe
        src={resumeUrl}
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
        }}
        title="Het Patel Resume"
      />
    </div>
  );
}
