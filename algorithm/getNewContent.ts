import { getPreferences } from "./preferences";
import { getWeights } from "./weights";
import { weightedRandomPick } from "./weightedRandomPick";
import { supabase } from "@/utils/supabase";
export async function getNewContent(
  feed: "fyp" | "explore" | "following" | "friends" | "mix",
  type: "image" | "video" | "text" | "mix",
  mixFeed?: ("fyp" | "explore" | "following" | "friends")[] | "all",
  mixType?: ("image" | "video" | "text")[] | "all",
) {
  let prefs = getPreferences();
  let weights = getWeights();
  let nextContent = [];
  let isntFreeroam = feed === "following" || "friends";
  if (!prefs[0]) {
    //no preferences yet

    return;
  } else if (!prefs[5]) {
    //less than five known tags
    return;
  }

  prefs.sort((a, b) => (b.val ?? 0) - (a.val ?? 0));
  let acceptableTags: { tag: string; score: number }[] = [];
  prefs.forEach((tag) => {
    acceptableTags.push({ tag: tag.tag, score: tag.val ?? 0 });
  });
  let nextTags = weightedRandomPick(acceptableTags, 20);
}
