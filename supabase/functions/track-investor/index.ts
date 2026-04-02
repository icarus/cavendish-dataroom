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
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function getSupabaseAdmin() {
  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(url, serviceKey);
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const op = body.op;

    if (!body.beacon) {
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
      const anonKeyJwt = Deno.env.get("ANON_KEY_JWT") || "";
      const authHeader = req.headers.get("Authorization") || "";
      const token = authHeader.replace("Bearer ", "");
      if (!token || (token !== anonKey && token !== anonKeyJwt)) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    if (body.beacon && op === "create_session") {
      return new Response(
        JSON.stringify({ error: "create_session not allowed via beacon" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const sb = getSupabaseAdmin();

    if (op === "create_session") {
      const { email, name, total_slides } = body;
      if (!email || !email.includes("@")) {
        return new Response(
          JSON.stringify({ error: "valid email required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data, error } = await sb
        .from("investor_sessions")
        .insert({
          user_email: email,
          user_name: name || email,
          total_slides: total_slides || 3,
          slides_viewed: [0],
          max_slide_reached: 0,
        })
        .select("id")
        .single();

      if (error) {
        console.error("create_session error:", error.message);
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ id: data.id }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (op === "insert_event") {
      const { session_id, event_type, slide_index, duration_ms, metadata } =
        body;
      if (!session_id || !event_type) {
        return new Response(
          JSON.stringify({ error: "session_id and event_type required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error } = await sb.from("investor_events").insert({
        session_id,
        event_type,
        slide_index: slide_index ?? 0,
        duration_ms: duration_ms || null,
        metadata: metadata || {},
      });

      if (error) {
        console.error("insert_event error:", error.message);
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (op === "end_session") {
      const {
        session_id,
        end_reason,
        current_slide,
        current_slide_duration_ms,
        max_slide_reached,
        slides_viewed,
      } = body;

      if (!session_id) {
        return new Response(
          JSON.stringify({ error: "session_id required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: updated } = await sb
        .from("investor_sessions")
        .update({
          ended_at: new Date().toISOString(),
          end_reason: end_reason || "unknown",
          max_slide_reached: max_slide_reached ?? 0,
          slides_viewed: slides_viewed || [],
        })
        .eq("id", session_id)
        .is("ended_at", null)
        .select("id");

      if (!updated || updated.length === 0) {
        return new Response(
          JSON.stringify({ success: true, skipped: true }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (current_slide !== undefined && current_slide_duration_ms) {
        await sb.from("investor_events").insert({
          session_id,
          event_type: "slide_leave",
          slide_index: current_slide,
          duration_ms: current_slide_duration_ms,
          metadata: {},
        });
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown op: " + op }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("track-investor error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
