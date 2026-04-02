-- Open Dataroom — Database Schema
-- Run this migration to set up the required tables and policies.

-- ── Tables ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.investor_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email text NOT NULL,
  user_name text,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  end_reason text,
  total_slides integer DEFAULT 3,
  max_slide_reached integer DEFAULT 0,
  slides_viewed integer[] DEFAULT '{0}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.investor_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES public.investor_sessions(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  slide_index integer DEFAULT 0,
  duration_ms integer,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- ── Indexes ───────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_investor_events_session_id
  ON public.investor_events(session_id);

CREATE INDEX IF NOT EXISTS idx_investor_sessions_user_email
  ON public.investor_sessions(user_email);

-- ── RLS ───────────────────────────────────────────────────────

ALTER TABLE public.investor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_events ENABLE ROW LEVEL SECURITY;

-- Sessions: authenticated users can insert for their own email
CREATE POLICY "authenticated_insert_sessions"
  ON public.investor_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_email = auth.email());

-- Sessions: authenticated users can update their own rows
CREATE POLICY "authenticated_update_own_sessions"
  ON public.investor_sessions
  FOR UPDATE
  TO authenticated
  USING (user_email = auth.email())
  WITH CHECK (user_email = auth.email());

-- Sessions: authenticated users can read their own rows
CREATE POLICY "authenticated_select_own_sessions"
  ON public.investor_sessions
  FOR SELECT
  TO authenticated
  USING (user_email = auth.email());

-- Events: authenticated users can insert for their own sessions
CREATE POLICY "authenticated_insert_events"
  ON public.investor_events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    session_id IN (
      SELECT id FROM public.investor_sessions
      WHERE user_email = auth.email()
    )
  );

-- Events: authenticated users can read events from their sessions
CREATE POLICY "authenticated_select_own_events"
  ON public.investor_events
  FOR SELECT
  TO authenticated
  USING (
    session_id IN (
      SELECT id FROM public.investor_sessions
      WHERE user_email = auth.email()
    )
  );
