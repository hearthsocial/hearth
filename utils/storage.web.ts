const storage = {
set:(key:string,value:string|number|boolean)=>{
localStorage.setItem(key,String(value))
},
getString:async(key:string)=>{
    let val = localStorage.getItem(key)
    return val??undefined
},
getBool:async(key:string)=>{
    let val = localStorage.getItem(key)
    return val ?? undefined
},
getNumber:async(key:string)=>{
    let val = localStorage.getItem(key)
    return Number(val)??undefined
},
delete:async(key:string)=>{
    localStorage.removeItem(key)
},
clear:async()=>{
    localStorage.clear()
}
}
export default storage;