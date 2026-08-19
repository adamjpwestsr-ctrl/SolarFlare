import factsData from "@/data/facts.json";
import { supabase } from "@/lib/supabase";
import { getExplorerLocal } from "@/lib/identity";

// --- DAILY FACT (unchanged) ---
export function getDailyFact() {
  const today = new Date().toISOString().split("T")[0];

  const seed = today.split("-").join("");
  const index = Number(seed) % factsData.facts.length;

  const category = factsData.facts[index];
  const factIndex = Number(seed) % category.facts.length;

  return {
    date: today,
    category: category.category,
    fact: category.facts[factIndex]
  };
}

// --- LOCAL STREAK (unchanged) ---
export function getStreakLocal() {
  if (typeof window === "undefined") return 0;

  const last = localStorage.getItem("solarflare_last_daily");
  const streak = Number(localStorage.getItem("solarflare_streak") || 0);

  const today = new Date().toISOString().split("T")[0];

  if (!last) {
    localStorage.setItem("solarflare_last_daily", today);
    localStorage.setItem("solarflare_streak", "1");
    return 1;
  }

  if (last === today) return streak;

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (last === yesterday) {
    const newStreak = streak + 1;
    localStorage.setItem("solarflare_streak", String(newStreak));
    localStorage.setItem("solarflare_last_daily", today);
    return newStreak;
  }

  localStorage.setItem("solarflare_streak", "1");
  localStorage.setItem("solarflare_last_daily", today);
  return 1;
}

// --- SUPABASE: LOG TODAY'S DISCOVERY ---
export async function logDailyToSupabase(daily) {
  const explorer = getExplorerLocal();
  if (!explorer) return;

  await supabase.from("daily_logs").insert([
    {
      explorer_id: explorer.id,
      date: daily.date,
      fact: daily.fact,
      category: daily.category
    }
  ]);
}

// --- SUPABASE: GET CLOUD STREAK ---
export async function getStreakFromSupabase() {
  const explorer = getExplorerLocal();
  if (!explorer) return 0;

  const { data } = await supabase
    .from("daily_logs")
    .select("date")
    .eq("explorer_id", explorer.id)
    .order("date", { ascending: false });

  if (!data || !data.length) return 1;

  let streak = 1;
  let prev = data[0].date;

  for (let i = 1; i < data.length; i++) {
    const next = data[i].date;
    const diff =
      (new Date(prev).getTime() - new Date(next).getTime()) / 86400000;

    if (diff === 1) {
      streak++;
      prev = next;
    } else break;
  }

  return streak;
}

// --- SUPABASE: AWARD DAILY STAMP ---
export async function awardDailyStamp(daily) {
  const explorer = getExplorerLocal();
  if (!explorer) return;

  await supabase.from("daily_stamps").insert([
    {
      explorer_id: explorer.id,
      date: daily.date,
      icon: "✨",
      label: daily.category
    }
  ]);
}

// --- SUPABASE: GET DAILY STAMPS ---
export async function getDailyStamps(explorerId) {
  const { data } = await supabase
    .from("daily_stamps")
    .select("*")
    .eq("explorer_id", explorerId)
    .order("date", { ascending: false });

  return data || [];
}
