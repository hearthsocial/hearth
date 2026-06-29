import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import "expo-sqlite/localStorage/install";

const supabaseUrl = <string>process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = <string>(
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);
const isBrowser = typeof window !== "undefined";
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: isBrowser ? localStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
