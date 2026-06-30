import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
export default function Wide() {
  const [numNotifications, setNumNotifications] = useState(4);
  const [numCreatorAlerts, setNumCreatorAlerts] = useState<number | boolean>(
    false,
  );
  const [numTags, setNumTags] = useState(8);
  const [numMessages, setNumMessages] = useState(9);
  const [numNewPosts, setNumNewPosts] = useState(3);
  const [clippdDone, setClippedDone] = useState(false);
  const [name, setName] = useState("");
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
          <Text style={styles.boxHeader}>{numNotifications}</Text>
          <Text style={styles.boxExplanation}>Notifications</Text>
        </Pressable>
        <Pressable style={styles.box}>
          <Text style={styles.boxHeader}>
            {numCreatorAlerts ? numCreatorAlerts : "N/A"}
          </Text>
          <Text style={styles.boxExplanation}>Creator Alerts</Text>
        </Pressable>
        <Pressable style={styles.box}>
          <Text style={styles.boxHeader}>{numTags}</Text>
          <Text style={styles.boxExplanation}>New Tags</Text>
        </Pressable>
        <Pressable style={styles.box}>
          <Text style={styles.boxHeader}>{numMessages}</Text>
          <Text style={styles.boxExplanation}>New Messages</Text>
        </Pressable>
        <Pressable style={styles.box}>
          <Text style={styles.boxHeader}>{numNewPosts}</Text>
          <Text style={styles.boxExplanation}>New Posts</Text>
        </Pressable>
        <Pressable style={styles.box} onPress={() => router.replace("/clippd")}>
          <Text style={styles.boxHeader}>{clippdDone ? "Yes" : "No"}</Text>
          <Text style={styles.boxExplanation}>
            {clippdDone ? "Clippd has been done." : "Clippd has not been done."}
          </Text>
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
});
