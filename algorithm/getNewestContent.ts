//Get's newest content, for dev purposes only
import { supabase } from "@/utils/supabase"
export default async function getNewestContent(){
    let {data,error} = await supabase.rpc("get_newest_content",{})
    if(error) return []
    return data??[];
} 