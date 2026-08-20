import { View, Pressable, Text, StyleSheet } from "react-native";
import { useRouter, useSegments } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
export default function Sidebar() {
  const router = useRouter();
  const segments = useSegments();
  function isActiveTab(tab: string) {
    if (tab == "home") {
      return segments.length <= 1 || segments[1] == undefined;
    }
    if((tab=="clips"||tab=="notes"||tab=="pics")&&segments[1]=="mix"){
      return true
    }
    return segments[1] == tab;
  }
  return (
    <View
      style={{
        width: 300,
        padding: 20,
        borderRightWidth: 1,
        borderColor: "#717171",
        backgroundColor: "#f2ecdf",
        paddingLeft: 30,
        justifyContent: "center",
        flexDirection: "column",
        rowGap: 20,
      }}
    >
      <Pressable onPress={() => router.push("/(wide)")} style={styles.screens}>
        {isActiveTab("home") && <View style={styles.activeIndicator}></View>}
        <Octicons
          name="home"
          size={28}
          color={isActiveTab("home") ? "black" : "#717171"}
        />
        <Text
          style={[
            styles.text,
            { color: isActiveTab("home") ? "black" : "#717171" },
          ]}
        >
          Home
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/pics")}
        style={styles.screens}
      >
        {isActiveTab("pics") && <View style={styles.activeIndicator}></View>}
        <Octicons
          name="image"
          size={28}
          color={isActiveTab("pics") ? "black" : "#717171"}
        />
        <Text
          style={[
            styles.text,
            { color: isActiveTab("pics") ? "black" : "#717171" },
          ]}
        >
          Pics
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/clips")}
        style={styles.screens}
      >
        {isActiveTab("clips") && <View style={styles.activeIndicator}></View>}
        <Octicons
          name="device-camera-video"
          size={28}
          color={isActiveTab("clips") ? "black" : "#717171"}
        />
        <Text
          style={[
            styles.text,
            { color: isActiveTab("clips") ? "black" : "#717171" },
          ]}
        >
          Clips
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/notes")}
        style={styles.screens}
      >
        {isActiveTab("notes") && <View style={styles.activeIndicator}></View>}
        <Octicons
          name="pencil"
          size={28}
          color={isActiveTab("notes") ? "black" : "#717171"}
        />
        <Text
          style={[
            styles.text,
            { color: isActiveTab("notes") ? "black" : "#717171" },
          ]}
        >
          Notes
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/doorstep")}
        style={styles.screens}
      >
        {isActiveTab("doorstep") && (
          <View style={styles.activeIndicator}></View>
        )}
        <Octicons
          name="inbox"
          size={28}
          color={isActiveTab("doorstep") ? "black" : "#717171"}
        />
        <Text
          style={[
            styles.text,
            { color: isActiveTab("doorstep") ? "black" : "#717171" },
          ]}
        >
          Doorstep
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/create")}
        style={styles.screens}
      >
        {isActiveTab("create") && <View style={styles.activeIndicator}></View>}
        <Octicons
          name="plus"
          size={28}
          color={isActiveTab("create") ? "black" : "#717171"}
        />
        <Text
          style={[
            styles.text,
            { color: isActiveTab("create") ? "black" : "#717171" },
          ]}
        >
          Create
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  screens: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    width: "100%",
    paddingVertical: 2,
  },
  text: {
    fontFamily: "Rubik_400Regular",
    fontSize: 20,
    textAlign: "left",
  },
  activeIndicator: {
    position: "absolute",
    left: -25,
    height: 28,
    width: 5,
    backgroundColor: "black",
    borderRadius: 10,
  },
});
