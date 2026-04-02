"use client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const trackFunctionUrl = `${supabaseUrl}/functions/v1/track-investor`;
const summaryFunctionUrl = `${supabaseUrl}/functions/v1/send-session-summary`;

let sessionId: string | null = null;
let sessionEnded = false;
let userEmail = "";
let userName = "";
let currentSlide = 0;
let slideEnteredAt = 0;
let slidesVisited: Record<number, boolean> = {};
let maxSlideReached = 0;
let totalSlides = 3;

function getSlidesViewedArray(): number[] {
  return Object.keys(slidesVisited)
    .map(Number)
    .sort((a, b) => a - b);
}

async function callTrackFunction(payload: object): Promise<object | null> {
  try {
    const res = await fetch(trackFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch {
    return null;
  }
}

function insertEvent(
  eventType: string,
  slideIndex: number | null,
  durationMs: number | null,
  metadata: object
) {
  if (!sessionId) return Promise.resolve();
  return callTrackFunction({
    op: "insert_event",
    session_id: sessionId,
    event_type: eventType,
    slide_index: slideIndex,
    duration_ms: durationMs ?? null,
    metadata,
  });
}

export async function startSession(
  email: string,
  name: string,
  slideCount?: number
) {
  userEmail = email;
  userName = name;
  sessionEnded = false;
  if (slideCount) totalSlides = slideCount;

  const result = (await callTrackFunction({
    op: "create_session",
    email,
    name,
    total_slides: totalSlides,
  })) as { id?: string } | null;

  if (!result?.id) return;

  sessionId = result.id;
  slideEnteredAt = Date.now();
  currentSlide = 0;
  slidesVisited = { 0: true };
  maxSlideReached = 0;

  insertEvent("slide_view", 0, null, {});
}

export function trackSlideTransition(
  fromSlide: number,
  toSlide: number,
  navMethod: string
) {
  if (!sessionId || sessionEnded) return;
  const duration = Date.now() - slideEnteredAt;
  insertEvent("slide_leave", fromSlide, duration, { nav_method: navMethod });
  currentSlide = toSlide;
  slideEnteredAt = Date.now();
  slidesVisited[toSlide] = true;
  if (toSlide > maxSlideReached) maxSlideReached = toSlide;
  insertEvent("slide_view", toSlide, null, { nav_method: navMethod });
}

export function trackEvent(
  eventType: string,
  slideIndex: number | null,
  metadata: object
) {
  if (!sessionId || sessionEnded) return;
  insertEvent(eventType, slideIndex, null, metadata);
}

export async function endSession(reason: string) {
  if (!sessionId || sessionEnded) return;
  sessionEnded = true;
  const duration = Date.now() - slideEnteredAt;
  await insertEvent("slide_leave", currentSlide, duration, {});
  await callTrackFunction({
    op: "end_session",
    session_id: sessionId,
    end_reason: reason,
    max_slide_reached: maxSlideReached,
    slides_viewed: getSlidesViewedArray(),
  });
  fetch(summaryFunctionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify({ session_id: sessionId }),
  }).catch(() => {});
}

export function endSessionBeacon(reason: string) {
  if (!sessionId || sessionEnded) return;
  sessionEnded = true;
  const duration = Date.now() - slideEnteredAt;
  const trackPayload = JSON.stringify({
    beacon: true,
    op: "end_session",
    session_id: sessionId,
    end_reason: reason,
    current_slide: currentSlide,
    current_slide_duration_ms: duration,
    max_slide_reached: maxSlideReached,
    slides_viewed: getSlidesViewedArray(),
  });
  navigator.sendBeacon(
    trackFunctionUrl,
    new Blob([trackPayload], { type: "application/json" })
  );
  const summaryPayload = JSON.stringify({
    beacon: true,
    session_id: sessionId,
    end_reason: reason,
    current_slide: currentSlide,
    current_slide_duration_ms: duration,
    max_slide_reached: maxSlideReached,
    slides_viewed: getSlidesViewedArray(),
    user_email: userEmail,
    user_name: userName,
    total_slides: totalSlides,
  });
  navigator.sendBeacon(
    summaryFunctionUrl,
    new Blob([summaryPayload], { type: "application/json" })
  );
}
