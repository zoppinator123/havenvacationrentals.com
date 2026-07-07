const SHEET_ID = process.env.HAVEN_LEADS_SHEET_ID || '1Nw2BWclkRvgc4V-xvwBbzsT8Nn6aWDr-SyHME0JbSYg';
const SHEET_RANGE = process.env.HAVEN_LEADS_SHEET_RANGE || 'A:Z';
const HEADERS = [
  'Submitted At',
  'Brand',
  'Channel',
  'Landing Page',
  'Name',
  'Phone',
  'Email',
  'Market',
  'Property',
  'Message',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'UTM Term',
  'UTM Content',
  'GCLID',
  'FBCLID',
  'Referrer',
  'User Agent',
  'Raw JSON',
];

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function clean(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value.slice(0, 5000);
  return String(value).slice(0, 5000);
}

async function getAccessToken() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Google OAuth environment variables');
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(`Google token refresh failed: ${data.error || response.status}`);
  }
  return data.access_token;
}

function rowFromPayload(payload, req) {
  return [
    new Date().toISOString(),
    clean(payload.brandId || 'haven'),
    clean(payload.channel || 'website'),
    clean(payload.landing_page || payload.page || ''),
    clean(payload.name),
    clean(payload.phone),
    clean(payload.email),
    clean(payload.market),
    clean(payload.property || payload.property_address),
    clean(payload.message),
    clean(payload.utm_source),
    clean(payload.utm_medium),
    clean(payload.utm_campaign),
    clean(payload.utm_term),
    clean(payload.utm_content),
    clean(payload.gclid),
    clean(payload.fbclid),
    clean(payload.referrer),
    clean(req.headers['user-agent']),
    clean(JSON.stringify(payload)),
  ];
}

async function appendToSheet(payload, req) {
  const accessToken = await getAccessToken();
  await ensureHeaders(accessToken);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(SHEET_ID)}/values/${encodeURIComponent(SHEET_RANGE)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [rowFromPayload(payload, req)] }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || `Sheets append failed: ${response.status}`;
    throw new Error(message);
  }
  return data;
}

async function ensureHeaders(accessToken) {
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(SHEET_ID)}/values/A1:T1`;
  const getResponse = await fetch(getUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
  const existing = await getResponse.json().catch(() => ({}));
  if (!getResponse.ok) {
    const message = existing?.error?.message || `Sheets header check failed: ${getResponse.status}`;
    throw new Error(message);
  }
  if (existing.values && existing.values[0] && existing.values[0].length) return;

  const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(SHEET_ID)}/values/A1:T1?valueInputOption=USER_ENTERED`;
  const updateResponse = await fetch(updateUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [HEADERS] }),
  });
  const data = await updateResponse.json().catch(() => ({}));
  if (!updateResponse.ok) {
    const message = data?.error?.message || `Sheets header write failed: ${updateResponse.status}`;
    throw new Error(message);
  }
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (!payload.name && !payload.email && !payload.phone) {
      return res.status(400).json({ ok: false, error: 'Missing lead contact fields' });
    }

    const result = await appendToSheet(payload, req);
    return res.status(200).json({ ok: true, updatedRange: result.updates?.updatedRange || null });
  } catch (error) {
    console.error('google sheet lead copy failed', error);
    return res.status(500).json({ ok: false, error: error.message || 'Google Sheet append failed' });
  }
}
