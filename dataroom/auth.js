/**
 * Open Dataroom — Authentication Module
 *
 * Handles: password gate, Supabase Google SSO, email-only access,
 * session management, 30-minute inactivity timeout.
 *
 * SETUP: Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY below
 * with your actual Supabase project credentials.
 */
(function () {
  'use strict';

  // ── Supabase Configuration ──────────────────────────────────
  // CUSTOMIZE: Replace these with your Supabase project URL and anon key
  // Find them at: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
  const SUPABASE_URL = 'YOUR_SUPABASE_URL';
  const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

  // ── Constants ───────────────────────────────────────────────
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
  const ACTIVITY_CHECK_INTERVAL_MS = 60 * 1000; // check every 60s
  const PASSWORD_SESSION_KEY = 'dataroom_pw';
  const LAST_ACTIVITY_KEY = 'dataroom_activity';
  const EMAIL_SESSION_KEY = 'dataroom_email';

  // ── State ───────────────────────────────────────────────────
  let supabase = null;
  let activityTimer = null;
  let beforeTimeoutHook = null;

  // ── Initialization ──────────────────────────────────────────

  function initSupabase() {
    if (typeof window.supabase === 'undefined') {
      console.error('Supabase SDK not loaded');
      return null;
    }
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return supabase;
  }

  // ── Password Gate ───────────────────────────────────────────

  function isPasswordVerified() {
    var token = localStorage.getItem(PASSWORD_SESSION_KEY);
    if (!token) return false;
    try {
      var timestamp = atob(token).split(':')[0];
      return (Date.now() - parseInt(timestamp)) < 86400000; // 24h
    } catch (e) {
      return false;
    }
  }

  function setPasswordVerified(token) {
    localStorage.setItem(PASSWORD_SESSION_KEY, token);
  }

  async function verifyPassword(password) {
    try {
      var res = await fetch(SUPABASE_URL + '/functions/v1/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ password: password }),
      });
      if (res.ok) {
        var data = await res.json();
        if (data.valid && data.token) {
          setPasswordVerified(data.token);
          return { success: true };
        }
      }
    } catch (err) {
      return { success: false, error: 'Service temporarily unavailable. Please try again.' };
    }

    return { success: false, error: 'Invalid access code' };
  }

  // ── Supabase Auth ───────────────────────────────────────────

  async function getSession() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  async function getUser() {
    const session = await getSession();
    return session ? session.user : null;
  }

  async function signInWithGoogle() {
    if (!supabase) return;
    const redirectTo = window.location.origin + '/dataroom/login.html';
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectTo },
    });
  }

  // ── Email-Only Session (no Supabase auth) ──────────────────

  function setEmailSession(email) {
    sessionStorage.setItem(EMAIL_SESSION_KEY, email);
  }

  function getEmailSession() {
    return sessionStorage.getItem(EMAIL_SESSION_KEY);
  }

  function clearEmailSession() {
    sessionStorage.removeItem(EMAIL_SESSION_KEY);
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    localStorage.removeItem(PASSWORD_SESSION_KEY);
    sessionStorage.removeItem(LAST_ACTIVITY_KEY);
    clearEmailSession();
    clearActivityTimer();
  }

  // ── Session Timeout ─────────────────────────────────────────

  function resetActivity() {
    sessionStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  }

  function startActivityTimer() {
    resetActivity();

    const events = ['keydown', 'click', 'touchstart', 'scroll', 'mousemove'];
    events.forEach(function (evt) {
      document.addEventListener(evt, resetActivity, { passive: true });
    });

    activityTimer = setInterval(function () {
      const last = parseInt(sessionStorage.getItem(LAST_ACTIVITY_KEY) || '0', 10);
      if (Date.now() - last > SESSION_TIMEOUT_MS) {
        handleTimeout();
      }
    }, ACTIVITY_CHECK_INTERVAL_MS);
  }

  function clearActivityTimer() {
    if (activityTimer) {
      clearInterval(activityTimer);
      activityTimer = null;
    }
  }

  async function handleTimeout() {
    clearActivityTimer();
    if (beforeTimeoutHook) {
      try { await beforeTimeoutHook(); } catch (e) { console.error('beforeTimeout hook error:', e); }
    }
    await signOut();
    window.location.href = '/dataroom/?timeout=true';
  }

  // ── Page Guards ─────────────────────────────────────────────

  async function guardPasswordPage() {
    try { initSupabase(); } catch (e) { console.warn('Supabase init failed:', e); }
    if (isPasswordVerified()) {
      const session = await getSession();
      if (session) {
        window.location.href = '/dataroom/dataroom.html';
        return;
      }
      if (getEmailSession()) {
        window.location.href = '/dataroom/dataroom.html';
        return;
      }
      window.location.href = '/dataroom/login.html';
      return;
    }
    showPage();
  }

  async function guardLoginPage() {
    initSupabase();

    if (!isPasswordVerified()) {
      window.location.href = '/dataroom/';
      return;
    }

    supabase.auth.onAuthStateChange(function (event, session) {
      if (event === 'SIGNED_IN' && session) {
        resetActivity();
        window.location.href = '/dataroom/dataroom.html';
      }
    });

    const session = await getSession();
    if (session) {
      window.location.href = '/dataroom/dataroom.html';
      return;
    }

    if (getEmailSession()) {
      window.location.href = '/dataroom/dataroom.html';
      return;
    }

    showPage();
  }

  async function guardPresentationPage() {
    return guardDocumentPage();
  }

  async function guardDocumentPage() {
    initSupabase();

    if (!isPasswordVerified()) {
      window.location.href = '/dataroom/';
      return null;
    }

    const last = parseInt(sessionStorage.getItem(LAST_ACTIVITY_KEY) || '0', 10);
    if (last > 0 && Date.now() - last > SESSION_TIMEOUT_MS) {
      await signOut();
      window.location.href = '/dataroom/?timeout=true';
      return null;
    }

    const session = await getSession();
    if (session) {
      showPage();
      startActivityTimer();
      return { mode: 'authenticated', session: session };
    }

    const email = getEmailSession();
    if (email) {
      showPage();
      startActivityTimer();
      return { mode: 'email_only', email: email };
    }

    window.location.href = '/dataroom/login.html';
    return null;
  }

  function showPage() {
    var el = document.getElementById('app');
    if (el) el.style.visibility = 'visible';
  }

  // ── Public API ──────────────────────────────────────────────

  window.InvestorAuth = {
    initSupabase: initSupabase,
    verifyPassword: verifyPassword,
    isPasswordVerified: isPasswordVerified,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    getSession: getSession,
    getUser: getUser,
    getClient: function () { return supabase; },
    getSupabaseUrl: function () { return SUPABASE_URL; },
    getAnonKey: function () { return SUPABASE_ANON_KEY; },
    setEmailSession: setEmailSession,
    getEmailSession: getEmailSession,
    clearEmailSession: clearEmailSession,
    resetActivity: resetActivity,
    startActivityTimer: startActivityTimer,
    onBeforeTimeout: function (fn) { beforeTimeoutHook = fn; },
    guardPasswordPage: guardPasswordPage,
    guardLoginPage: guardLoginPage,
    guardPresentationPage: guardPresentationPage,
    guardDocumentPage: guardDocumentPage,
  };
})();
