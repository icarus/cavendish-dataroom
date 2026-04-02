/**
 * Open Dataroom — Engagement Tracking
 *
 * Tracks visitor sessions: per-slide timing, navigation patterns,
 * session lifecycle. All DB operations go through the track-investor
 * Edge Function (service role key bypasses RLS).
 *
 * All operations are fire-and-forget — errors are logged to console,
 * never thrown.
 */
(function () {
  'use strict';

  // ── State ───────────────────────────────────────────────────
  var supabaseUrl = '';
  var anonKey = '';
  var trackFunctionUrl = '';
  var summaryFunctionUrl = '';

  var sessionId = null;
  var sessionEnded = false;
  var userEmail = '';
  var userName = '';

  // Slide timing
  var currentSlide = 0;
  var slideEnteredAt = 0;
  var slidesVisited = {};
  var maxSlideReached = 0;
  var totalSlides = 3;

  // ── Helpers ─────────────────────────────────────────────────

  function now() { return Date.now(); }

  function getSlidesViewedArray() {
    var arr = [];
    for (var key in slidesVisited) {
      if (slidesVisited.hasOwnProperty(key)) arr.push(parseInt(key, 10));
    }
    return arr.sort(function (a, b) { return a - b; });
  }

  function callTrackFunction(payload) {
    return fetch(trackFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + anonKey,
      },
      body: JSON.stringify(payload),
    }).then(function (res) {
      return res.json();
    }).catch(function (e) {
      console.error('tracking call error:', e);
      return null;
    });
  }

  function insertEvent(eventType, slideIndex, durationMs, metadata) {
    if (!sessionId) return Promise.resolve();
    return callTrackFunction({
      op: 'insert_event',
      session_id: sessionId,
      event_type: eventType,
      slide_index: slideIndex,
      duration_ms: durationMs || null,
      metadata: metadata || {},
    });
  }

  // ── Public API ──────────────────────────────────────────────

  async function startSession(sbUrl, sbAnonKey, email, name, slideCount) {
    supabaseUrl = sbUrl;
    anonKey = sbAnonKey;
    trackFunctionUrl = sbUrl + '/functions/v1/track-investor';
    summaryFunctionUrl = sbUrl + '/functions/v1/send-session-summary';
    userEmail = email;
    userName = name;
    sessionEnded = false;
    if (slideCount) totalSlides = slideCount;

    try {
      var result = await callTrackFunction({
        op: 'create_session',
        email: email,
        name: name,
        total_slides: totalSlides,
      });

      if (!result || !result.id) {
        console.error('tracking session create error:', result);
        return;
      }

      sessionId = result.id;
      slideEnteredAt = now();
      currentSlide = 0;
      slidesVisited[0] = true;
      maxSlideReached = 0;

      insertEvent('slide_view', 0, null, {});
    } catch (e) {
      console.error('tracking startSession error:', e);
    }
  }

  function trackSlideTransition(fromSlide, toSlide, navMethod) {
    if (!sessionId || sessionEnded) return;

    var duration = now() - slideEnteredAt;

    insertEvent('slide_leave', fromSlide, duration, { nav_method: navMethod });

    currentSlide = toSlide;
    slideEnteredAt = now();
    slidesVisited[toSlide] = true;
    if (toSlide > maxSlideReached) maxSlideReached = toSlide;

    insertEvent('slide_view', toSlide, null, { nav_method: navMethod });
  }

  function trackEvent(eventType, slideIndex, metadata) {
    if (!sessionId || sessionEnded) return;
    insertEvent(eventType, slideIndex, null, metadata);
  }

  async function endSession(reason) {
    if (!sessionId || sessionEnded) return;
    sessionEnded = true;

    var duration = now() - slideEnteredAt;

    await insertEvent('slide_leave', currentSlide, duration, {});

    await callTrackFunction({
      op: 'end_session',
      session_id: sessionId,
      end_reason: reason,
      max_slide_reached: maxSlideReached,
      slides_viewed: getSlidesViewedArray(),
    });

    fetch(summaryFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + anonKey,
      },
      body: JSON.stringify({ session_id: sessionId }),
    }).catch(function (e) {
      console.error('tracking email trigger error:', e);
    });
  }

  function endSessionBeacon(reason) {
    if (!sessionId || sessionEnded) return;
    sessionEnded = true;

    var duration = now() - slideEnteredAt;

    var trackPayload = JSON.stringify({
      beacon: true,
      op: 'end_session',
      session_id: sessionId,
      end_reason: reason,
      current_slide: currentSlide,
      current_slide_duration_ms: duration,
      max_slide_reached: maxSlideReached,
      slides_viewed: getSlidesViewedArray(),
    });
    navigator.sendBeacon(trackFunctionUrl, new Blob([trackPayload], { type: 'application/json' }));

    var summaryPayload = JSON.stringify({
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
    navigator.sendBeacon(summaryFunctionUrl, new Blob([summaryPayload], { type: 'application/json' }));
  }

  // ── Expose ──────────────────────────────────────────────────

  window.InvestorTracking = {
    startSession: startSession,
    trackSlideTransition: trackSlideTransition,
    trackEvent: trackEvent,
    endSession: endSession,
    endSessionBeacon: endSessionBeacon,
  };

})();
