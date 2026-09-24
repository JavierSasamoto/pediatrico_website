/*
# Create clinic tables: profiles, medicos, contact_messages

1. New Tables
- `profiles`: Staff/doctor profile information (full name, avatar URL, bio).
- `medicos`: Medical staff records linking to profiles, with specialty, room number, and active status.
- `contact_messages`: Messages submitted via the contact form on the landing page.

2. Security
- Enable RLS on all three tables.
- This is a public institutional website (no sign-in), so anon + authenticated roles have appropriate access:
  - profiles: public read (anon, authenticated).
  - medicos: public read (anon, authenticated).
  - contact_messages: public insert (anon, authenticated); no public read (private to clinic staff).
*/

-- ===== profiles =====
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  avatar_url text,
  bio text,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_profiles" ON profiles;
CREATE POLICY "public_read_profiles" ON profiles FOR SELECT
  TO anon, authenticated USING (true);

-- ===== medicos =====
CREATE TABLE IF NOT EXISTS medicos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  specialty text NOT NULL,
  room_number text,
  is_active boolean NOT NULL DEFAULT true,
  consultation_fee numeric(10,2) DEFAULT 0,
  solidaria_fee numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE medicos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_medicos" ON medicos;
CREATE POLICY "public_read_medicos" ON medicos FOR SELECT
  TO anon, authenticated USING (true);

-- ===== contact_messages =====
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact_messages" ON contact_messages;
CREATE POLICY "public_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);
