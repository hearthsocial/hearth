import { interactionAbrv } from "./types";

export default function roundInteractions(num:number):interactionAbrv{
if(num>=1000000000){
    let x = Math.floor(num/100000000)
    return `${x}b`
}
if(num>=1000000){
    let x = Math.floor(num/100000)
    return `${x}m`
}
if(num>=1000){
    let x = Math.floor(num/100)
    return `${x}k`
}
return `${num}`;
}