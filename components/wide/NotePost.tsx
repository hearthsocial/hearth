import { StyleSheet, View,Text, Image, Pressable} from "react-native";
import {Base64Image} from "@/utils/types"
import { useState } from "react";
import Octicons from "@expo/vector-icons/Octicons";
type Props = {
    name:String,
    text:String,
    pfp:Base64Image
}
export default function NotePost({name,pfp,text}:Props){
    const [liked,setLiked] = useState(false)
    const [reposted,setReposted] = useState(false)
    let [kept,setKept] = useState(false)
    let [isFollowing,setIsFollowing] = useState(false)
    return (<View style={styles.post}>
        <View style={styles.innerPost}>
        <View style={styles.person}>
        <Image source={{uri:pfp}} style={styles.pfp}/>
        <Text style={styles.name}>{name}</Text>
        <Pressable style={styles.follow} onPress={()=>setIsFollowing(!isFollowing)}><View style={{alignItems:"center"}}><Text style={{fontFamily:"Rubik_500Medium",fontSize:16,color:"white"}}>{isFollowing?"Followed":"Follow"}</Text></View></Pressable>
        </View>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.bottomBar}>
        <Pressable style={styles.bottomItem} onPress={()=>setLiked(!liked)}>
        <Octicons name={liked?"heart":"heart-fill"} size={20}/>
        <Text style={{fontFamily:liked?"Rubik_400Regular":"Rubik_500Medium",
        fontSize:16}}>{liked?"Like":"Liked"}</Text>
        </Pressable>  
        <Pressable style={styles.bottomItem} onPress={()=>{/**reply function */}}>
        <Octicons name={"reply"} size={20}/>
        <Text style={{fontFamily:"Rubik_400Regular",
        fontSize:16}}>Reply</Text>
        </Pressable> 
         <Pressable style={styles.bottomItem} onPress={()=>setReposted(!reposted)}>
        <Octicons name={"sync"} size={20}/>
        <Text style={{fontFamily:reposted?"Rubik_500Medium":"Rubik_400Regular",
        fontSize:16}}>{reposted?"Reposted":"Repost"}</Text>
        </Pressable>
        <Pressable style={styles.bottomItem} onPress={()=>setKept(!kept)}>
        <Octicons name={kept?"bookmark-filled":"bookmark"} size={20}/>
        <Text style={{fontFamily:kept?"Rubik_500Medium":"Rubik_400Regular",
        fontSize:16}}>{kept?"Kept":"Keep"}</Text>
        </Pressable>  
        </View>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    post:{
       width:"65%",
       borderWidth:1,
        backgroundColor:"#f2ecdf",
        borderRadius:30
    },
    innerPost:{
        margin:20
    },
    pfp:{
        width:40,
        height:40,
        borderRadius:50
    },
    person:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:20
    },
    name:{
        fontFamily:"Rubik_500Medium",
        fontSize:20,
        marginLeft:10
    },
    text:{
        fontFamily:"Rubik_400Regular",
        fontSize:18,
        flexWrap:"wrap",
    },
    bottomBar:{
    gap:20,
    flexDirection:"row"
    },
    bottomItem:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
        gap:10,
        borderWidth:1,
        alignSelf:"flex-start",
        padding:10,
        paddingHorizontal:20,
        borderRadius:15,
        boxShadow: '1px 4px 8px rgba(0, 0, 0, 0.18)'
    },
    bottomText:{
        fontFamily:"Rubik_400Regular",
        fontSize:16
    },
    follow:{
    marginHorizontal:10,
    borderWidth:1,
    padding:4,
    borderRadius:5,
    backgroundColor:"black"
    }
})