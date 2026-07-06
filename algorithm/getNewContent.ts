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
  let isntFreeroam = feed === "following"||feed === "friends"; //can we pull random videos, or do we have to pull from a set list of users (friends/following)
  if (!prefs[0]) {
    //no preferences yet

    return;
  } else if (!prefs[5]) {
    //less than five known opinions on tags
    return;
  }
if(feed=="fyp"){ 
  prefs.sort((a, b) => (b.val ?? 0) - (a.val ?? 0)); //sort by score
  let acceptableTags: { tag: string; score: number }[] = [];
  prefs.forEach((tagData) => {
    if(tagData.val!==0){ // if the user hasn't explicitly banned this tag from their feed
    acceptableTags.push({ tag: tagData.tag, score: tagData.val ?? 0 });
    } 
  });
  let nextTags = weightedRandomPick(acceptableTags, 20); //choose next 20 tags
}else{
    //TODO: build other feeds
    return;
}
}
