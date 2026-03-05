/**
 * lib/admin.ts
 * ------------
 * Admin helpers: check access + fetch analytics from Supabase views.
 * All functions call Supabase directly from the browser (client-side).
 */

import { createClient } from "@/lib/supabase/client";

// ── Types ─────────────────────────────────────────────────
export interface AdminStats {
  total_sessions:    number;
  total_queries:     number;
  total_users:       number;
  high_confidence:   number;
  medium_confidence: number;
  low_confidence:    number;
}

export interface TopDocument {
  document_name: string;
  hit_count:     number;
}

export interface DailyCount {
  day:         string;
  query_count: number;
}

export interface RecentSession {
  id:           string;
  title:        string;
  created_at:   string;
  message_count: number;
}

// ── Check admin ───────────────────────────────────────────
export async function checkIsAdmin(): Promise<boolean> {
  const supabase = createClient();
  if (!supabase) return false;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .single();
  return !error && !!data;
}

// ── Overview stats ─────────────────────────────────────────
export async function fetchAdminStats(): Promise<AdminStats | null> {
  const supabase = createClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .rpc("get_admin_analytics")
    .single();
  if (error) { console.warn("[admin] fetchAdminStats:", error.message); return null; }
  return data as AdminStats;
}

// ── Top documents ─────────────────────────────────────────
export async function fetchTopDocuments(): Promise<TopDocument[]> {
  const supabase = createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .rpc("get_admin_top_documents");
  if (error) { console.warn("[admin] fetchTopDocuments:", error.message); return []; }
  return (data ?? []) as TopDocument[];
}

// ── Daily query volume ─────────────────────────────────────
export async function fetchDailyQueries(): Promise<DailyCount[]> {
  const supabase = createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .rpc("get_admin_daily_queries");
  if (error) { console.warn("[admin] fetchDailyQueries:", error.message); return []; }
  return (data ?? []) as DailyCount[];
}

// ── Recent sessions ─────────────────────────────────────────
export async function fetchRecentSessions(limit = 20): Promise<RecentSession[]> {
  const supabase = createClient();
  if (!supabase) return [];
  const { data: sessions, error } = await supabase
    .from("chat_sessions")
    .select("id, title, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) { console.warn("[admin] fetchRecentSessions:", error.message); return []; }

  // Fetch message counts for each session
  const withCounts = await Promise.all(
    (sessions ?? []).map(async (s) => {
      const { count } = await supabase!
        .from("chat_messages")
        .select("id", { count: "exact", head: true })
        .eq("session_id", s.id);
      return { ...s, message_count: count ?? 0 };
    }),
  );
  return withCounts as RecentSession[];
}
