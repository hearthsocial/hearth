import { Base64Image, postProps } from "./types"
import roundInteractions from "./roundInteractionData"
import getProfileUrl from "./getProfileUrl"
interface unformattedData {
text:string,
postedby:string,
tags:string[],
likes:number,
reposts:number,
views:number,
post_id:string,
name:string,
pfp:string,
followers:number,
user_liked:boolean,
user_reposted:boolean
}
//TODO: get rpc to do a join in the cloud to get pfp and name
export default function formatPostData(postData:unformattedData[]){
    let endArray:postProps[] = []
    let runningList:string[] = []
    postData.forEach((value,index)=>{
        if(runningList.includes(value.post_id))return;
        
        endArray.push({name:value.name,
        pfp:getProfileUrl(value.pfp),
        text:value.text,
        bottomData:{
            likes:[roundInteractions(value.user_liked?value.likes-1:value.likes),roundInteractions(value.user_liked?value.likes:value.likes+1)],
            reposts:[roundInteractions(value.user_reposted?value.reposts-1:value.reposts),roundInteractions(value.user_reposted?value.reposts:value.reposts+1)],
            replies:[roundInteractions(0),roundInteractions(0+1)],
            saves:[roundInteractions(0),roundInteractions(0+1)],
        },
        id:value.post_id,
        views:[roundInteractions(0+1)],
        followers:value.followers,
         userLiked:value.user_liked,
         userReposted:value.user_reposted
    })
    runningList.push(value.post_id)
    })
    return endArray;
}