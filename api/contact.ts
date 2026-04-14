type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  humanInteraction?: boolean;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;

const rateLimitStore = new Map<string, RateLimitEntry>();

function readJson(req: any): Promise<ContactPayload> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
      if (body.length > 50_000) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function getClientIp(req: any): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(clientKey);
  if (!existing || existing.resetAt < now) {
    rateLimitStore.set(clientKey, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (existing.count >= MAX_REQUESTS_PER_WINDOW) return true;
  existing.count += 1;
  return false;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  if (!WEB3FORMS_KEY) {
    res.status(500).json({ ok: false, reason: 'WEB3FORMS_KEY missing on server' });
    return;
  }

  const clientIp = getClientIp(req);
  const userAgent = String(req.headers['user-agent'] || 'unknown');
  const clientKey = `${clientIp}|${userAgent.slice(0, 120)}`;
  if (isRateLimited(clientKey)) {
    res.status(429).json({ ok: false, reason: 'Rate limit exceeded' });
    return;
  }

  let payload: ContactPayload;
  try {
    payload = await readJson(req);
  } catch {
    res.status(400).json({ ok: false, reason: 'Invalid JSON body' });
    return;
  }

  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  const message = String(payload.message || '').trim();
  if (!name || !email || !message || !isValidEmail(email)) {
    res.status(400).json({ ok: false, reason: 'Invalid form payload' });
    return;
  }

  if (!payload.humanInteraction) {
    res.status(400).json({ ok: false, reason: 'Human interaction check failed' });
    return;
  }

  try {
    const upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name,
        email,
        message,
        subject: 'New contact from PickWell Website',
        from_name: 'PickWell Website',
      }),
    });

    if (!upstream.ok) {
      const upstreamBody = await upstream.text();
      res.status(502).json({
        ok: false,
        reason: 'Web3Forms upstream request failed',
        upstreamStatus: upstream.status,
        upstreamBody,
      });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(502).json({
      ok: false,
      reason: 'Unexpected upstream error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
