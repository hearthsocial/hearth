import { preferences } from "./types";
export function weightedRandomPick(
  tags: { tag: string; score: number }[],
  repeat: number,
) {
  let returnedTags: string[] = [];
  let totalScore = 0;
  let usedTags: { tag: string; timesUsed: number; maxUses: number }[] = [];
  let weightedTags: Record<string, { start: number; end: number }> = {};
  tags.forEach((tag) => {
    totalScore += tag.score;
  });
  let lastEnd = 0;
  tags.forEach((tag, index) => {
    let percentage = tag.score / totalScore;
    weightedTags[tag.tag] = { start: lastEnd, end: percentage + lastEnd };
    lastEnd = percentage + lastEnd;
    usedTags.push({
      tag: tag.tag,
      timesUsed: 0,
      maxUses: index <= 4 ? 3 - index : 1,
    });
  });
  for (let i = 0; i < repeat; i++) {
    let rand = Math.random();
    const chosenTag = Object.keys(weightedTags).find((tagName) => {
      const range = weightedTags[tagName];
      return rand >= range.start && rand <= range.end;
    });
    returnedTags.push(chosenTag ?? "");
  }
  return returnedTags;
}
