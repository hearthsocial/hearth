import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import storage from "@/utils/storage";

import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import HomeCard from "@/components/wide/HomeCard";
export default function Wide() {
  //general stats
  const [numNotifications, setNumNotifications] = useState(4);
  const [numConnections, setNumConnections] = useState<number>(3);
  const [numTags, setNumTags] = useState(8);
  const [numMessages, setNumMessages] = useState(9);
  const [numNewPosts, setNumNewPosts] = useState(3);
  const [numInteractions,setNumInteractions] = useState(6)
  const [name, setName] = useState("");
  //particular stats
  const [numFollows,setNumFollows] = useState(2)//second card
  const [numFromFriends,setFromFriends] = useState(4)//third card
  const [numFromPinned,setFromPinned] = useState(6)//4rth card
  const [numNewLikes,setNewLikes] = useState(4)//6th card
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      let lname = await storage.getString("name");
      if (!lname) {
        console.error("No local name detected.");
        lname = "Guest";
      }
      setName(lname);
    };
    getData();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View style={styles.headerBox}>
        <Text style={styles.header}>
          Welcome Back, <Text style={styles.bold}>{name}</Text>
        </Text>
        <Text style={styles.while}>While you were gone...</Text>
      </View>
      <View style={styles.boxView}>
        <HomeCard icon="bell-fill" header={numNotifications} explanation="Total Notifications" undertext={`Click to view details`}/>
        <HomeCard icon="person-add" header={numConnections} explanation="Social Notifications" undertext={`${numFollows} new follower${numFollows!==1?"s":""} - ${numConnections-numFollows} friend request${numConnections-numFollows!==1?"s":""}`}/>
        <HomeCard icon="mention" header={numTags} explanation="New Mentions" undertext={`${numFromFriends} from friend${numFromFriends!==1?"s":""}`}/>
        <HomeCard icon="unread" header={numMessages} explanation="New Messages" undertext={`${numFromPinned} from pinned accounts`}/>
        <HomeCard icon="note" header={numNewPosts} explanation="New Posts" undertext={`from people you follow`}/>
         <HomeCard icon="comment-discussion" header={numInteractions} explanation="New Interactions" undertext={`${numNewLikes} new like${numNewLikes!==1?"s":""} - ${numInteractions-numNewLikes} new comment${numInteractions-numNewLikes!==1?"s":""}`}/>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  header: {
    fontFamily: "Rubik_400Regular",
    fontSize: 35,

    justifyContent: "center",
  },
  headerBox: {
    marginTop: 20,
  },
  bold: {
    fontFamily: "Rubik_600SemiBold",
  },
  while: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: "center",
  },
  boxView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  box: {
    width: "25%",
    height: 150,
    paddingTop: 20,
    paddingLeft: 20,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent:"flex-start",
    gap:20,
    backgroundColor: "#f2ecdf",
    borderColor: "#717171",
  },
  boxHeader: {
    fontSize: 40,
    fontFamily: "Rubik_600SemiBold",
    textAlign: "left",
  },
  boxExplanation: {
    fontSize: 20,
    fontFamily: "Rubik_400Regular",
    textAlign: "left",
    width: "70%",
  },
  icon:{
    opacity:0.85,
  },
  iconContainer:{
    position:"absolute",
    top:16,
    right:16
  },
  undertext:{
    fontSize: 16,
    fontFamily: "Rubik_400Regular",
    color:"#717171",
    position:"relative",
    top:10,
    
  }
});
