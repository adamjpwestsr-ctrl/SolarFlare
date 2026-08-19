import { supabase } from "@/lib/supabase";

const LOCAL_KEY = "solarflare_explorer";

// Create a new explorer
export async function createExplorer(name: string) {
  const { data, error } = await supabase
    .from("explorers")
    .insert([
      {
        name,
        avatar: "🚀",
        theme: "indigo",
        title: "Explorer"
      }
    ])
    .select()
    .single();

  if (error) throw error;

  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  return data;
}

// Get active explorer from localStorage
export function getExplorerLocal() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LOCAL_KEY);
  return raw ? JSON.parse(raw) : null;
}

// Switch active explorer
export async function setActiveExplorer(id: string) {
  const { data, error } = await supabase
    .from("explorers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  return data;
}

// List all explorers
export async function listExplorers() {
  const { data, error } = await supabase
    .from("explorers")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

// Update explorer settings (name, avatar, theme, title)
export async function updateExplorerSettings(id: string, settings: any) {
  const { data, error } = await supabase
    .from("explorers")
    .update(settings)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  // Update local cache
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  return data;
}
