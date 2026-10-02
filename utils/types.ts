//extra file types
export type Base64Image = `data:image/${string};base64,${string}`;
//algorithm
export type preferences = { tag: string; val: number | undefined }[];
export type scoredTags = { tag: string; score: number }[];
export interface preference {
  tag: string;
  val: number | undefined;
}
type feedType = "fyp" | "explore" | "following" | "friends";
type contentType = "image" | "video" | "text";
export type getContentParams =
  | { feed: "mix"; type: "mix"; mixFeed: feedType[]; mixType: contentType[] }
  | { feed: feedType; type: "mix"; mixFeed?: never; mixType: contentType[] }
  | { feed: "mix"; type: contentType; mixFeed?: feedType[]; mixType?: never }
  | { feed: feedType; type: contentType; mixFeed?: never; mixType?: never };

