import AsyncStorage from "@react-native-async-storage/async-storage" 
const storage = {
set:async(key:string,value:string|number|boolean)=>{
await AsyncStorage.setItem(key,String(value))
},
getString:async(key:string)=>{
    return await AsyncStorage.getItem(key)??undefined
},
getBool:async(key:string)=>{
    return await AsyncStorage.getItem(key)??undefined
},
getNumber:async(key:string)=>{
    return await AsyncStorage.getItem(key)??undefined
},
delete:async(key:string)=>{
    await AsyncStorage.removeItem(key)
},
clear:async()=>{
    await AsyncStorage.clear()
}
}
export default storage;