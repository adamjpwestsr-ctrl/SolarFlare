import { supabase } from "@/lib/supabase";
import badgesData from "@/data/badges.json";

export function getBadges() {
  return badgesData.badges;
}

export function getBadgeByCategory(category: string) {
  return badgesData.badges.find((b) => b.category === category);
}

export async function getExplorerBadges(explorerId: string) {
  const { data, error } = await supabase
    .from("explorer_badges")
    .select("badge_id")
    .eq("explorer_id", explorerId);

  if (error) {
    console.warn("Supabase error:", error.message);
    return [];
  }

  return data.map((b) => b.badge_id);
}

export async function unlockBadge(explorerId: string, category: string) {
  const badge = badgesData.badges.find((b) => b.category === category);
  if (!badge) return null;

  const { error } = await supabase
    .from("explorer_badges")
    .insert([{ explorer_id: explorerId, badge_id: badge.id }]);

  if (error) {
    console.warn("Supabase unlock error:", error.message);
    return null;
  }

  return badge;
}
