import { supabase } from "@/lib/supabase";

const LOCAL_KEY = "solarflare_explorer";

// Create a new explorer — guaranteed unique per device
export async function createExplorer(name: string) {
  const id = crypto.randomUUID(); // 🔥 Unique per device

  const explorer = {
    id,
    name,
    avatar: "🚀",
    theme: "indigo",
    title: "Explorer",
    created_at: new Date().toISOString()
  };

  // Save locally
  localStorage.setItem(LOCAL_KEY, JSON.stringify(explorer));

  // Save to Supabase
  const { error } = await supabase.from("explorers").insert(explorer);
  if (error) throw error;

  return explorer;
}

// Get active explorer from localStorage
export function getExplorerLocal() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LOCAL_KEY);
  return raw ? JSON.parse(raw) : null;
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

// ❌ Removed: setActiveExplorer()
// ❌ Removed: listExplorers()
// ❌ Removed: findExplorer()

// These functions allowed cross-device identity bleed.
// They must not exist in a kid-safe app.
