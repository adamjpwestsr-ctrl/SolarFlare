// lib/quizXP.ts
import { supabase } from "@/lib/supabase";

export function calculateXP(correct, total) {
  let xp = correct * 10;
  const score = Math.round((correct / total) * 100);

  if (score >= 80 && score < 100) xp += 20;
  if (score === 100) xp += 50;

  return xp;
}

export function calculateLevel(xp) {
  return Math.floor(xp / 100);
}

export async function getExplorerXP(explorerId) {
  const { data, error } = await supabase
    .from("explorer_xp")
    .select("xp")
    .eq("explorer_id", explorerId)
    .single();

  if (error || !data) return { xp: 0, level: 0 };

  return { xp: data.xp, level: calculateLevel(data.xp) };
}

export async function addXP(explorerId, xpToAdd) {
  const { data } = await supabase
    .from("explorer_xp")
    .select("xp")
    .eq("explorer_id", explorerId)
    .single();

  const newXP = (data?.xp || 0) + xpToAdd;

  await supabase.from("explorer_xp").upsert({
    explorer_id: explorerId,
    xp: newXP
  });

  return { xp: newXP, level: calculateLevel(newXP) };
}
