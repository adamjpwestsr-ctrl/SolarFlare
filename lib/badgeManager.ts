// lib/badgeManager.ts
import badges from "@/data/badges.json";
import { supabase } from "@/lib/supabase";

export function getBadges() {
  return badges.badges;
}

export async function getExplorerBadges(explorerId) {
  const { data, error } = await supabase
    .from("explorer_badges")
    .select("badge_id")
    .eq("explorer_id", explorerId);

  if (error) {
    console.warn("Badge fetch error:", error.message);
    return [];
  }

  return data.map((b) => b.badge_id);
}
