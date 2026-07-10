import { getPreferences } from "./preferences";
import { getWeights } from "./weights";
import { weightedRandomPick } from "./weightedRandomPick";
import { supabase } from "@/utils/supabase";
import "react-native-url-polyfill/auto";
import { getContentParams } from "./types";

export async function getNewContent({
  feed,
  type,
  mixFeed,
  mixType,
}: getContentParams) {
  const supabaseUrl =
    <string>process.env.EXPO_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/";
  let prefs = getPreferences();
  let weights = getWeights();
  let nextContent = [];

  let isntFreeroam = feed === "following" || feed === "friends"; //can we pull random videos, or do we have to pull from a set list of users (friends/following)
  if (!prefs[0]) {
    //no preferences yet

    return;
  } else if (!prefs[5]) {
    //less than five known opinions on tags
    return;
  }

  if (feed == "fyp") {
    let feedTypeList = [];
    if (type == "mix") {
      for (let i = 0; i < 20; i++) {
        let randomNum = Math.random() * mixType.length;
        feedTypeList.push(mixType[randomNum]); // type
      }
    }
    prefs.sort((a, b) => (b.val ?? 0) - (a.val ?? 0)); //sort by score
    let acceptableTags: { tag: string; score: number }[] = [];
    prefs.forEach((tagData) => {
      if (tagData.val !== 0) {
        // if the user hasn't explicitly banned this tag from their feed
        acceptableTags.push({ tag: tagData.tag, score: tagData.val ?? 0 });
      }
    });
    let nextTags = weightedRandomPick(acceptableTags, 20); //choose next 20 tags
    let nextContentData = [];

    for (const [index, tag] of nextTags.entries()) {
      //loops through chosen tags
      let contType = feedTypeList[index] ? feedTypeList[index] : type;
      let { data: postData, error: postError } = await supabase.rpc(
        "get_post",
        { tag: tag, type: contType },
      );
      if (!postData[0] || postError) {
        console.error("no posts were found with set conditions.");
        continue;
      }
      if (contType == "image" || contType == "video") {
        postData[0].url = supabaseUrl + contType + "/" + postData[0].id; //makes a readable url that will return
        nextContentData.push(postData[0]);
      }
      return nextContentData;
    }
  } else {
    //TODO: build other feeds
    return;
  }
}
