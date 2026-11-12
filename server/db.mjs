import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'wedding.db');
const db = new DatabaseSync(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    normalized_mobile TEXT NOT NULL UNIQUE,
    guest_count INTEGER NOT NULL CHECK (guest_count >= 1 AND guest_count <= 15),
    attending_reception INTEGER NOT NULL DEFAULT 1,
    attending_wedding INTEGER NOT NULL DEFAULT 1,
    special_message TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS wishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_name TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Seed initial approved wishes only if the wishes table is empty
const wishCountRow = db.prepare('SELECT COUNT(*) AS count FROM wishes').get();
if (wishCountRow.count === 0) {
  const insertSeed = db.prepare(
    'INSERT INTO wishes (guest_name, message, status) VALUES (?, ?, ?)'
  );
  insertSeed.run(
    'Kavuturu Family & Elders',
    'May your bond grow deeper with each passing sunrise, blessed with harmony, wisdom, and boundless joy.',
    'approved'
  );
  insertSeed.run(
    'Dr. Ananya & Karthik',
    'Wishing Bharath and Mounika a lifetime filled with gentle laughter, grace, and cherished family memories.',
    'approved'
  );
  insertSeed.run(
    'Smt. Alekya & Sri Chetan Sai',
    'With overflowing hearts, we pray for a luminous future together surrounded by love and divine grace.',
    'approved'
  );
}

/**
 * Normalize a phone number for duplicate detection while keeping the display format.
 */
export function normalizeMobile(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export default db;

