import { ScrollView, View, StyleSheet, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import NotePost from "@/components/wide/NotePost";
import getNewestContent from "@/algorithm/getNewestContent";
import formatPostData from "@/utils/formatPostData";
import { postProps } from "@/utils/types";
export default function WideText() {
  const router = useRouter();
  const [selectedFocus, setFocus] = useState(1);
  const [needNewPages,setNewPagesNeeded] = useState(true)
  const [formattedData,setformattedData] = useState<postProps[]|null>(null)
  const [postsSeen,setPostsSeen] = useState(0)
  useEffect(()=>{
   let getNewPage = async()=>{
    let page = await getNewestContent()
    setformattedData(formatPostData(page))
    }
    getNewPage()
    let length = formattedData?.length||0
    setPostsSeen(postsSeen+length)
  },[])
  return (
    <View
      style={{
        flex:1,
        width: "100%",
        alignItems:"center"
      }}
    >
      <View style={styles.top}>
        <Pressable onPress={() => router.replace("/(wide)/mix")}>
          <Entypo name="shuffle" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => setFocus(1)}>
          <Text style={[styles.links, selectedFocus == 1 && styles.selected]}>
            For You
          </Text>
        </Pressable>
        <Pressable onPress={() => setFocus(2)}>
          <Text style={[styles.links, selectedFocus == 2 && styles.selected]}>
            Explore
          </Text>
        </Pressable>
        <Pressable onPress={() => setFocus(3)}>
          <Text style={[styles.links, selectedFocus == 3 && styles.selected]}>
            Following
          </Text>
        </Pressable>
        <Pressable onPress={() => setFocus(4)}>
          <Text style={[styles.links, selectedFocus == 4 && styles.selected]}>
            Friends
          </Text>
        </Pressable>
      </View>
      
      <ScrollView style={{alignSelf:"stretch",flex:1}} showsVerticalScrollIndicator={false} contentContainerStyle={{width:"100%",alignItems:'center',gap:30,margin:20}}>
        {formattedData?.map((post,index)=>(<NotePost name={post.name}
        text={post.text} pfp={post.pfp} bottomData={post.bottomData} views={post.views} key={`post#${+postsSeen-(20-index)}`} id={post.id} followers={post.followers} userLiked={post.userLiked} userReposted={post.userReposted}/>))}
      </ScrollView>
      
    </View>
  );
}
const styles = StyleSheet.create({
  top: {
    width: "60%",
    height: 60,
    backgroundColor: "#f2ecdf",
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: "10%",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  },
  links: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Rubik_400Regular",
    color: "#717171",
  },
  selected: {
    color: "black",
    fontFamily: "Rubik_500Medium",
  },
});
