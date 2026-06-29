import { supabase } from "./supabase";

export default async function isSignedIn() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) return true;
  return false;
}
