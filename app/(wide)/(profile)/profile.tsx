import Button from "@/components/wide/Button";
import NotePost from "@/components/wide/NotePost";
import formatPostData from "@/utils/formatPostData";
import getProfileUrl from "@/utils/getProfileUrl";
import storage from "@/utils/storage";
import { supabase } from "@/utils/supabase";
import { postProps } from "@/utils/types";
import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text, Image, ScrollView} from "react-native";

export default function WideProfile() {
    const [loading,setLoading] = useState(true)
    const [postsLoading,setPostsLoading] = useState(false)
    const [pfpUrl,setPfp] = useState("")
    const [name,setName] = useState("Guest")
    const [username,setUsername] = useState("N/A")
    const [mediumChoice,setMediumChoice] = useState(1)
    const [postsList,setPosts] = useState<postProps[]>([])
    const [postsSeen,setSeenPosts] = useState(0)
    useEffect(()=>{
    let setup = async ()=>{
    const pfp = await storage.getString("pfp")??"noprofile.jpg"
    const pfplocal = getProfileUrl(pfp)
    setPfp(pfplocal)
    const localname = await storage.getString("name")??"Guest"
    setName(localname)
    const localusername = await storage.getString("username")??"N/A"
    setUsername(localusername)
        setLoading(false)
        setPostsLoading(true)
    }
    setup()
    },[])
    useEffect(()=>{
        let loadPosts = async ()=>{
        if(postsLoading!==true||username=="N/A"){
            return
        }
        let {data,error} = await supabase.rpc("get_users_posts",{p_username:username,p_offset:0})
        if(error)data=[]
        let formatted = formatPostData(data)
        setPosts(formatted)
        setSeenPosts(postsSeen+20)
    }
    loadPosts()
    },[postsLoading])
    return (
    <ScrollView contentContainerStyle={styles.container}>
    {loading?(<Image
          source={require("@/assets/images/loading_basic.gif")}
          style={{ width: 200, height: 200 }}
        />):(
    <View style={styles.content}>
    <Image source={{uri:pfpUrl}} style={styles.pfp}/>
    <Text style={styles.name}>{name}</Text>
    <Button text={"Follow"} type={1} onClick={()=>{}} width="40%"/>
    <View style={styles.userContent}>
    <View style={styles.mediums}>
        <Pressable style={[styles.mediumChoice,styles.left,mediumChoice==1?styles.chosenMedium:null]} onPress={()=>setMediumChoice(1)}>
            <Text style={[styles.mediumChoiceText,mediumChoice==1?styles.chosenMediumText:null]}>Notes</Text>
        </Pressable>
        <Pressable style={[styles.mediumChoice,mediumChoice==2?styles.chosenMedium:null]} onPress={()=>setMediumChoice(2)}>
            <Text style={[styles.mediumChoiceText,mediumChoice==2?styles.chosenMediumText:null]}>Shots</Text>
        </Pressable>
        <Pressable style={[styles.mediumChoice,styles.right,mediumChoice==3?styles.chosenMedium:null]} onPress={()=>setMediumChoice(3)}>
            <Text style={[styles.mediumChoiceText,mediumChoice==3?styles.chosenMediumText:null]}>Clips</Text>
        </Pressable>
    </View>
    <View style={styles.postsContainer}>
    {postsList.map((post,index)=>(<NotePost name={post.name}
              text={post.text}
              pfp={post.pfp}
              bottomData={post.bottomData}
              views={post.views}
              key={`post#${+postsSeen - (20 - index)}`}
              id={post.id}
              followers={post.followers}
              userLiked={post.userLiked}
              userReposted={post.userReposted}/>))}
    </View>
    </View>
    </View>
    )}
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        flexGrow:1,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
    },
    content:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        gap:10
    },
    pfp:{
        height:150,
        width:150,
        borderRadius:45,
        
    },
    name:{
        fontSize:40,
        fontFamily:"Rubik_500Medium",
        
    },
    userContent:{
        width:"60%",
    },
    mediums:{
        justifyContent:"space-between",
        flexDirection:"row",
        width:"100%"
    },
    mediumChoice:{
        borderWidth:1,
        padding:20,
        flex:1,
        marginTop:10
    },
    mediumChoiceText:{
        textAlign:"center"
    },
    left:{
        borderTopLeftRadius:20
    },
    right:{
        borderTopRightRadius:20
    },
    chosenMedium:{
    backgroundColor:"black"
    },
    chosenMediumText:{
        color:"white"
    },
    postsContainer:{
        alignItems:"center",
        gap:10,
        marginTop:20
    }
})