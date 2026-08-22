import { supabase } from "@/lib/supabase";

export async function saveQuizAttempt({
  explorerId,
  category,
  score,
  correct,
  total
}: {
  explorerId: string;
  category: string;
  score: number;
  correct: number;
  total: number;
}) {
  const { error } = await supabase.from("explorer_quiz_history").insert([
    {
      explorer_id: explorerId,
      category,
      score,
      correct,
      total,
      created_at: new Date().toISOString()
    }
  ]);

  if (error) {
    console.warn("Quiz history save error:", error.message);
  }
}

export async function getQuizHistory(explorerId: string) {
  const { data, error } = await supabase
    .from("explorer_quiz_history")
    .select("*")
    .eq("explorer_id", explorerId)
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Quiz history fetch error:", error.message);
    return [];
  }

  return data;
}
