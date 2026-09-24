import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zlaozxeeeowswqiloljp.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsYW96eGVlZW93c3dxaWxvbGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMzkwMzAsImV4cCI6MjEwNTgxNTAzMH0.3u2JVUlr950AeXQ91vHF4voLCPhJeb18UC-2UIpnxso';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
}

export interface Medico {
  id: string;
  profile_id: string | null;
  specialty: string;
  room_number: string | null;
  is_active: boolean;
  consultation_fee: number;
  solidaria_fee: number;
  profiles: Profile | null;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}
