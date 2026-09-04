"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Save a collected item for an explorer.
 * Prevents duplicates using upsert.
 */
export async function syncCollectible(explorerId: string, collectibleId: string, points: number) {
  try {
    const { error } = await supabase
      .from("explorer_collectibles")
      .upsert({
        explorer_id: explorerId,
        collectible_id: collectibleId,
        points,
        collected_at: new Date().toISOString()
      });

    if (error) {
      console.error("Error syncing collectible:", error);
    }
  } catch (err) {
    console.error("Unexpected error syncing collectible:", err);
  }
}

/**
 * Save score for a zone.
 * If the explorer already has a score for this zone, update it.
 */
export async function syncScore(explorerId: string, zoneId: string, score: number) {
  try {
    const { error } = await supabase
      .from("explorer_scores")
      .upsert({
        explorer_id: explorerId,
        zone_id: zoneId,
        score,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error("Error syncing score:", error);
    }
  } catch (err) {
    console.error("Unexpected error syncing score:", err);
  }
}

/**
 * Award XP to explorer (optional future expansion).
 */
export async function addXP(explorerId: string, xp: number) {
  try {
    const { data, error } = await supabase
      .from("explorers")
      .select("xp")
      .eq("id", explorerId)
      .single();

    if (error) {
      console.error("Error fetching XP:", error);
      return;
    }

    const newXP = (data?.xp || 0) + xp;

    const { error: updateError } = await supabase
      .from("explorers")
      .update({ xp: newXP })
      .eq("id", explorerId);

    if (updateError) {
      console.error("Error updating XP:", updateError);
    }
  } catch (err) {
    console.error("Unexpected error updating XP:", err);
  }
}

/**
 * Award a badge to explorer (optional future expansion).
 */
export async function awardBadge(explorerId: string, badgeId: string) {
  try {
    const { error } = await supabase
      .from("explorer_badges")
      .upsert({
        explorer_id: explorerId,
        badge_id: badgeId,
        earned_at: new Date().toISOString()
      });

    if (error) {
      console.error("Error awarding badge:", error);
    }
  } catch (err) {
    console.error("Unexpected error awarding badge:", err);
  }
}
