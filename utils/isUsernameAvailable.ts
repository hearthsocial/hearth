import { supabase } from "./supabase";

export default async function isUsernameAvailable(username: string) {
  const { data, error } = await supabase
    .from("usernames")
    .select("username")
    .eq("username", username);

  if (data?.length == 0 || !data || error) return true;
  return false;
}
