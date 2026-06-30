import { storage } from "./storage";
import { preference, preferences } from "./types";
export function getPreferences(tag?: string): preferences {
  let keys = storage.getAllKeys();
  let preferences: preferences = [];
  keys.forEach((value, index) => {
    preferences[index] = { tag: value, val: storage.getNumber(value) };
  });
  return preferences;
}
export function getPreference(tag: string) {
  return [{ tag: tag, val: storage.getNumber(tag) }];
}
