import { supabase } from "@/lib/supabase";

/**
 * XP rules:
 * - +10 XP per correct answer
 * - Bonus +20 XP for scoring 80%+
 * - Bonus +50 XP for a perfect score
 */
export function calculateXP(correct: number, total: number) {
  let xp = correct * 10;

  const score = Math.round((correct / total) * 100);

  if (score >= 80 && score < 100) xp += 20;
  if (score === 100) xp += 50;

  return xp;
}

/**
 * Leveling rules:
 * Level = floor(xp / 100)
 */
export function calculateLevel(xp: number) {
  return Math.floor(xp / 100);
}

/**
 * Fetch XP + level for explorer
 */
export async function getExplorerXP(explorerId: string) {
  const { data, error } = await supabase
    .from("explorer_xp")
    .select("xp")
    .eq("explorer_id", explorerId)
    .single();

  if (error || !data) return { xp: 0, level: 0 };

  const level = calculateLevel(data.xp);
  return { xp: data.xp, level };
}

/**
 * Add XP after quiz
 */
export async function addXP(explorerId: string, xpToAdd: number) {
  const { data, error } = await supabase
    .from("explorer_xp")
    .select("xp")
    .eq("explorer_id", explorerId)
    .single();

  let newXP = xpToAdd;

  if (!error && data) {
    newXP = data.xp + xpToAdd;
  }

  const { error: upsertError } = await supabase
    .from("explorer_xp")
    .upsert({
      explorer_id: explorerId,
      xp: newXP
    });

  if (upsertError) {
    console.warn("XP update error:", upsertError.message);
  }

  return {
    xp: newXP,
    level: calculateLevel(newXP)
  };
}
