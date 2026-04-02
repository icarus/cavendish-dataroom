"use client";

const PASSWORD_SESSION_KEY = "dataroom_pw";
const EMAIL_SESSION_KEY = "dataroom_email";
const LAST_ACTIVITY_KEY = "dataroom_activity";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

const DEV_BYPASS = !process.env.NEXT_PUBLIC_SUPABASE_URL;

export function isPasswordVerified(): boolean {
  if (DEV_BYPASS) return true;
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem(PASSWORD_SESSION_KEY);
  if (!token) return false;
  try {
    const timestamp = atob(token).split(":")[0];
    return Date.now() - parseInt(timestamp) < 86400000;
  } catch {
    return false;
  }
}

export function setPasswordVerified(token: string) {
  localStorage.setItem(PASSWORD_SESSION_KEY, token);
}

export async function verifyPassword(
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/verify-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ password }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.valid && data.token) {
        setPasswordVerified(data.token);
        return { success: true };
      }
    }
  } catch {
    return {
      success: false,
      error: "Service temporarily unavailable. Please try again.",
    };
  }
  return { success: false, error: "Invalid access code" };
}

export function setEmailSession(email: string) {
  sessionStorage.setItem(EMAIL_SESSION_KEY, email);
}

export function getEmailSession(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(EMAIL_SESSION_KEY);
}

export function clearEmailSession() {
  sessionStorage.removeItem(EMAIL_SESSION_KEY);
}

export function clearPasswordSession() {
  localStorage.removeItem(PASSWORD_SESSION_KEY);
}

export function resetActivity() {
  sessionStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
}

export function isSessionTimedOut(): boolean {
  if (typeof window === "undefined") return false;
  const last = parseInt(sessionStorage.getItem(LAST_ACTIVITY_KEY) || "0", 10);
  return last > 0 && Date.now() - last > SESSION_TIMEOUT_MS;
}
