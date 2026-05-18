/**
 * supabase.js — Shared Supabase client for auth API routes
 *
 * Provides a pre-configured Supabase client to all auth API handlers.
 * Uses the service-role key (SUPABASE_KEY env var) which bypasses RLS —
 * this is safe ONLY here in a serverless function, not in the browser.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gwmciomzyaujlpsquvbz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bWNpb216eWF1amxwc3F1dmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTA4NzQsImV4cCI6MjA5NDMyNjg3NH0.k0t6iwmH_4OiFOEqTjX888CybFOH53L9Fs0-98YVuPE';

export const supabase = createClient(supabaseUrl, supabaseKey);