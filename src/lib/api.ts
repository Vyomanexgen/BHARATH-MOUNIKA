import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export interface RsvpPayload {
  guestName: string;
  mobileNumber: string;
  guestCount: number;
  attendingReception: boolean;
  attendingWedding: boolean;
  specialMessage: string;
}

export interface RsvpRecord extends RsvpPayload {
  id: number | string;
  createdAt: string;
  updatedAt?: string;
}

export interface WishRecord {
  id: number | string;
  guestName: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export class DuplicateRsvpError extends Error {
  existing: RsvpRecord;
  constructor(message: string, existing: RsvpRecord) {
    super(message);
    this.name = 'DuplicateRsvpError';
    this.existing = existing;
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const isSupabaseConfigured = Boolean(supabase);

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 409 && data?.code === 'DUPLICATE_RSVP' && data?.existing) {
      throw new DuplicateRsvpError(data.error, data.existing);
    }
    throw new Error(data?.error || 'Unable to complete your request. Please try again.');
  }
  return data as T;
}

export async function submitRsvp(payload: RsvpPayload): Promise<{ rsvp: RsvpRecord }> {
  if (supabase) {
    const normalized = normalizePhone(payload.mobileNumber);
    const { data, error } = await supabase
      .from('rsvps')
      .insert({
        guest_name: payload.guestName.trim(),
        mobile_number: payload.mobileNumber.trim(),
        normalized_mobile: normalized,
        guest_count: payload.guestCount,
        attending_reception: payload.attendingReception,
        attending_wedding: payload.attendingWedding,
        special_message: payload.specialMessage.trim(),
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error(
          'An RSVP with this mobile number has already been submitted.'
        );
      }
      throw new Error(error.message);
    }
    return {
      rsvp: {
        id: data.id,
        guestName: data.guest_name,
        mobileNumber: data.mobile_number,
        guestCount: data.guest_count,
        attendingReception: data.attending_reception,
        attendingWedding: data.attending_wedding,
        specialMessage: data.special_message,
        createdAt: data.created_at,
      },
    };
  }

  return requestJson<{ rsvp: RsvpRecord }>('/api/rsvp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateExistingRsvp(
  payload: RsvpPayload
): Promise<{ rsvp: RsvpRecord; updated: boolean }> {
  return requestJson<{ rsvp: RsvpRecord; updated: boolean }>('/api/rsvp', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function fetchApprovedWishes(): Promise<WishRecord[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
      id: row.id,
      guestName: row.guest_name,
      message: row.message,
      status: row.status,
      createdAt: row.created_at,
    }));
  }

  const res = await requestJson<{ wishes: WishRecord[] }>('/api/wishes');
  return res.wishes;
}

export async function submitWish(payload: {
  guestName: string;
  message: string;
}): Promise<{ wish: WishRecord; notice: string }> {
  if (supabase) {
    const { data, error } = await supabase
      .from('wishes')
      .insert({
        guest_name: payload.guestName.trim(),
        message: payload.message.trim(),
        status: 'approved',
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return {
      wish: {
        id: data.id,
        guestName: data.guest_name,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
      },
      notice:
        'Thank you for your heartfelt blessing! It has been added to our blessing wall.',
    };
  }

  return requestJson<{ wish: WishRecord; notice: string }>('/api/wishes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Host Moderation API (SQLite backend)
export async function verifyHostPin(pin: string): Promise<boolean> {
  await requestJson<{ ok: boolean }>('/api/admin/verify', {
    method: 'POST',
    headers: { 'x-host-pin': pin },
  });
  return true;
}

export async function fetchAdminWishes(pin: string): Promise<WishRecord[]> {
  const res = await requestJson<{ wishes: WishRecord[] }>('/api/admin/wishes', {
    headers: { 'x-host-pin': pin },
  });
  return res.wishes;
}

export async function moderateWish(
  pin: string,
  id: number | string,
  status: 'approved' | 'rejected' | 'pending'
): Promise<WishRecord> {
  const res = await requestJson<{ wish: WishRecord }>(`/api/admin/wishes/${id}`, {
    method: 'PATCH',
    headers: { 'x-host-pin': pin },
    body: JSON.stringify({ status }),
  });
  return res.wish;
}

export async function deleteAdminWish(pin: string, id: number | string): Promise<void> {
  await requestJson<{ ok: boolean }>(`/api/admin/wishes/${id}`, {
    method: 'DELETE',
    headers: { 'x-host-pin': pin },
  });
}

export async function fetchAdminRsvps(pin: string): Promise<{
  rsvps: RsvpRecord[];
  summary: { totalResponses: number; receptionGuests: number; weddingGuests: number };
}> {
  return requestJson('/api/admin/rsvps', {
    headers: { 'x-host-pin': pin },
  });
}

export async function deleteAdminRsvp(pin: string, id: number | string): Promise<void> {
  await requestJson<{ ok: boolean }>(`/api/admin/rsvps/${id}`, {
    method: 'DELETE',
    headers: { 'x-host-pin': pin },
  });
}

