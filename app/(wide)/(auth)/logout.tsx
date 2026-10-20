import Button from "@/components/wide/Button";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View,Text,StyleSheet,Image} from "react-native";

export default function WideLogout(){
const [loading,setLoading] = useState(true)
const router = useRouter()
useEffect(()=>{
    const logout = async ()=>{
        await supabase.auth.signOut({scope:'local'})
        setLoading(false)
    }
    logout()
},[])
return(<View style={styles.view}>
<Image
          source={require("@/assets/images/hearth.svg")}
          style={styles.logo}
        />
<Text style={styles.text}>{loading?"Signing you out...":"Hate to see you go. Come back soon."}</Text>
<Button text={"Go to login"} type={1} onClick={()=>router.replace("/(wide)/(auth)/login")} width="30%"></Button>
</View>)
}
const styles = StyleSheet.create({
view:{
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
    height:"100%"
},
text:{
    margin:40,
    fontSize:30
},
logo: {
    width: 250,
    height: 250,
  },
})