//extra file types
export type Base64Image = `data:image/${string};base64,${string}`;
export type interactionAbrv = `${number}${'k'|'m'|'b'|''}`
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
  export type postProps = {
    name:string,
    text:string,
    pfp:string,
    bottomData:{
        likes:interactionAbrv[],
        replies:interactionAbrv[],
        reposts:interactionAbrv[],
        saves:interactionAbrv[],
    },
    id:string
    views:interactionAbrv[],
    followers:number,
}

