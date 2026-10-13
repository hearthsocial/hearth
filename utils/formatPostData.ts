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
            likes:[roundInteractions(value.likes),roundInteractions(value.likes+1)],
            reposts:[roundInteractions(value.reposts),roundInteractions(value.likes+1)],
            replies:[roundInteractions(0),roundInteractions(0+1)],
            saves:[roundInteractions(0),roundInteractions(0+1)],
        },
        id:value.post_id,
        views:[roundInteractions(0+1)],
        followers:value.followers,
    })
    runningList.push(value.post_id)
    })
    console.log(endArray)
    return endArray;
}