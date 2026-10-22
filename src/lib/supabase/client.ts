import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Variáveis do Supabase ausentes.");
  }

  console.log("Supabase URL configurada:", supabaseUrl);
  console.log(
    "Publishable Key configurada:",
    supabasePublishableKey.startsWith("sb_publishable_")
  );

  return createBrowserClient(
    supabaseUrl,
    supabasePublishableKey
  );
}