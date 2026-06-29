import { supabase } from "./supabase";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
export default async function setUserData(){
    const isGuest = await AsyncStorage.getItem("username")=="Guest"
    const userDataExists = await AsyncStorage.getItem("created_at")
    if(userDataExists){
        return;
    }
    else if(isGuest){
        AsyncStorage.setMany({isGuest:"yes",pfp:"noprofile.jpg"})
        return;
    }else{
    const {data:{user},error}= await supabase.auth.getUser()
    if (error||!user){
        console.error(error||"no user was detected.")
        return; //TODO: add error handling logic
    }
    const id = user.id
    const {data:userdata,error:usererror} = await supabase.from("accounts").select("*").eq("id",id)
    if(!userdata||usererror){
        console.error(usererror||"error selecting user data.")
        return; //TODO: add error handling logic
    }
    AsyncStorage.setMany({created_at:userdata[0].created_at,followersNum:userdata[0].followers,pfp:userdata[0].pfp,public:userdata[0].public,username:userdata[0].username,id:userdata[0].id,name:userdata[0].name})
}
}