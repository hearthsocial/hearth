import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native";

const customAuthStorage = {
  setItem:async (key:string,value:string):Promise<void>=>{
    if(Platform.OS=="web"){
    if(typeof window !== "undefined"&&window.localStorage){
      localStorage.setItem(key,value)
    }
    return;
  }
    await AsyncStorage.setItem(key,value)
  },
  getItem:async (key:string):Promise<string|null>=>{
    if(Platform.OS=="web"){
    if(typeof window !== "undefined"&&window.localStorage){
      return localStorage.getItem(key)
    }
    return null;
  }
    return await AsyncStorage.getItem(key)
  },
  removeItem:async (key:string):Promise<void>=>{
    if(Platform.OS=="web"){
    if(typeof window !== "undefined"&&window.localStorage){
      localStorage.removeItem(key)
    }
    return;
  }
    await AsyncStorage.removeItem(key)
  },
}
const supabaseUrl = <string>process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = <string>(
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);
const isBrowser = typeof window !== "undefined";
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: customAuthStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
