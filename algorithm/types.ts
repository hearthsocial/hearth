export type preferences = { tag: string; val: number | undefined }[];
export type scoredTags = { tag: string; score: number }[]
export interface preference {
  tag: string;
  val: number | undefined;
}
