import appdata from "./appdata";
import { supabase } from "./supabase";
import { Alert, Platform, Linking} from "react-native";
export default async function checkNewestVersion(){
const {data,error} = await supabase.rpc("return_min_version")
//TODO: update from google app id to real id once released
const APPLE_APP_ID = "535886823"; 
const ANDROID_PACKAGE_NAME = "com.yourdomain.mygreatapp";
const url = Platform.OS=="ios"?`itms-apps://://apple.com${APPLE_APP_ID}`:`market://details?id=${ANDROID_PACKAGE_NAME}`
if(data!=appdata.version){
Alert.alert("App update","A new update is required. Time to get with the times.",[{text:"Update Now",onPress:()=>{
Linking.openURL(url).catch((err) => console.error("Error opening store", err));
}}])
}
}