import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const STORE_PATH = path.join(os.tmpdir(), 'bharath-mounika-wishes.json');

const SEED_WISHES = [
  {
    id: 1,
    guestName: 'Kavuturu Family & Elders',
    message:
      'May your bond grow deeper with each passing sunrise, blessed with harmony, wisdom, and boundless joy.',
    status: 'approved',
    createdAt: '2026-11-12T10:00:00.000Z',
  },
  {
    id: 2,
    guestName: 'Dr. Ananya & Karthik',
    message:
      'Wishing Bharath and Mounika a lifetime filled with gentle laughter, grace, and cherished family memories.',
    status: 'approved',
    createdAt: '2026-11-12T11:00:00.000Z',
  },
  {
    id: 3,
    guestName: 'Smt. Alekya & Sri Chetan Sai',
    message:
      'With overflowing hearts, we pray for a luminous future together surrounded by love and divine grace.',
    status: 'approved',
    createdAt: '2026-11-12T12:00:00.000Z',
  },
];

function readStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fall back to initial seed
  }
  return [...SEED_WISHES];
}

function writeStore(wishes) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(wishes, null, 2), 'utf8');
  } catch {
    // ignore read-only fs errors outside /tmp
  }
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'GET') {
    const wishes = readStore()
      .filter((w) => w.status === 'approved')
      .sort((a, b) => Number(b.id) - Number(a.id));
    return res.status(200).json({ wishes });
  }

  if (req.method === 'POST') {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body || '{}')
        : req.body || {};

    const guestName = String(body.guestName ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (guestName.length < 2 || guestName.length > 80) {
      return res
        .status(400)
        .json({ error: 'Please enter your name (2 to 80 characters).' });
    }
    if (message.length < 5 || message.length > 500) {
      return res.status(400).json({
        error: 'Please write a blessing between 5 and 500 characters.',
      });
    }

    const wishes = readStore();
    const duplicate = wishes.some(
      (w) =>
        w.guestName.toLowerCase() === guestName.toLowerCase() &&
        w.message.toLowerCase() === message.toLowerCase()
    );
    if (duplicate) {
      return res.status(409).json({
        error:
          'This blessing has already been received. Thank you for your warm wishes!',
      });
    }

    const nextId =
      wishes.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;

    const newWish = {
      id: nextId,
      guestName,
      message,
      status: 'approved',
      createdAt: new Date().toISOString(),
    };

    wishes.push(newWish);
    writeStore(wishes);

    return res.status(201).json({
      wish: newWish,
      notice:
        'Thank you for your heartfelt blessing! It has been added to our blessing wall.',
    });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed.' });
}
