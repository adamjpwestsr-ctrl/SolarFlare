import { supabase } from "@/lib/supabase";
import badgesData from "@/data/badges.json";

/**
 * Returns all badges from local data.
 */
export function getBadges() {
  return badgesData.badges;
}

/**
 * Finds a badge by category name.
 */
export function getBadgeByCategory(category: string) {
  return badgesData.badges.find((b) => b.category === category);
}

/**
 * Retrieves all badge IDs earned by a specific explorer.
 */
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

/**
 * Unlocks a badge for an explorer based on category.
 */
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

/* -------------------------------------------------------------------------- */
/* 🧠 QUIZ BADGES EXTENSION                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Quiz badge tiers based on score thresholds.
 * These can be displayed or unlocked after a quiz session.
 */
export const quizBadges = [
  { id: "quiz_rookie", name: "Quiz Rookie", threshold: 50, description: "Scored 50% or higher on a quiz." },
  { id: "quiz_pro", name: "Quiz Pro", threshold: 80, description: "Scored 80% or higher on a quiz." },
  { id: "quiz_master", name: "Quiz Master", threshold: 100, description: "Perfect score! You’re a cosmic genius." }
];

/**
 * Determines which quiz badge should be awarded based on score.
 */
export function getQuizBadgeByScore(score: number) {
  return quizBadges.find((b) => score >= b.threshold);
}

/**
 * Unlocks a quiz badge for an explorer.
 */
export async function unlockQuizBadge(explorerId: string, score: number) {
  const badge = getQuizBadgeByScore(score);
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
