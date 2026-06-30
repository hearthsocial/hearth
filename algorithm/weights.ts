import { storage } from "./storage";
export function getWeights() {
  return {
    exploration: storage.getNumber("exploration"),
    reiteration: storage.getNumber("reiteration"),
  };
}
