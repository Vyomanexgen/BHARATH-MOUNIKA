-- Optional Supabase Schema for Bharath & Mounika Wedding Website
-- Run this in your Supabase SQL Editor if you choose to deploy with Supabase.

create extension if not exists "pgcrypto";

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  mobile_number text not null,
  normalized_mobile text not null unique,
  guest_count integer not null check (guest_count >= 1 and guest_count <= 20),
  attending_reception boolean not null default true,
  attending_wedding boolean not null default true,
  special_message text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;
alter table public.wishes enable row level security;

-- Public guests can submit RSVPs (unique normalized_mobile prevents duplicates)
create policy "Public insert RSVPs"
  on public.rsvps for insert
  to anon
  with check (true);

-- Public guests can submit wishes (created as pending for moderation)
create policy "Public insert wishes"
  on public.wishes for insert
  to anon
  with check (status = 'pending');

-- Public guests can only read approved wishes
create policy "Public read approved wishes"
  on public.wishes for select
  to anon
  using (status = 'approved');

