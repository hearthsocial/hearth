import { supabase } from "./supabase";

export default async function isSignedIn() {
  try{
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) return true;
} catch {
  return false;
}
}
