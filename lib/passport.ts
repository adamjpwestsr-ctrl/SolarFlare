// lib/passport.ts
import { supabase } from "@/lib/supabase";
import { addXP } from "@/lib/quizXP";
import { getExplorerLocal } from "@/lib/identity";

export async function persistBadgeUnlock(explorerId: string, badgeId: string) {
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

  // Optional: update local explorer cache if needed later
  const explorer = getExplorerLocal();
  if (explorer && explorer.id === explorerId) {
    // If you add a setExplorerLocal in the future, you can update badges here.
    // For now, we just rely on server state + fresh fetches.
  }
}

export async function awardBadgeXP(explorerId: string, amount = 50) {
  return await addXP(explorerId, amount);
}

export async function awardDailyXP(explorerId: string, amount = 10) {
  return await addXP(explorerId, amount);
}

export async function refreshExplorer(explorerId: string) {
  const { data } = await supabase
    .from("explorers")
    .select("*")
    .eq("id", explorerId)
    .single();

  return data;
}
