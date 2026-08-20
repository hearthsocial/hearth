import { supabase } from "@/utils/supabase";
import "react-native-url-polyfill/auto";
import { getPreferences } from "./preferences";
import { getContentParams } from "./types";
import { weightedRandomPick } from "./weightedRandomPick";
import { getWeights } from "./weights";

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
        let randomNum = Math.floor(Math.random() * mixType.length);
        feedTypeList.push(mixType[randomNum]); // type
      }
    } else {
      for (let i = 0; i < 20; i++) {
        feedTypeList.push(type);
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
    let { data: postsData, error: postsError } = await supabase.rpc(
      "get_post_bulk",
      { tags: nextTags, type: feedTypeList },
    );
    if (postsError) {
      console.log("error getting posts' data.");
      return [];
    }
    for (const [index] of nextTags.entries()) {
      //loops through chosen tags
      let contType = feedTypeList[index] ? feedTypeList[index] : type;
      let postData = postsData[index];
      if (!postData) {
        console.error("no posts were found with set conditions.");
        continue;
      }
      if (contType == "image" || contType == "video") {
        postData.url = supabaseUrl + contType + "/" + postData.id; //makes a readable url that will return
        nextContentData.push(postData);
      } else if (contType == "text") {
        nextContentData.push(postData);
      }
    }
    return nextContentData;
  } else {
    //TODO: build other feeds
    return;
  }
}
