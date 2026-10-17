import { useRef } from "react";
import storage from "./storage";
import { supabase } from "./supabase";
export default async function uploadInteraction(interactionType:"like"|"repost",postId:string,value:boolean,updateRef:React.RefObject<boolean>){
let id = await storage.getString("id")
updateRef.current=value;
if(value==true){
const {error} = await supabase.from(`${interactionType}s`).insert({user_id:id,post_id:postId})
if(error) console.log(error||"Error when uploading interaction.")
}
if(value==false){
const {error} = await supabase.from(`${interactionType}s`).delete().eq("post_id",postId).eq("user_id",id)
if(error) console.log(error||"Error when uploading interaction.")
}
}