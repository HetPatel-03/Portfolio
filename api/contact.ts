/** Portfolio contact form — Edge runtime; uses Resend HTTP API (SDK pulls Node-only deps). */
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, subject, message } = (await req.json()) as Record<string, unknown>;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    const html = `
        <div style="font-family: monospace; max-width: 600px; padding: 24px;">
          <h2 style="color: #F2664A; margin-bottom: 24px;">New message from hetppatel.dev</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #888; width: 80px;">Name</td>
              <td style="padding: 12px 0; font-weight: bold;">${safeName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #888;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${encodeURIComponent(email)}" style="color: #F2664A;">${safeEmail}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #888;">Subject</td>
              <td style="padding: 12px 0;">${safeSubject}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
        </div>
      `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['hetppatel.cs@gmail.com'],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to send message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  runtime: 'edge',
};
