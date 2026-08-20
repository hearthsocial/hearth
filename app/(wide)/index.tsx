import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
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
      let lname = await AsyncStorage.getItem("name");
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
        <Pressable style={styles.box}>
          <View style={styles.iconContainer}>
           <Octicons
          name="bell-fill"
          size={28}
          color={"black"}
          style={styles.icon}
        />
        </View>
          <Text style={styles.boxHeader}>{numNotifications}</Text>
          <Text style={styles.boxExplanation}>Total Notifications</Text>
          <Text style={styles.undertext}>Click to view details</Text>
        </Pressable>
        <Pressable style={styles.box}>
          <View style={styles.iconContainer}>
           <Octicons
          name="person-add"
          size={28}
          color={"black"}
          style={styles.icon}
        />
        </View>
          <Text style={styles.boxHeader}>
            {numConnections}
          </Text>
          <Text style={styles.boxExplanation}>Social Notifications</Text>
          <Text style={styles.undertext}>{numFollows} new follower{numFollows!==1?"s":""} - {numConnections-numFollows} friend request{numConnections-numFollows!==1?"s":""}</Text>
        </Pressable>
        <Pressable style={styles.box}>
          <View style={styles.iconContainer}>
           <Octicons
          name="mention"
          size={28}
          color={"black"}
          style={styles.icon}
        />
        </View>
          <Text style={styles.boxHeader}>{numTags}</Text>
          <Text style={styles.boxExplanation}>New Mentions</Text>
          <Text style={styles.undertext}>{numFromFriends} from friend{numFromFriends!==1?"s":""}</Text>
        </Pressable>
        <Pressable style={styles.box}>
          <View style={styles.iconContainer}>
           <Octicons
          name="unread"
          size={28}
          color={"black"}
          style={styles.icon}
        />
        </View>
          <Text style={styles.boxHeader}>{numMessages}</Text>
          <Text style={styles.boxExplanation}>New Messages</Text>
          <Text style={styles.undertext}>{numFromPinned} from pinned account{numFromPinned!==1?"s":""}</Text>
        </Pressable>
        <Pressable style={styles.box}>
          <View style={styles.iconContainer}>
           <Octicons
          name="note"
          size={28}
          color={"black"}
          style={styles.icon}
        />
        </View>
          <Text style={styles.boxHeader}>{numNewPosts}</Text>
          <Text style={styles.boxExplanation}>New Posts</Text>
          <Text style={styles.undertext}>From people you follow</Text>
        </Pressable>
        <Pressable style={styles.box} >
         <View style={styles.iconContainer}>
           <Octicons
          name="comment-discussion"
          size={28}
          color={"black"}
          style={styles.icon}
        />
        </View>
          <Text style={styles.boxHeader}>{numInteractions}</Text>
          <Text style={styles.boxExplanation}>
            New Interactions
          </Text>
          <Text style={styles.undertext}>{numNewLikes} new like{numNewLikes!==1?"s":""} - {numInteractions-numNewLikes} new comment{numInteractions-numNewLikes!==1?"s":""} </Text>
        </Pressable>
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
    margin: 40,
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
