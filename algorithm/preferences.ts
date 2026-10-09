import { algoStorage } from "./storage";
import { preference, preferences } from "@/utils/types";
export function getPreferences(tag?: string): preferences {
  let keys = algoStorage.getAllKeys(); //get all tags' keys
  let preferences: preferences = [];
  keys.forEach((value, index) => {
    preferences[index] = { tag: value, val: algoStorage.getNumber(value) }; // for each tag, append an object with data about said tag
  });
  return preferences;
}
export function getPreference(tag: string): preference {
  //same as above, but for singular tag
  return { tag: tag, val: algoStorage.getNumber(tag) };
}
