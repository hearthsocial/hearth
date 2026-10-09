import { postProps } from "./types"
import roundInteractions from "./roundInteractionData"
interface unformattedData {
text:String,
postedby:String,
tags:String[],
likes:number,
reposts:number,
views:number,
id:string,
}
//TODO: get rpc to do a join in the cloud to get pfp and name
export default function formatPostData(postData:unformattedData[]){
    let endArray:postProps[] = []
    let runningList:string[] = []
    postData.forEach((value,index)=>{
        if(runningList.includes(value.id))return;
        endArray.push({name:value.postedby,
        pfp:"data:image/jpeg;base64,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",
        text:value.text,
        bottomData:{
            likes:[roundInteractions(value.likes),roundInteractions(value.likes+1)],
            reposts:[roundInteractions(value.reposts),roundInteractions(value.likes+1)],
            replies:[roundInteractions(0),roundInteractions(0+1)],
            saves:[roundInteractions(0),roundInteractions(0+1)],
        },
        views:[roundInteractions(0+1)]
    })
    runningList.push(value.id)
    })
    
    return endArray;
}