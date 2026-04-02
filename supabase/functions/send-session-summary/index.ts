import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CUSTOMIZE: Add your production domain to this list
const ALLOWED_ORIGINS = [
  "http://localhost:8888",
  // "https://yourdomain.com",
  // "https://www.yourdomain.com",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// ── Slide name mapping ──────────────────────────────────────
// CUSTOMIZE: Update to match your slide order

const SLIDE_NAMES = [
  "Title",
  "Problem / Opportunity",
  "Closing",
];

// ── Helpers ─────────────────────────────────────────────────

function getSupabaseAdmin() {
  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(url, serviceKey);
}

function formatDuration(ms: number): string {
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return sec > 0 ? `${min}m ${sec}s` : `${min}m`;
}

function formatMinutes(ms: number): string {
  return Math.round(ms / 60000).toString();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface SessionRow {
  id: string;
  user_email: string;
  user_name: string;
  started_at: string;
  ended_at: string | null;
  end_reason: string | null;
  max_slide_reached: number;
  total_slides: number;
  slides_viewed: number[];
}

interface EventRow {
  event_type: string;
  slide_index: number;
  duration_ms: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ── Slide analytics ─────────────────────────────────────────

interface SlideStats {
  name: string;
  viewed: boolean;
  totalTimeMs: number;
  visits: number;
}

function computeSlideStats(events: EventRow[], totalSlides: number): SlideStats[] {
  const stats: SlideStats[] = [];
  for (let i = 0; i < totalSlides; i++) {
    stats.push({
      name: SLIDE_NAMES[i] || `Slide ${i + 1}`,
      viewed: false,
      totalTimeMs: 0,
      visits: 0,
    });
  }

  for (const evt of events) {
    const idx = evt.slide_index;
    if (idx < 0 || idx >= totalSlides) continue;

    if (evt.event_type === "slide_view") {
      stats[idx].viewed = true;
      stats[idx].visits++;
    }
    if (evt.event_type === "slide_leave" && evt.duration_ms) {
      stats[idx].totalTimeMs += evt.duration_ms;
    }
  }

  return stats;
}

function computeNavPreference(events: EventRow[]): string {
  const counts: Record<string, number> = {};
  for (const evt of events) {
    if (evt.event_type === "slide_view" && evt.metadata?.nav_method) {
      const method = evt.metadata.nav_method as string;
      counts[method] = (counts[method] || 0) + 1;
    }
  }

  let max = 0;
  let pref = "keyboard";
  for (const [method, count] of Object.entries(counts)) {
    if (count > max) {
      max = count;
      pref = method;
    }
  }
  return pref;
}

function computeEngagementScore(
  session: SessionRow,
  slideStats: SlideStats[],
  sessionDurationMs: number
): { score: number; label: string } {
  // Coverage: % slides viewed (0-40 points)
  const viewedCount = slideStats.filter((s) => s.viewed).length;
  const coverage = (viewedCount / session.total_slides) * 40;

  // Depth: reached far into deck (0-30 points)
  const depth = ((session.max_slide_reached + 1) / session.total_slides) * 30;

  // Time: up to 30 points, cap at 5 minutes
  const timeCap = 5 * 60 * 1000;
  const time = Math.min(sessionDurationMs / timeCap, 1) * 30;

  const score = Math.round(coverage + depth + time);
  let label = "Low";
  if (score >= 70) label = "High";
  else if (score >= 40) label = "Medium";

  return { score, label };
}

// ── Email HTML ──────────────────────────────────────────────

function buildEmailHtml(
  session: SessionRow,
  slideStats: SlideStats[],
  sessionDurationMs: number,
  navPreference: string,
  engagement: { score: number; label: string }
): string {
  const slideRows = slideStats
    .map(
      (s, i) => `
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:8px 12px;font-size:14px;color:#374151;">${i + 1}. ${s.name}</td>
        <td style="padding:8px 12px;text-align:center;font-size:14px;">${s.viewed ? "&#10003;" : "&#10007;"}</td>
        <td style="padding:8px 12px;text-align:center;font-size:14px;color:#374151;">${s.viewed ? formatDuration(s.totalTimeMs) : "&mdash;"}</td>
        <td style="padding:8px 12px;text-align:center;font-size:14px;color:#374151;">${s.visits || "&mdash;"}</td>
      </tr>`
    )
    .join("");

  const endReasonLabel =
    session.end_reason === "logout"
      ? "Logged out"
      : session.end_reason === "timeout"
      ? "Session timeout"
      : session.end_reason === "tab_close"
      ? "Closed tab"
      : session.end_reason || "Unknown";

  const engagementColor =
    engagement.label === "High"
      ? "#059669"
      : engagement.label === "Medium"
      ? "#D97706"
      : "#DC2626";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    <h1 style="font-size:20px;color:#111827;margin:0 0 24px;">Investor Deck Session</h1>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#6b7280;width:140px;">Investor</td>
        <td style="padding:6px 0;font-size:14px;color:#111827;font-weight:600;">${escapeHtml(session.user_name)}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#6b7280;">Email</td>
        <td style="padding:6px 0;font-size:14px;color:#111827;">${escapeHtml(session.user_email)}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#6b7280;">Duration</td>
        <td style="padding:6px 0;font-size:14px;color:#111827;">${formatDuration(sessionDurationMs)} (${formatMinutes(sessionDurationMs)} min)</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#6b7280;">End reason</td>
        <td style="padding:6px 0;font-size:14px;color:#111827;">${endReasonLabel}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#6b7280;">Navigation</td>
        <td style="padding:6px 0;font-size:14px;color:#111827;">${navPreference}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:14px;color:#6b7280;">Engagement</td>
        <td style="padding:6px 0;font-size:14px;font-weight:600;color:${engagementColor};">${engagement.score}/100 (${engagement.label})</td>
      </tr>
    </table>

    <h2 style="font-size:16px;color:#111827;margin:0 0 12px;">Slide Breakdown</h2>
    <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e7eb;border-radius:8px;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="padding:8px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Slide</th>
          <th style="padding:8px 12px;text-align:center;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Viewed</th>
          <th style="padding:8px 12px;text-align:center;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Time</th>
          <th style="padding:8px 12px;text-align:center;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Visits</th>
        </tr>
      </thead>
      <tbody>
        ${slideRows}
      </tbody>
    </table>

    <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Sent by Dataroom Tracking</p>
  </div>
</body>
</html>`;
}

// ── Send email via Resend ───────────────────────────────────

async function sendEmail(
  subject: string,
  html: string,
  notifyEmail: string
): Promise<void> {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) {
    console.error("RESEND_API_KEY not configured — skipping email");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Dataroom <onboarding@resend.dev>",
      to: [notifyEmail],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend API error:", res.status, body);
  }
}

// ── Main handler ────────────────────────────────────────────

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const sb = getSupabaseAdmin();
    const notifyEmail = Deno.env.get("NOTIFY_EMAIL") || "your-email@example.com";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

    let sessionId: string;

    // ── Beacon mode: persist state first ─────────────────────
    if (body.beacon) {
      // Beacon requests cannot set headers (sendBeacon limitation).
      // Session UUID is unguessable; function only sends to hardcoded NOTIFY_EMAIL.
      sessionId = body.session_id;

      // Idempotency: only update if session hasn't already been ended
      const { data: updated } = await sb.from("investor_sessions").update({
        ended_at: new Date().toISOString(),
        end_reason: body.end_reason,
        max_slide_reached: body.max_slide_reached,
        slides_viewed: body.slides_viewed,
      }).eq("id", sessionId).is("ended_at", null).select("id");

      if (!updated || updated.length === 0) {
        // Session already ended — skip duplicate processing
        return new Response(
          JSON.stringify({ success: true, skipped: true }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Insert final slide_leave event
      await sb.from("investor_events").insert({
        session_id: sessionId,
        event_type: "slide_leave",
        slide_index: body.current_slide,
        duration_ms: body.current_slide_duration_ms,
        metadata: {},
      });
    } else {
      // Non-beacon: validate Authorization header
      // Accept both new publishable key (SUPABASE_ANON_KEY) and legacy JWT key (ANON_KEY_JWT)
      const authHeader = req.headers.get("Authorization") || "";
      const token = authHeader.replace("Bearer ", "");
      const anonKeyJwt = Deno.env.get("ANON_KEY_JWT") || "";
      if (!token || (token !== anonKey && token !== anonKeyJwt)) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      sessionId = body.session_id;
    }

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "session_id required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Fetch session + events (parallel) ────────────────────
    const [sessionResult, eventsResult] = await Promise.all([
      sb.from("investor_sessions").select("*").eq("id", sessionId).single(),
      sb.from("investor_events").select("*").eq("session_id", sessionId).order("created_at", { ascending: true }),
    ]);

    if (sessionResult.error || !sessionResult.data) {
      console.error("Session not found:", sessionId, sessionResult.error?.message);
      return new Response(
        JSON.stringify({ error: "Session not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const eventList: EventRow[] = eventsResult.data || [];
    const sessionData = sessionResult.data as SessionRow;

    // ── Compute analytics ────────────────────────────────────
    const startedAt = new Date(sessionData.started_at).getTime();
    const endedAt = sessionData.ended_at
      ? new Date(sessionData.ended_at).getTime()
      : Date.now();
    const sessionDurationMs = endedAt - startedAt;

    const slideStats = computeSlideStats(eventList, sessionData.total_slides);
    const navPreference = computeNavPreference(eventList);
    const engagement = computeEngagementScore(sessionData, slideStats, sessionDurationMs);

    const viewedCount = slideStats.filter((s) => s.viewed).length;

    // ── Build and send email ─────────────────────────────────
    const subject = `Deck Session: ${escapeHtml(sessionData.user_name)} viewed ${viewedCount}/${sessionData.total_slides} slides (${formatMinutes(sessionDurationMs)} min)`;
    const html = buildEmailHtml(
      sessionData,
      slideStats,
      sessionDurationMs,
      navPreference,
      engagement
    );

    await sendEmail(subject, html, notifyEmail);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("send-session-summary error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
