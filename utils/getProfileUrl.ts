import { supabase } from "./supabase";
import { Base64Image } from "./types";
export default function getProfileUrl(pfp: string): string {
  let { data } = supabase.storage.from("pfp").getPublicUrl(pfp);
  return data.publicUrl;
}
