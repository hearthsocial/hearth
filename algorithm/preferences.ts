import { storage } from "./storage";
import { preference, preferences } from "./types";
export function getPreferences(tag?: string): preferences {
  let keys = storage.getAllKeys(); //get all tags' keys
  let preferences: preferences = [];
  keys.forEach((value, index) => {
    preferences[index] = { tag: value, val: storage.getNumber(value) }; // for each tag, append an object with data about said tag
  });
  return preferences;
}
export function getPreference(tag: string): preference {
  //same as above, but for singular tag
  return { tag: tag, val: storage.getNumber(tag) };
}
