import { algoStorage } from "./storage";
export function getWeights() {
  return {
    exploration: algoStorage.getNumber("exploration"),
    reiteration: algoStorage.getNumber("reiteration"),
  }
}
