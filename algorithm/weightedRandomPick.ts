import { scoredTags } from "./types";
export function weightedRandomPick(tags: scoredTags, repeat: number) {
  let returnedTags: string[] = []; //tags to return later
  let totalScore = 0; //total number of points accross all tags
  let usedTags: { tag: string; timesUsed: number; maxUses: number }[] = []; //list of used tags
  let weightedTags: Record<string, { start: number; end: number }> = {};
  tags.forEach((tag) => {
    totalScore += tag.score; //sum up all tags' scores
  });
  let lastEnd = 0; // value at which the last one ended
  tags.forEach((tagData, index) => {
    let percentage = tagData.score / totalScore;
    weightedTags[tagData.tag] = { start: lastEnd, end: percentage + lastEnd }; // append data to weightedTags
    lastEnd = percentage + lastEnd; //move last end to when this one ends
    usedTags.push({
      tag: tagData.tag,
      timesUsed: 0,
      maxUses: index <= 4 ? 5 - index : 1,
    }); // append starting data to usedTags
  });
  const maxPossibleLoops = usedTags.reduce(
    (sum, tagData) => sum + tagData.maxUses,
    0,
  );
  if (maxPossibleLoops > repeat)
    console.error(
      "requested number of posts was less than possible from current data.",
    );
  const safeRepeat = Math.min(repeat, maxPossibleLoops); //makes sure that we don't loop more than is possible with tag limits
  let steps = 0;
  while (steps < safeRepeat) {
    let rand = Math.random(); //pick random number, 0-1
    let positionInObject = -1;
    Object.keys(weightedTags).find((tagName) => {
      //loops through object until eventually finding the range in which the random number lies
      positionInObject++;
      const range = weightedTags[tagName];
      return rand >= range.start && rand < range.end;
    });
    let curTagData = usedTags[positionInObject];
    while (curTagData && curTagData.timesUsed >= curTagData.maxUses) {
      //if the selected tag has already maxed out, scroll through array to find the next available option
      positionInObject =
        positionInObject == usedTags.length ? 0 : positionInObject++;
      curTagData = usedTags[positionInObject];
    }
    if (curTagData) {
      //just to verify that we did find a real tag
      returnedTags.push(curTagData.tag);
      curTagData.timesUsed++;
      usedTags[positionInObject] = curTagData;
      steps++;
    }
  }
  return returnedTags;
}
