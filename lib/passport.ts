// lib/passport.ts
import { supabase } from "@/lib/supabase";
import { addXP } from "@/lib/quizXP";
import { getExplorerLocal, setExplorerLocal } from "@/lib/identity";

export async function persistBadgeUnlock(explorerId, badgeId) {
  const { error } = await supabase
    .from("explorer_badges")
    .upsert({
      explorer_id: explorerId,
      badge_id: badgeId,
      earned_at: new Date().toISOString()
    });

  if (error) {
    console.warn("Badge unlock error:", error.message);
  }

  // Update local explorer cache
  const explorer = getExplorerLocal();
  if (explorer) {
    explorer.badges = [...new Set([...(explorer.badges || []), badgeId])];
    setExplorerLocal(explorer);
  }
}

export async function awardBadgeXP(explorerId, amount = 50) {
  return await addXP(explorerId, amount);
}

export async function awardDailyXP(explorerId, amount = 10) {
  return await addXP(explorerId, amount);
}

export async function refreshExplorer(explorerId) {
  const { data } = await supabase
    .from("explorers")
    .select("*")
    .eq("id", explorerId)
    .single();

  if (data) setExplorerLocal(data);
  return data;
}
