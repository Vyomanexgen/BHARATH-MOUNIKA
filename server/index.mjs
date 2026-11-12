import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db, { normalizeMobile } from './db.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 3001);
const HOST_MODERATION_PIN = String(process.env.HOST_MODERATION_PIN || '2026');

app.use(cors());
app.use(express.json({ limit: '64kb' }));

function validateRsvpPayload(body) {
  const guestName = String(body?.guestName ?? '').trim();
  const mobileNumber = String(body?.mobileNumber ?? '').trim();
  const normalized = normalizeMobile(mobileNumber);
  const guestCount = Number(body?.guestCount);
  const attendingReception = Boolean(body?.attendingReception);
  const attendingWedding = Boolean(body?.attendingWedding);
  const specialMessage = String(body?.specialMessage ?? '').trim().slice(0, 600);

  if (guestName.length < 2 || guestName.length > 80) {
    return { error: 'Please enter a valid guest name (2 to 80 characters).' };
  }
  if (normalized.length < 10 || normalized.length > 15) {
    return { error: 'Please enter a valid mobile number (at least 10 digits).' };
  }
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 15) {
    return { error: 'Number of guests must be between 1 and 15.' };
  }

  return {
    data: {
      guestName,
      mobileNumber,
      normalized,
      guestCount,
      attendingReception: attendingReception ? 1 : 0,
      attendingWedding: attendingWedding ? 1 : 0,
      specialMessage,
    },
  };
}

function mapRsvpRow(row) {
  return {
    id: row.id,
    guestName: row.guest_name,
    mobileNumber: row.mobile_number,
    guestCount: row.guest_count,
    attendingReception: Boolean(row.attending_reception),
    attendingWedding: Boolean(row.attending_wedding),
    specialMessage: row.special_message,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapWishRow(row) {
  return {
    id: row.id,
    guestName: row.guest_name,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

function requireHostAuth(req, res, next) {
  const pin = String(req.headers['x-host-pin'] ?? '');
  if (pin !== HOST_MODERATION_PIN) {
    return res.status(401).json({ error: 'Invalid host moderation passcode.' });
  }
  next();
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'bharath-mounika-wedding-api' });
});

// Submit RSVP with duplicate mobile protection
app.post('/api/rsvp', (req, res) => {
  const validated = validateRsvpPayload(req.body);
  if (validated.error) {
    return res.status(400).json({ error: validated.error });
  }
  const {
    guestName,
    mobileNumber,
    normalized,
    guestCount,
    attendingReception,
    attendingWedding,
    specialMessage,
  } = validated.data;

  const existing = db
    .prepare('SELECT * FROM rsvps WHERE normalized_mobile = ?')
    .get(normalized);

  if (existing) {
    return res.status(409).json({
      code: 'DUPLICATE_RSVP',
      error:
        'An RSVP with this mobile number has already been recorded. You may update your existing response below if your plans changed.',
      existing: mapRsvpRow(existing),
    });
  }

  const result = db
    .prepare(
      `INSERT INTO rsvps
        (guest_name, mobile_number, normalized_mobile, guest_count, attending_reception, attending_wedding, special_message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      guestName,
      mobileNumber,
      normalized,
      guestCount,
      attendingReception,
      attendingWedding,
      specialMessage
    );

  const created = db.prepare('SELECT * FROM rsvps WHERE id = ?').get(result.lastInsertRowid);
  return res.status(201).json({ rsvp: mapRsvpRow(created) });
});

// Explicit update of an existing RSVP by mobile number
app.put('/api/rsvp', (req, res) => {
  const validated = validateRsvpPayload(req.body);
  if (validated.error) {
    return res.status(400).json({ error: validated.error });
  }
  const {
    guestName,
    mobileNumber,
    normalized,
    guestCount,
    attendingReception,
    attendingWedding,
    specialMessage,
  } = validated.data;

  const existing = db
    .prepare('SELECT * FROM rsvps WHERE normalized_mobile = ?')
    .get(normalized);

  if (!existing) {
    return res.status(404).json({ error: 'No existing RSVP was found for this mobile number.' });
  }

  db.prepare(
    `UPDATE rsvps
     SET guest_name = ?,
         mobile_number = ?,
         guest_count = ?,
         attending_reception = ?,
         attending_wedding = ?,
         special_message = ?,
         updated_at = datetime('now')
     WHERE normalized_mobile = ?`
  ).run(
    guestName,
    mobileNumber,
    guestCount,
    attendingReception,
    attendingWedding,
    specialMessage,
    normalized
  );

  const updated = db
    .prepare('SELECT * FROM rsvps WHERE normalized_mobile = ?')
    .get(normalized);
  return res.json({ rsvp: mapRsvpRow(updated), updated: true });
});

// Public approved wishes
app.get('/api/wishes', (_req, res) => {
  const rows = db
    .prepare(
      "SELECT * FROM wishes WHERE status = 'approved' ORDER BY id DESC LIMIT 100"
    )
    .all();
  res.json({ wishes: rows.map(mapWishRow) });
});

// Submit a wish (stored as pending for host moderation)
app.post('/api/wishes', (req, res) => {
  const guestName = String(req.body?.guestName ?? '').trim();
  const message = String(req.body?.message ?? '').trim();

  if (guestName.length < 2 || guestName.length > 80) {
    return res.status(400).json({ error: 'Please enter your name (2 to 80 characters).' });
  }
  if (message.length < 5 || message.length > 500) {
    return res.status(400).json({ error: 'Please write a blessing between 5 and 500 characters.' });
  }

  const duplicate = db
    .prepare(
      'SELECT id FROM wishes WHERE LOWER(guest_name) = LOWER(?) AND LOWER(message) = LOWER(?)'
    )
    .get(guestName, message);

  if (duplicate) {
    return res.status(409).json({
      error: 'This blessing has already been received. Thank you for your warm wishes!',
    });
  }

  const result = db
    .prepare("INSERT INTO wishes (guest_name, message, status) VALUES (?, ?, 'approved')")
    .run(guestName, message);

  const created = db.prepare('SELECT * FROM wishes WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({
    wish: mapWishRow(created),
    notice: 'Thank you for your heartfelt blessing! It has been added to our blessing wall.',
  });
});

// Host Moderation Routes
app.post('/api/admin/verify', requireHostAuth, (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/admin/wishes', requireHostAuth, (_req, res) => {
  const rows = db.prepare('SELECT * FROM wishes ORDER BY id DESC').all();
  res.json({ wishes: rows.map(mapWishRow) });
});

app.patch('/api/admin/wishes/:id', requireHostAuth, (req, res) => {
  const id = Number(req.params.id);
  const status = String(req.body?.status ?? '');
  if (!Number.isInteger(id) || !['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid wish ID or status.' });
  }
  const info = db.prepare('UPDATE wishes SET status = ? WHERE id = ?').run(status, id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Wish not found.' });
  }
  const updated = db.prepare('SELECT * FROM wishes WHERE id = ?').get(id);
  res.json({ wish: mapWishRow(updated) });
});

app.delete('/api/admin/wishes/:id', requireHostAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid wish ID.' });
  }
  const info = db.prepare('DELETE FROM wishes WHERE id = ?').run(id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Wish not found.' });
  }
  res.json({ ok: true });
});

app.get('/api/admin/rsvps', requireHostAuth, (_req, res) => {
  const rows = db.prepare('SELECT * FROM rsvps ORDER BY id DESC').all();
  const rsvps = rows.map(mapRsvpRow);
  const summary = rsvps.reduce(
    (acc, item) => {
      acc.totalResponses += 1;
      if (item.attendingReception) acc.receptionGuests += item.guestCount;
      if (item.attendingWedding) acc.weddingGuests += item.guestCount;
      return acc;
    },
    { totalResponses: 0, receptionGuests: 0, weddingGuests: 0 }
  );
  res.json({ rsvps, summary });
});

app.delete('/api/admin/rsvps/:id', requireHostAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid RSVP ID.' });
  }
  const info = db.prepare('DELETE FROM rsvps WHERE id = ?').run(id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'RSVP not found.' });
  }
  res.json({ ok: true });
});

// Serve production frontend build if present
const distDir = path.resolve(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Wedding API server listening on http://localhost:${PORT}`);
});

